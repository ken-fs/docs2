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
const SLUGS = [
  "",
  "docx-to-markdown",
  "word-to-markdown",
  "pdf-to-markdown",
  "excel-to-markdown",
  "csv-to-markdown",
  "html-to-markdown",
  "google-docs-to-markdown",
];
/** 方案 §15 要求 AdSense 上线前这五页齐备，而且每个语种都得有。 */
const LEGAL = ["about", "contact", "privacy", "terms", "cookies"];
/**
 * 长尾内容页。7 个工具页只对应 6 篇 —— docx-to-markdown 和 word-to-markdown
 * 是同一个转换器，各写一篇就是两页抢同一批词。Word 那篇挂在两个工具页上。
 */
const GUIDES = [
  "guides",
  "guides/word-to-markdown-keep-formatting",
  "guides/pdf-to-markdown-layout",
  "guides/google-docs-to-markdown-paste",
  "guides/html-to-markdown-clean",
  "guides/csv-to-markdown-tables",
  "guides/excel-to-markdown-formulas",
];
/** sitemap 和 canonical 检查覆盖全站，不只是工具页。 */
const ALL_SLUGS = [...SLUGS, ...LEGAL, ...GUIDES];

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

for (const [locale, prefix] of LOCALES) {
  for (const slug of LEGAL) {
    const path = url(prefix, slug);
    test(`renders ${path} (${locale})`, async ({ page }) => {
      const { external, errors } = watchNetwork(page);
      await page.goto(path, { waitUntil: "networkidle" });

      await expect(page.locator("html")).toHaveAttribute("lang", locale);
      // 一页一个 H1 —— 方案 §8。长度只做"不是空的"下限：中日文里
      // 「服务条款」四个字就是一个完整标题，按拉丁字母的字数卡会误伤
      await expect(page.locator("h1")).toHaveCount(1);
      expect((await page.locator("h1").innerText()).trim().length).toBeGreaterThan(2);

      // 正式页面没有转换器，但必须是真内容，不是占位。AdSense 审核就看这个：
      // 五页齐备而每页两句话，照样退回
      await expect(page.locator("#faq")).toHaveCount(0);
      await expect(page.locator("input[type=file]")).toHaveCount(0);
      const words = (await page.locator("main").innerText()).trim();
      expect(words.length, `${path} 内容太薄`).toBeGreaterThan(900);
      // 分节标题得有，一整块不分段的墙没人读
      expect(await page.locator("main h2").count()).toBeGreaterThanOrEqual(3);

      expect(external, `external requests on ${path}`).toEqual([]);
      expect(errors, `console errors on ${path}`).toEqual([]);
    });
  }
}

test("the five formal pages are one click from any tool page", async ({ request }) => {
  // 方案 §15 要"清晰导航"：审核员从任意落地页都得能走到 About / Privacy。
  // 查静态 HTML 而不是点击，顺带确认不依赖 JS
  for (const p of ["/", "/ja/pdf-to-markdown/", "/es/csv-to-markdown/"]) {
    const html = await (await request.get(p)).text();
    const foot = html.match(/<footer[\s\S]*?<\/footer>/)?.[0];
    expect(foot, `${p} 没有 footer`).toBeTruthy();
    const prefix = p === "/" ? "" : p.split("/")[1];
    for (const slug of LEGAL) {
      expect(foot, `${p} 的页脚缺 ${slug}`).toContain(`href="${url(prefix, slug)}"`);
    }
  }
});

test("formal pages carry WebPage markup and a two-step breadcrumb", async ({ request }) => {
  for (const [slug, type] of [
    ["privacy", "WebPage"],
    ["terms", "WebPage"],
    // 联系页有更贴的类型，用它 —— 方案 §8.6 只禁虚假评分，不禁细化类型
    ["contact", "ContactPage"],
  ]) {
    const html = await (await request.get(url("", slug))).text();
    const block = html.match(
      /<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
    )?.[1];
    expect(block, `${slug} 没有结构化数据`).toBeTruthy();
    const graph = JSON.parse(block!) as Record<string, unknown>[];

    const page = graph.find((n) => String(n["@type"]).endsWith("Page"));
    expect(page?.["@type"], `${slug} 的类型`).toBe(type);
    // 隐私政策不是一个应用，别标 WebApplication
    expect(graph.map((n) => n["@type"])).not.toContain("WebApplication");
    expect(graph.map((n) => n["@type"])).not.toContain("SoftwareApplication");

    const crumbs = graph.find((n) => n["@type"] === "BreadcrumbList");
    expect(crumbs, `${slug} 没有面包屑`).toBeTruthy();
    expect(crumbs!.itemListElement as unknown[]).toHaveLength(2);
  }

  // 首页只有自己一层，单元素面包屑没有信息量，不该发
  const home = await (await request.get("/")).text();
  const homeGraph = JSON.parse(
    home.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)![1],
  ) as Record<string, unknown>[];
  expect(homeGraph.map((n) => n["@type"])).not.toContain("BreadcrumbList");
});

