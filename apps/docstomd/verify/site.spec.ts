import { readFileSync } from "node:fs";
import path from "node:path";
import { expect, test } from "@playwright/test";

/** [hreflang 语言码, URL 前缀]。英文不带前缀。 */
const LOCALES = [
  ["en", ""],
  ["zh-CN", "zh-cn"],
  ["zh-TW", "zh-tw"],
  ["es", "es"],
  ["pt", "pt"],
  ["ja", "ja"],
] as const;
const SLUGS = ["", "docx-to-markdown", "word-to-markdown", "google-docs-to-markdown"];

/** 全站 trailingSlash，路径一律以 / 结尾。 */
function url(prefix: string, slug: string) {
  return `/${[prefix, slug].filter(Boolean).map((p) => `${p}/`).join("")}`;
}
// 固件跟测试放一起：rich.docx 是手工拼的（textutil 生成的 docx 没有 pStyle、
// 没有 w:tbl、没有 numPr，测不出东西），丢了就得重造，不能放 /tmp。
const FIXTURES = path.join(__dirname, "fixtures");

/** 站点承诺"文件不出本机"，所以任何外部请求都算 bug。 */
function watchNetwork(page: import("@playwright/test").Page) {
  const external: string[] = [];
  const errors: string[] = [];
  page.on("request", (r) => {
    const url = r.url();
    if (!url.startsWith("http://localhost") && !url.startsWith("data:") && !url.startsWith("blob:")) {
      external.push(url);
    }
  });
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  page.on("pageerror", (e) => errors.push(String(e)));
  return { external, errors };
}

for (const [locale, prefix] of LOCALES) {
  for (const slug of SLUGS) {
    const path = url(prefix, slug);
    test(`renders ${path} (${locale})`, async ({ page }) => {
      const { external, errors } = watchNetwork(page);
      await page.goto(path, { waitUntil: "networkidle" });

      await expect(page.locator("html")).toHaveAttribute("lang", locale);
      await expect(page.locator("h1")).toBeVisible();
      const h1 = (await page.locator("h1").innerText()).trim();
      expect(h1.length).toBeGreaterThan(4);
      // 每个 slug 页都必须有落地区、FAQ、转换器
      await expect(page.locator("#faq")).toBeAttached();
      await expect(page.getByRole("button", { name: /.+/ }).first()).toBeAttached();

      expect(external, `external requests on ${path}`).toEqual([]);
      expect(errors, `console errors on ${path}`).toEqual([]);
    });
  }
}

test("no horizontal overflow at 375px", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  for (const path of ["/", "/ja/docx-to-markdown/", "/zh-tw/word-to-markdown/", "/pt/google-docs-to-markdown/"]) {
    await page.goto(path, { waitUntil: "networkidle" });
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow, `overflow on ${path}`).toBeLessThanOrEqual(1);

    // 头部导航必须单行 —— 换行会挤成三个两行的柱子
    const rows = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll("header nav a"));
      const visible = links.filter((a) => (a as HTMLElement).offsetParent !== null);
      return new Set(visible.map((a) => Math.round(a.getBoundingClientRect().top))).size;
    });
    expect(rows, `nav rows on ${path}`).toBe(1);
  }
});

