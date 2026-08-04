import { readFileSync } from "node:fs";
import path from "node:path";
import { expect, test } from "@playwright/test";

const LOCALES = ["en", "zh-Hans", "zh-Hant", "es", "pt", "ja"] as const;
const SLUGS = ["", "docx-to-markdown", "word-to-markdown", "google-docs-to-markdown"];
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

for (const locale of LOCALES) {
  for (const slug of SLUGS) {
    const path = `/${locale}${slug ? `/${slug}` : ""}`;
    test(`renders ${path}`, async ({ page }) => {
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
  for (const path of ["/en", "/ja/docx-to-markdown", "/zh-Hant/word-to-markdown", "/pt/google-docs-to-markdown"]) {
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

test("language switch keeps the slug and writes a cookie", async ({ page, context }) => {
  await page.goto("/en/word-to-markdown");
  await page.getByRole("button", { name: /language|语言|語言|idioma|言語/i }).click();
  await page.getByRole("menuitemradio", { name: "日本語" }).click();
  await expect(page).toHaveURL(/\/ja\/word-to-markdown$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "ja");

  const cookie = (await context.cookies()).find((c) => c.name === "locale");
  expect(cookie?.value).toBe("ja");

  // 切回去，slug 还得在
  await page.getByRole("button", { name: /language|言語/i }).click();
  await page.getByRole("menuitemradio", { name: "Español" }).click();
  await expect(page).toHaveURL(/\/es\/word-to-markdown$/);
});

test("accordion opens and closes with a height transition", async ({ page }) => {
  await page.goto("/en");
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
  await page.goto("/en");

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
  await page.goto("/en");
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
  await page.goto("/en");
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

test("the cookie the switcher writes stops the proxy from guessing", async ({ page, context }) => {
  // 先按日语协商一次
  await page.goto("/en");
  await page.getByRole("button", { name: /language/i }).click();
  await page.getByRole("menuitemradio", { name: "Português" }).click();
  await expect(page).toHaveURL(/\/pt$/);

  // 再裸访问 /，应该被 cookie 带去葡语，而不是 Accept-Language 的 en
  await page.goto("/");
  await expect(page).toHaveURL(/\/pt$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "pt");
  void context;
});

test("unsupported language prefixes fold to the nearest locale", async ({ page }) => {
  const cases: [string, RegExp][] = [
    // 不支持的语种 → 退到英文，而不是 /en/de 然后 404
    ["/de", /\/en$/],
    ["/ko/word-to-markdown", /\/en\/word-to-markdown$/],
    // 地区变体 → 折到对应的字/语言
    ["/zh-CN", /\/zh-Hans$/],
    ["/zh-TW/docx-to-markdown", /\/zh-Hant\/docx-to-markdown$/],
    ["/pt-BR", /\/pt$/],
    ["/es-MX/word-to-markdown", /\/es\/word-to-markdown$/],
    ["/ja-JP", /\/ja$/],
  ];

  for (const [from, to] of cases) {
    const res = await page.goto(from);
    expect(res?.status(), `status for ${from}`).toBe(200);
    await expect(page, `${from} should land on ${to}`).toHaveURL(to);
    await expect(page.locator("h1")).toBeVisible();
  }
});

test("real 404s stay 404s", async ({ page }) => {
  // 普通错路径不该被当成语言标签，否则每个 typo 都变成软 404
  for (const path of ["/en/nope", "/nonsense-path", "/en/docx-to-markdown/extra"]) {
    const res = await page.goto(path);
    expect(res?.status(), `status for ${path}`).toBe(404);
  }
});

test("legacy .doc converts too", async ({ page }) => {
  const { external, errors } = watchNetwork(page);
  await page.goto("/zh-Hans");
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
  await page.goto("/en");
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