test("every page has its own title, description and self-canonical", async ({ request }) => {
  const titles = new Map<string, string>();
  for (const [, prefix] of LOCALES) {
    for (const slug of ALL_SLUGS) {
      const p = url(prefix, slug);
      const html = await (await request.get(p)).text();

      const title = html.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? "";
      expect(title.length, `${p} 没有 title`).toBeGreaterThan(10);
      expect(titles.get(title), `${p} 和 ${titles.get(title)} 标题撞了`).toBeUndefined();
      titles.set(title, p);

      const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "";
      expect(desc.length, `${p} 没有 description`).toBeGreaterThan(40);

      // 自引用 canonical：本地化页面指自己，不能全指英文
      const canon = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1] ?? "";
      expect(new URL(canon).pathname, `${p} 的 canonical`).toBe(p);
    }
  }
});

test("hreflang is complete and bidirectional on the formal pages too", async ({ request }) => {
  for (const slug of LEGAL) {
    for (const [, prefix] of LOCALES) {
      const html = await (await request.get(url(prefix, slug))).text();
      // Next 输出的是 hrefLang 驼峰写法，HTML 属性名不分大小写，所以忽略大小写匹配
      const tags = [
        ...html.matchAll(/<link rel="alternate" hreflang="([^"]*)" href="([^"]*)"/gi),
      ].map((m) => [m[1], new URL(m[2]).pathname] as const);

      for (const [locale, target] of LOCALES) {
        expect(tags, `${url(prefix, slug)} 缺 ${locale}`).toContainEqual([
          locale,
          url(target, slug),
        ]);
      }
      // x-default 回英文
      expect(tags).toContainEqual(["x-default", url("", slug)]);
    }
  }
});

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
  // first() 是必须的：上面那个轮询会重投 paste，而两次投递之间转换可能已经成了，
  // 于是列表里出现两张都叫 pasted.docx 的卡片，严格模式直接判定选择器有歧义。
  // 粘两次得到两个文件是对的产品行为（用户真粘两次也该是两个），所以修的是断言
  // 而不是页面 —— 这条测试要证的是「文件名带过来了」，一张卡片就够证。
  await expect(page.getByText("pasted.docx").first()).toBeVisible();
});