test("language switch keeps the slug", async ({ page }) => {
  await page.goto("/word-to-markdown/");
  const box = page.locator('[data-slot="lang-switch"]');

  await box.locator("summary").click();
  await box.getByRole("link", { name: "日本語" }).click();
  await expect(page).toHaveURL(/\/ja\/word-to-markdown\/$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "ja");

  // 切回去，slug 还得在
  await box.locator("summary").click();
  await box.getByRole("link", { name: "Español" }).click();
  await expect(page).toHaveURL(/\/es\/word-to-markdown\/$/);

  // 英文没有前缀，切回英文应该落在裸 slug 上
  await box.locator("summary").click();
  await box.getByRole("link", { name: "English" }).click();
  await expect(page).toHaveURL(/\/word-to-markdown\/$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
});

test("the switcher's six links sit in the static HTML", async ({ request }) => {
  // 爬虫不跑 JS 也得能顺着链接找到另外五个语种，所以链接必须在源码里，
  // 不能等展开才挂载
  const html = await (await request.get("/ja/word-to-markdown/")).text();
  const box = html.match(/<details[^>]*data-slot="lang-switch"[\s\S]*?<\/details>/)?.[0];
  expect(box, "lang-switch 不在静态 HTML 里").toBeTruthy();

  for (const [locale, prefix] of LOCALES) {
    expect(box, `缺 ${locale} 的链接`).toContain(`href="${url(prefix, "word-to-markdown")}"`);
  }
});

test("accordion opens and closes with a height transition", async ({ page }) => {
  await page.goto("/");
  const triggers = page.locator("#faq button");
  const first = triggers.first();
  const second = triggers.nth(1);

  // 第一条默认展开
  await expect(first).toHaveAttribute("data-panel-open", "");
  const firstPanel = page.locator("#faq [role=region]").first();
  await expect(firstPanel).toBeVisible();

  // 第二条：点开 -> 高度从 0 长出来
  await expect(second).not.toHaveAttribute("data-panel-open", "");
  await second.click();
  await expect(second).toHaveAttribute("data-panel-open", "");
  const panel2 = page.locator("#faq [role=region]").nth(1);
  await expect(panel2).toBeVisible();
  await expect
    .poll(async () => (await panel2.boundingBox())?.height ?? 0)
    .toBeGreaterThan(10);

  // 再点收起
  await second.click();
  await expect(second).not.toHaveAttribute("data-panel-open", "");
  await expect(panel2).toBeHidden();

  // multiple: 第一条应该还开着
  await expect(first).toHaveAttribute("data-panel-open", "");
});

test("docx converts, tabs slide, preview and download work", async ({ page }) => {
  const { external, errors } = watchNetwork(page);
  await page.goto("/");

  await page.locator("input[type=file]").setInputFiles(`${FIXTURES}/rich.docx`);

  const source = page.getByRole("tab", { name: /source/i });
  await expect(source).toBeVisible({ timeout: 15000 });
  await expect(source).toHaveAttribute("data-active", "");

  const md = await page.locator("pre").first().innerText();
  expect(md).toContain("# Quarterly Report");
  expect(md).toContain("## Numbers");
  expect(md).toContain("| Region |");
  expect(md).toContain("APAC");
  expect(md).toContain("**bold**");
  expect(md).toContain("https://example.com");
  expect(md).toMatch(/^- Ship the thing$/m);
  expect(md).toMatch(/^1\. First$/m);
  expect(md).toContain("> A quote worth keeping.");
  expect(md).toContain('```\nprint("hello")\n```');

  // 墨块 Indicator 由 --active-tab-left 驱动，切 tab 后应该滑到新位置
  const indicator = page.locator('[data-slot="tabs-indicator"]');
  const leftOf = () =>
    indicator.evaluate((el) => getComputedStyle(el).getPropertyValue("--active-tab-left").trim());
  const before = await leftOf();
  expect(before).not.toBe("");

  const preview = page.getByRole("tab", { name: /preview|预览|預覽|vista|visualiza|プレビュー/i });
  await preview.click();
  await expect(preview).toHaveAttribute("data-active", "");
  await expect.poll(leftOf).not.toBe(before);
  // 过渡跑完后，墨块要真的盖在 preview 标签上
  await page.waitForTimeout(400);
  const ind = (await indicator.boundingBox())!;
  const tab = (await preview.boundingBox())!;
  expect(Math.abs(ind.x - tab.x)).toBeLessThan(2);
  expect(Math.abs(ind.width - tab.width)).toBeLessThan(2);

  // 预览面板要真的渲染出表格和标题，而不是一坨纯文本
  const panel = page.locator('[role=tabpanel]').filter({ has: page.locator("table") });
  await expect(panel.locator("table")).toBeVisible();
  await expect(
    panel.getByRole("heading", { name: "Quarterly Report", level: 2 }),
  ).toBeVisible();
  await expect(panel.getByRole("heading", { name: "Numbers", level: 3 })).toBeVisible();
  // 预览里的链接是纯文本 span，不能是可点的 <a> —— 文档内容不可信
  await expect(panel.locator("a")).toHaveCount(0);

  // 下载
  const dl = await Promise.all([
    page.waitForEvent("download"),
    page.getByRole("button", { name: /download|下载|下載|descargar|baixar|ダウンロード/i }).first().click(),
  ]);
  expect(dl[0].suggestedFilename()).toMatch(/\.md$/);

  expect(external).toEqual([]);
  expect(errors).toEqual([]);
});

test("copy puts markdown on the clipboard", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/");
  await page.locator("input[type=file]").setInputFiles(`${FIXTURES}/rich.docx`);
  await expect(page.locator("pre").first()).toBeVisible({ timeout: 15000 });

  await page.getByRole("button", { name: /^copy$/i }).click();
  const clip = await page.evaluate(() => navigator.clipboard.readText());
  expect(clip).toContain("# Quarterly Report");
  expect(clip).toContain("| Region |");
  // 按钮要给出「已复制」的反馈
  await expect(page.getByText(/copied/i)).toBeVisible();
});