test("every canonical URL answers 200", async ({ request }) => {
  for (const [, prefix] of LOCALES) {
    for (const slug of ALL_SLUGS) {
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
    "/en/privacy/",
    // 正式页面也只有这五个 slug，别的拼法不该有
    "/privacy-policy/",
    "/cookie/",
    // 不认识的 guide slug 必须真 404，不能回退到 /guides/ 列表页 ——
    // 回退等于每个拼写错误都变成一份重复内容的软 404
    "/guides/nope/",
    "/guides/word-to-markdown/",
    "/ja/guides/nope/",
    "/guides/word-to-markdown-keep-formatting/extra/",
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
    /* 307，不是 308 —— Cloudflare Workers 的 Static Assets 在
       html_handling: force-trailing-slash 下给的就是 307（实测 workerd，
       官方 html-handling 文档的表格里也只出现 307）。308 语义上更适合
       这种规范化跳转，但线上给的不是它，断言跟着线上写，否则这一条
       测的是 serve.mjs 自己而不是线上行为。 */
    expect(res.status(), `status for ${from}`).toBe(307);
    expect(res.headers()["location"], `location for ${from}`).toBe(to);
  }
});

test("sitemap and robots list only URLs that exist", async ({ request }) => {
  const xml = await (await request.get("/sitemap.xml")).text();
  const locs = [...xml.matchAll(/<loc>([^<]*)<\/loc>/g)].map((m) => m[1]);
  // 方案 §8.5：首页、工具页、各语言版本、About / Contact / Privacy / Terms
  // 这类正式页面全都要收进来，一条不少也一条不多
  expect(locs).toHaveLength(LOCALES.length * ALL_SLUGS.length);
  for (const [, prefix] of LOCALES) {
    for (const slug of ALL_SLUGS) {
      const p = url(prefix, slug);
      expect(
        locs.some((l) => new URL(l).pathname === p),
        `sitemap 漏了 ${p}`,
      ).toBe(true);
    }
  }
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

test("the privacy page's promises match what the site actually does", async ({ page, context }) => {
  // 写在隐私政策里的话是承诺，不是文案。转一份文件、切个语种，然后核对：
  // 一个 cookie 都不该有，storage 一片空白
  await page.goto("/privacy/", { waitUntil: "networkidle" });
  await page.goto("/", { waitUntil: "networkidle" });
  await page.locator("input[type=file]").setInputFiles(`${FIXTURES}/rich.docx`);
  await expect(page.locator("pre").first()).toBeVisible({ timeout: 15000 });

  expect(await context.cookies(), "站点设了 cookie，但隐私政策说没有").toEqual([]);
  const stored = await page.evaluate(() => ({
    local: Object.keys(localStorage),
    session: Object.keys(sessionStorage),
  }));
  expect(stored.local, "localStorage 里存了东西").toEqual([]);
  expect(stored.session, "sessionStorage 里存了东西").toEqual([]);
});

test("the contact page gives a working way to reach a person", async ({ page }) => {
  await page.goto("/contact/");
  // 一个没有联系方式的联系页会让 AdSense 直接退回
  const mail = page.locator('a[href^="mailto:"]').first();
  await expect(mail).toBeVisible();
  expect(await mail.getAttribute("href")).toMatch(/^mailto:.+@.+\..+/);
  // 联系页不该自己指回自己
  await expect(page.locator('main a[href="/contact/"]')).toHaveCount(0);
});

test("a hostile .docx can't smuggle scripts into the markdown", async ({ page }) => {
  const { external, errors } = watchNetwork(page);
  await page.goto("/");
  await page.locator("input[type=file]").setInputFiles(`${FIXTURES}/hostile.docx`);
  await expect(page.locator("pre").first()).toBeVisible({ timeout: 15000 });

  const md = await page.locator("pre").first().innerText();

  // 正文照常转出来 —— 净化不该把好内容一起吃掉
  expect(md).toContain("Hostile Document");
  expect(md).toContain("hostile body marker");
  expect(md).toContain("https://example.com/safe");

  // 危险协议一个都不许进 markdown。mammoth 会把 w:hyperlink 的 Target 原样写进
  // href，turndown 再照抄成 [label](javascript:...) —— 用户把这段贴到自己博客上
  // 就是一个能点的 XSS，危害转移给了下游
  expect(md.toLowerCase()).not.toContain("javascript:");
  expect(md.toLowerCase()).not.toContain("vbscript:");
  expect(md.toLowerCase()).not.toContain("data:text/html");
  expect(md).not.toContain("<script");

  // 链接文字要留着，只是不再可点
  expect(md).toContain("click me");

  // 用户有权知道文件里有东西被删了
  const warn = page.locator("details", { hasText: /removed unsafe/i });
  await expect(warn).toBeVisible();

  // 预览面板里不能出现真的可点链接
  await page.getByRole("tab", { name: /preview/i }).click();
  const panel = page.locator("[role=tabpanel]").filter({ hasText: "hostile body marker" });
  await expect(panel.locator("a")).toHaveCount(0);

  expect(external).toEqual([]);
  expect(errors).toEqual([]);
});

test("nothing from a hostile .docx ever executes", async ({ page }) => {
  // 上一个测试查的是产物，这个查的是运行时：哪怕净化漏了，也得看到它没跑起来
  const fired: string[] = [];
  await page.exposeFunction("__pwned", (how: string) => fired.push(how));
  await page.addInitScript(() => {
    // 任何脚本真的执行、或者 alert 真的弹出来，都记一笔
    window.alert = () => {
      (window as unknown as { __pwned: (s: string) => void }).__pwned("alert");
    };
  });

  await page.goto("/");
  await page.locator("input[type=file]").setInputFiles(`${FIXTURES}/hostile.docx`);
  await expect(page.locator("pre").first()).toBeVisible({ timeout: 15000 });
  await page.getByRole("tab", { name: /preview/i }).click();

  // 预览里的每个可点元素都点一遍，看有没有东西跑起来
  const panel = page.locator("[role=tabpanel]").filter({ hasText: "hostile body marker" });
  const clickables = panel.locator("a, [onclick], span");
  for (let i = 0; i < (await clickables.count()); i++) {
    await clickables.nth(i).click({ force: true, timeout: 2000 }).catch(() => {});
  }

  expect(fired, "有东西执行了").toEqual([]);
  // 也不该跳走
  expect(new URL(page.url()).pathname).toBe("/");
});

test("a zip bomb is refused before it's unpacked", async ({ page }) => {
  await page.goto("/");
  await page.locator("input[type=file]").setInputFiles(`${FIXTURES}/bomb.docx`);

  // .docx 本身就是 zip，几 KB 能声明展开成 3GB。文件大小限制挡不住这个，
  // 所以要在解压前看中央目录里声明的尺寸
  await expect(page.getByText(/zip bomb|expands to far more/i)).toBeVisible({
    timeout: 15000,
  });
  // 没有产出结果，也没把标签页拖死
  await expect(page.locator("pre")).toHaveCount(0);
});

test("pasted rich text converts and gets sanitized", async ({ page }) => {
  const { errors } = watchNetwork(page);
  await page.goto("/");

  // 模拟从 Google Docs 复制过来：剪贴板里只有 text/html，没有文件。
  // 这段 HTML 来自任意网页，和上传的文件一样不可信。
  await page.evaluate(() => {
    const dt = new DataTransfer();
    dt.setData(
      "text/html",
      '<h1>Pasted Heading</h1><p><b>bold</b> and <a href="javascript:alert(1)">evil</a>' +
        ' and <a href="https://example.com/ok">fine</a></p>' +
        '<p onmouseover="alert(2)">hover</p><script>alert(3)<\/script>' +
        "<table><tr><th>A</th></tr><tr><td>1</td></tr></table>",
    );
    window.dispatchEvent(new ClipboardEvent("paste", { clipboardData: dt, bubbles: true }));
  });

  await expect(page.locator("pre").first()).toBeVisible({ timeout: 15000 });
  const md = await page.locator("pre").first().innerText();

  expect(md).toContain("# Pasted Heading");
  expect(md).toContain("**bold**");
  expect(md).toContain("https://example.com/ok");
  expect(md).toContain("| A |");

  expect(md.toLowerCase()).not.toContain("javascript:");
  expect(md).not.toContain("onmouseover");
  expect(md).not.toContain("alert(3)");
  // 事件属性删掉，但文字留着
  expect(md).toContain("hover");

  expect(errors).toEqual([]);
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

/* ── 新增的四个转换器 ──────────────────────────────────── */

test("pdf text extraction runs off same-origin assets", async ({ page }) => {
  const { external, errors } = watchNetwork(page);
  await page.goto("/pdf-to-markdown/");
  await page.locator("input[type=file]").setInputFiles(`${FIXTURES}/sample.pdf`);
  await expect(page.locator("pre").first()).toBeVisible({ timeout: 30000 });

  const md = await page.locator("pre").first().innerText();
  // 字号推出来的标题层级：24pt 是一级，16pt 低一级
  expect(md).toMatch(/^#+ Quarterly Report$/m);
  expect(md).toMatch(/^#+ Findings$/m);
  // 段落内的软换行要合回一行，行尾连字符要接上
  expect(md).toContain("conversion step, hyphen included.");
  // 列表按行首字符认出来
  expect(md).toMatch(/^[-*+] first bullet item$/m);
  expect(md).toMatch(/^1\. first numbered item$/m);
  // 第二页也要读到
  expect(md).toContain("Second page body text.");
  // 页脚的小字（页码）当页面调度丢掉
  expect(md).not.toContain("page 1");

  // 「文件不出本机」也包括 worker 和字体：pdfjs 的 workerSrc 若不是同源，
  // pdf.js 会走 _createCDNWrapper 去外网拿
  expect(external, "pdf.js 打了外部请求").toEqual([]);
  expect(errors).toEqual([]);
});

test("pdf page marks are optional and land between pages", async ({ page }) => {
  await page.goto("/pdf-to-markdown/");
  await page.locator("input[type=file]").setInputFiles(`${FIXTURES}/sample.pdf`);
  await expect(page.locator("pre").first()).toBeVisible({ timeout: 30000 });
  expect(await page.locator("pre").first().innerText()).not.toContain("page 2");

  // 打开页面标记后就地重跑，不需要重新上传
  await page.getByRole("button", { name: /mark pages/i }).click();
  await expect
    .poll(async () => page.locator("pre").first().innerText(), { timeout: 30000 })
    .toMatch(/page 2/i);
});

test("a scanned pdf says so instead of returning an empty file", async ({ page }) => {
  await page.goto("/pdf-to-markdown/");
  await page.locator("input[type=file]").setInputFiles(`${FIXTURES}/scan.pdf`);
  // 扫描件里没有文字层。给一份空 markdown 是最糟的结果 ——
  // 用户会以为工具坏了，而真正该知道的是「这需要 OCR」
  await expect(page.getByText(/scan|no text/i).first()).toBeVisible({ timeout: 30000 });
  await expect(page.locator("pre")).toHaveCount(0);
});

test("password-protected files say so instead of failing vaguely", async ({ page }) => {
  // 方案 §17：「扫描 PDF 和加密文件有明确提示」。扫描件上面测了，加密的在这儿。
  //
  // 这类文件在浏览器里是彻底没救的：没有地方让用户输密码，也不该有。所以唯一
  // 有用的产出是一句「去掉密码再来」—— 报「转换失败」的话用户只会反复重试。
  for (const [slug, file, want] of [
    ["pdf-to-markdown", "locked.pdf", /password/i],
    // 加了密码的 xlsx 其实是个 OLE 容器，和老的 .xls 走同一条分支
    ["excel-to-markdown", "locked.xlsx", /password|\.xls\b/i],
  ] as const) {
    await page.goto(`/${slug}/`);
    await page.locator("input[type=file]").setInputFiles(`${FIXTURES}/${file}`);

    const msg = page.getByText(want).first();
    await expect(msg, `${file} 没给出加密提示`).toBeVisible({ timeout: 30000 });
    // 提示里要说清下一步做什么，不能只说「打不开」
    await expect(page.getByText(/remove the password|without a password/i).first()).toBeVisible();
    // 别同时又吐一份空产物出来 —— 那等于告诉用户「转好了」
    await expect(page.locator("pre")).toHaveCount(0);
  }
});

/*
 * 系统选择器必须放行全站能处理的所有格式，不只本页的。
 *
 * 根因是把 `input.accept`（这一页转什么）当成了选择器的过滤器（这个站能拿
 * 这个文件做什么）—— 灰掉的文件进不了 run()，那套「这一页不收，去那一页」
 * 的路由一句都不会触发，用户看到的只是文件点不动。docs2html 上踩了两次
 * （Word、Excel），这个站结构一样，所以同样盯一条。
 *
 * 下面那条测的是「打开选择器之前的指路文案」，不够 —— 人是先点按钮再读字的。
 */
test("the picker offers every format the site can handle, not just this page's", async ({
  page,
}) => {
  await page.goto("/csv-to-markdown/");
  const accept = (await page.locator("input[type=file]").getAttribute("accept")) ?? "";
  const offered = accept.split(",").map((s) => s.trim());

  for (const ext of [".xlsx", ".docx", ".pdf", ".html"]) {
    expect(offered, `选择器该放行 ${ext}`).toContain(ext);
  }

  // 「本页收什么」那行字不跟着放宽：它说的是这一页的真实边界
  await expect(page.locator("#convert").getByText(/^\.csv \.tsv \.txt \//)).toBeVisible();

  // 选中一个本页不收的，要有解释和链接，不是静默或硬解出垃圾
  await page.locator("input[type=file]").setInputFiles(`${FIXTURES}/sample.xlsx`);
  await expect(page.getByText(/\.xlsx/i).first()).toBeVisible({ timeout: 15000 });
  await expect(
    page.locator("#convert").locator("a[href*='excel-to-markdown']").first(),
  ).toBeVisible();
  await expect(page.locator("pre")).toHaveCount(0);
});

/*
 * 同一个引擎的几个入口不能列成几条链接。
 *
 * `.docx` 这个站有三页收（docx-to-markdown、word-to-markdown、
 * google-docs-to-markdown），但三页是同一个转换器，转出来的东西一字不差 ——
 * 列三个链接就是拿三个同义词烦用户。判据是引擎不是页数，去重在
 * `pagesForExtension` 里。
 *
 * 顺带盯住那句文案：只有一个去处时说的是「这一页收：」这个确定的答案，
 * 不能用「哪个都可能，你自己认」那句 —— 后者是给真歧义的（docs2html 的
 * `.txt` 三个引擎都收）。这个站今天没有真歧义的扩展名，加页面时很容易造出
 * 一个，那时候这条会红。
 */
test("pages sharing one engine collapse to a single link", async ({ page }) => {
  await page.goto("/csv-to-markdown/");
  await page.locator("input[type=file]").setInputFiles(`${FIXTURES}/rich.docx`);

  /* 必须锁到那张失败的任务卡上，不能用整个 #convert —— 拖放区上方那行前置
     指路文案里也有去 DOCX 页的链接，用 #convert 的话报错里一个链接都没有
     这条照样绿。 */
  const card = page.locator("#convert li").filter({ hasText: "rich.docx" });
  await expect(card.getByText(/\.docx/i).first()).toBeVisible({ timeout: 15000 });

  // 一条，不是三条
  await expect(card.locator("a[href$='/docx-to-markdown/']")).toHaveCount(1);
  await expect(card.locator("a[href$='/word-to-markdown/']")).toHaveCount(0);
  await expect(card.locator("a[href$='/google-docs-to-markdown/']")).toHaveCount(0);

  // 去处唯一时用确定的那句，不用「哪个都可能」
  await expect(card.getByText(/could be any of these/i)).toHaveCount(0);
  await expect(page.locator("pre")).toHaveCount(0);
});

/*
 * `accept` 把不收的格式在系统选择器里变灰 —— 灰掉的文件永远进不了 run()，
 * 所以「这一页不收 .docx，去 DOCX → Markdown」那套报错对走按钮的用户一句都
 * 不会触发，用户看到的只是「Word 文档点不动」，没有任何解释。拖进来的人反而
 * 有指路，两条入口的待遇正好反了。
 *
 * 所以指路必须在打开选择器之前就摆在页面上。这条盯的是那个前置说明，
 * 不是报错。
 */
test("the dropzone names the formats it doesn't take, before the picker opens", async ({
  page,
}) => {
  await page.goto("/csv-to-markdown/");
  const zone = page.locator("#convert");

  await expect(zone.getByText(".docx", { exact: false }).first()).toBeVisible();
  await expect(zone.getByRole("link", { name: /docx/i }).first()).toHaveAttribute(
    "href",
    /\/docx-to-markdown\/$/,
  );
  await expect(zone.getByRole("link", { name: /pdf/i }).first()).toHaveAttribute(
    "href",
    /\/pdf-to-markdown\/$/,
  );

  // 本页自己收的格式不能出现在指路行里 —— CSV 页收 .txt，
  // 不该把用户推去别处转一个这里就能转的文件
  await expect(zone.getByText(/Other formats:/)).not.toContainText(/\.tsv(\s|$)/);
});

test("csv detects the delimiter and keeps values verbatim", async ({ page }) => {
  const { external, errors } = watchNetwork(page);
  await page.goto("/csv-to-markdown/");
  await page.locator("input[type=file]").setInputFiles(`${FIXTURES}/sample.csv`);
  await expect(page.locator("pre").first()).toBeVisible({ timeout: 15000 });

  const md = await page.locator("pre").first().innerText();
  expect(md).toContain("| name | role | note |");
  expect(md).toContain("| Ada | engineer | born 1815, London |");
  // 前导零不许被当成数字：dynamicTyping 关着就是为了这个
  expect(md).toContain("| Katherine | mathematician | 007 |");
  // 单元格内的真换行会把一行劈成两行，必须换成 <br>
  expect(md).toContain("line one<br>line two");
  // 表头 + 分隔行 + 三行数据。引号里的换行不算新行，所以是 5 不是 6
  expect(md.split("\n").filter((l) => l.startsWith("|"))).toHaveLength(5);

  // 分号分隔要自己认出来，并且告诉用户认到了什么
  const warn = page.locator("details", { hasText: /delimiter/i });
  await expect(warn).toBeVisible();

  expect(external).toEqual([]);
  expect(errors).toEqual([]);
});

test("csv accepts pasted text and the header knob re-runs in place", async ({ page }) => {
  await page.goto("/csv-to-markdown/");
  await page.locator("textarea").fill("a,b\n1,2\n3,4");
  await page.getByRole("button", { name: /^(convert|run)$/i }).click();
  await expect(page.locator("pre").first()).toBeVisible({ timeout: 15000 });
  expect(await page.locator("pre").first().innerText()).toContain("| a | b |");

  // 关掉表头：markdown 表格语法必须有表头行，所以给一个空的，数据整体下移
  await page.getByRole("button", { name: /^none$/i }).click();
  await expect
    .poll(async () => page.locator("pre").first().innerText(), { timeout: 15000 })
    .toMatch(/\|\s+\|\s+\|/);
  const md = await page.locator("pre").first().innerText();
  expect(md).toContain("| a | b |");
  expect(md.split("\n").filter((l) => l.startsWith("|"))).toHaveLength(5);
});

test("xlsx reads displayed values and lets you pick sheets", async ({ page }) => {
  const { external, errors } = watchNetwork(page);
  await page.goto("/excel-to-markdown/");
  await page.locator("input[type=file]").setInputFiles(`${FIXTURES}/sample.xlsx`);
  await expect(page.locator("pre").first()).toBeVisible({ timeout: 20000 });

  let md = await page.locator("pre").first().innerText();
  // 默认只转第一张表
  expect(md).toContain("| Region | Revenue |");
  expect(md).toContain("| APAC | 17 |");
  // 公式格读的是缓存的显示值，不是公式源码 —— 方案 §5.5
  expect(md).toContain("| Total | 42 |");
  expect(md).not.toContain("SUM(");
  expect(md).not.toContain("pipe");

  // 第二张表加进来：多表时每张前面加 ## 标题当分隔
  await page.getByRole("button", { name: /^Notes/ }).click();
  await expect
    .poll(async () => page.locator("pre").first().innerText(), { timeout: 20000 })
    .toContain("## Notes");
  md = await page.locator("pre").first().innerText();
  expect(md).toContain("## Numbers");
  // 单元格里的管道要转义，否则表格从中间断开
  expect(md).toContain("pipe\\|inside");
  expect(md).toContain("line one<br>line two");

  expect(external).toEqual([]);
  expect(errors).toEqual([]);
});

test("html paste is sanitized before it ever becomes markdown", async ({ page }) => {
  const { errors } = watchNetwork(page);
  await page.goto("/html-to-markdown/");

  await page.locator("textarea").fill(
    '<h1>Pasted Page</h1><p><b>bold</b> ' +
      '<a href="javascript:alert(1)">evil</a> ' +
      '<a href="https://example.com/ok">fine</a></p>' +
      '<p onmouseover="alert(2)">hover</p><script>alert(3)<\/script>' +
      '<iframe src="https://evil.example"></iframe>' +
      "<table><tr><th>A</th></tr><tr><td>1</td></tr></table>",
  );
  await page.getByRole("button", { name: /^(convert|run)$/i }).click();
  await expect(page.locator("pre").first()).toBeVisible({ timeout: 15000 });

  const md = await page.locator("pre").first().innerText();
  expect(md).toContain("# Pasted Page");
  expect(md).toContain("**bold**");
  expect(md).toContain("https://example.com/ok");
  expect(md).toContain("| A |");
  // 内容留着，能点的部分不留
  expect(md).toContain("hover");
  expect(md).toContain("evil");

  expect(md.toLowerCase()).not.toContain("javascript:");
  expect(md).not.toContain("onmouseover");
  expect(md).not.toContain("alert(3)");
  expect(md).not.toContain("<iframe");
  expect(md).not.toContain("evil.example");

  expect(errors).toEqual([]);
});

test("styled html converts instead of reporting a damaged file", async ({ page }) => {
  // 回归测试。曾经这一整类输入都是错的：净化配置里写了
  // USE_PROFILES: { html: true }，而它不是在白名单之上再收一道，是整个替换掉
  // ALLOWED_ATTR —— style 和 id 被放回来，随后 assertClean 认出它们不该在，
  // 抛异常，用户看到的是一句「文件可能已损坏」。
  //
  // 真实网页上几乎每个元素都带 style，所以「从浏览器复制一段内容粘进来」这条
  // 主路径是整个坏掉的，而当时没有任何测试覆盖到带 style 的输入。
  const { errors } = watchNetwork(page);
  await page.goto("/html-to-markdown/");

  await page.locator("textarea").fill(
    '<h1 style="color:red;mso-line-height-rule:exactly">Styled Heading</h1>' +
      '<p id="p1" style="font-size:14px">Body <b style="font-weight:700">text</b>.</p>' +
      '<table style="border:1px solid"><tr><th style="width:50%">A</th>' +
      '<th colspan="2">B</th></tr><tr><td>1</td><td>2</td><td>3</td></tr></table>' +
      '<ol start="5"><li>five</li></ol>',
  );
  await page.getByRole("button", { name: /^(convert|run)$/i }).click();
  await expect(page.locator("pre").first()).toBeVisible({ timeout: 15000 });

  const md = await page.locator("pre").first().innerText();
  expect(md).toContain("# Styled Heading");
  expect(md).toContain("**text**");
  expect(md).toContain("| A |");
  expect(md).toContain("five");
  // style / id 仍然一个都不该留 —— 修的是「配置替换白名单」，不是放宽白名单
  expect(md).not.toContain("color:red");
  expect(md).not.toContain("mso-");
  expect(md).not.toContain('id="p1"');

  // 报错框根本不该出现
  await expect(page.getByText(/may be damaged|password-protected/i)).toHaveCount(0);
  expect(errors).toEqual([]);
});

test("nothing from pasted html executes", async ({ page }) => {
  const fired: string[] = [];
  await page.exposeFunction("__pwned", (how: string) => fired.push(how));
  await page.addInitScript(() => {
    window.alert = () => {
      (window as unknown as { __pwned: (s: string) => void }).__pwned("alert");
    };
  });

  await page.goto("/html-to-markdown/");
  await page.locator("textarea").fill(
    '<img src=x onerror="alert(1)"><svg onload="alert(2)"></svg>' +
      '<a href="javascript:alert(3)">click</a><p>body marker</p>',
  );
  await page.getByRole("button", { name: /^(convert|run)$/i }).click();
  await expect(page.locator("pre").first()).toBeVisible({ timeout: 15000 });
  await page.getByRole("tab", { name: /preview/i }).click();

  const panel = page.locator("[role=tabpanel]").filter({ hasText: "body marker" });
  const clickables = panel.locator("a, [onclick], span");
  for (let i = 0; i < (await clickables.count()); i++) {
    await clickables.nth(i).click({ force: true, timeout: 2000 }).catch(() => {});
  }
  expect(fired, "有东西执行了").toEqual([]);
  await expect(panel.locator("a")).toHaveCount(0);
});

test("each tool page only loads the parser it needs", async ({ page }) => {
  // 方案 §8：首页不得加载全部解析库。mammoth / pdf.js / read-excel-file /
  // papaparse 加起来好几 MB，一次访问只会用到一个。
  const seen: string[] = [];
  page.on("request", (r) => {
    if (r.resourceType() === "script") seen.push(r.url());
  });

  const heavy = /pdf\.worker|pdfjs/i;
  await page.goto("/", { waitUntil: "networkidle" });
  expect(seen.filter((u) => heavy.test(u)), "首页拉了 pdfjs").toEqual([]);

  await page.goto("/csv-to-markdown/", { waitUntil: "networkidle" });
  expect(seen.filter((u) => heavy.test(u)), "CSV 页拉了 pdfjs").toEqual([]);

  // 反过来：PDF 页在真的丢文件进去之后才该拿 worker
  seen.length = 0;
  await page.goto("/pdf-to-markdown/", { waitUntil: "networkidle" });
  expect(seen.filter((u) => heavy.test(u)), "PDF 页空着就拉了 worker").toEqual([]);
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