test("pasting a file from the clipboard converts it", async ({ page }) => {
  await page.goto("/");
  // 造一个带 files 的 paste 事件，走的是 window 上的监听
  const b64 = readFileSync(`${FIXTURES}/rich.docx`).toString("base64");
  const paste = () =>
    page.evaluate((data) => {
      const bin = atob(data);
      const bytes = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
      const file = new File([bytes], "pasted.docx", {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });
      const dt = new DataTransfer();
      dt.items.add(file);
      window.dispatchEvent(new ClipboardEvent("paste", { clipboardData: dt, bubbles: true }));
    }, b64);

  // 监听器是 useEffect 里挂的，得等 hydration；重投直到接住
  await expect
    .poll(
      async () => {
        if (await page.locator("pre").first().isVisible()) return true;
        await paste();
        return false;
      },
      { timeout: 20000, intervals: [200, 300, 500, 500, 1000] },
    )
    .toBe(true);
  expect(await page.locator("pre").first().innerText()).toContain("# Quarterly Report");
  await expect(page.getByText("pasted.docx")).toBeVisible();
});

test("every canonical URL answers 200", async ({ request }) => {
  for (const [, prefix] of LOCALES) {
    for (const slug of SLUGS) {
      const p = url(prefix, slug);
      expect((await request.get(p)).status(), `status for ${p}`).toBe(200);
    }
  }
});

test("paths that don't exist are real 404s, not soft ones", async ({ request }) => {
  // 静态导出没有 proxy 兜底了。打错的路径必须真 404 ——
  // 回一个 200 的英文首页就是软 404，比 404 更伤索引
  for (const p of [
    "/nope/",
    "/nonsense-path/",
    "/docx-to-markdown/extra/",
    // 没做的语种就是没有这一页
    "/de/",
    "/ko/word-to-markdown/",
    // 大小写不同的前缀不该另开一份，路径一律小写
    "/ZH-CN/",
    // 英文不带前缀，/en/ 不该存在，否则同一份内容两个地址
    "/en/",
    "/en/word-to-markdown/",
  ]) {
    expect((await request.get(p)).status(), `status for ${p}`).toBe(404);
  }
});

test("a missing trailing slash redirects to the canonical form", async ({ request }) => {
  for (const [from, to] of [
    ["/word-to-markdown", "/word-to-markdown/"],
    ["/ja/docx-to-markdown", "/ja/docx-to-markdown/"],
  ]) {
    const res = await request.get(from, { maxRedirects: 0 });
    expect(res.status(), `status for ${from}`).toBe(308);
    expect(res.headers()["location"], `location for ${from}`).toBe(to);
  }
});

test("sitemap and robots list only URLs that exist", async ({ request }) => {
  const xml = await (await request.get("/sitemap.xml")).text();
  const locs = [...xml.matchAll(/<loc>([^<]*)<\/loc>/g)].map((m) => m[1]);
  expect(locs).toHaveLength(LOCALES.length * SLUGS.length);
  for (const loc of locs) {
    expect(loc, `${loc} 少了尾斜杠`).toMatch(/\/$/);
    const p = new URL(loc).pathname;
    expect((await request.get(p)).status(), `sitemap 里的 ${p}`).toBe(200);
  }

  const robots = await (await request.get("/robots.txt")).text();
  expect(robots).toContain("sitemap.xml");
  // 别把整站 Disallow 掉
  expect(robots).not.toMatch(/^Disallow: \/$/m);
});

test("legacy .doc converts too", async ({ page }) => {
  const { external, errors } = watchNetwork(page);
  await page.goto("/zh-cn/");
  await page.locator('input[type=file]').setInputFiles(`${FIXTURES}/sample.doc`);
  await expect(page.locator("pre").first()).toBeVisible({ timeout: 20000 });
  const md = await page.locator("pre").first().innerText();
  expect(md).toContain("Quarterly Report");
  expect(md).toContain("APAC");
  expect(external).toEqual([]);
  expect(errors).toEqual([]);
});

test("batch of two files offers a zip", async ({ page }) => {
  const { external, errors } = watchNetwork(page);
  await page.goto("/");
  await page.locator("input[type=file]").setInputFiles([
    `${FIXTURES}/rich.docx`,
    `${FIXTURES}/sample.doc`,
  ]);
  await expect(page.locator("pre").first()).toBeVisible({ timeout: 25000 });

  const zipBtn = page.getByRole("button", { name: /zip/i }).first();
  await expect(zipBtn).toBeVisible();
  const [download] = await Promise.all([page.waitForEvent("download"), zipBtn.click()]);
  expect(download.suggestedFilename()).toMatch(/\.zip$/);

  expect(external).toEqual([]);
  expect(errors).toEqual([]);
});
