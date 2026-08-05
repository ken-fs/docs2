import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { expect, test, type Page } from "@playwright/test";

/**
 * docs2html 的本地验收。
 *
 * 和 docstomd 那套是姐妹关系，但不是同一份改个 slug —— 输出方向反了，
 * 要验的东西跟着变：
 *
 *   - 产物是 HTML，所以下载名是 .html，而且「片段 / 整页」这个选择要真的
 *     改变产物结构。
 *   - 预览不再是页面里直接渲染的一块 DOM，而是 sandbox="" 的 iframe + srcdoc
 *     （方案 §13）。这条是硬要求，单独立一个测试盯着。
 *   - 多了「清掉了什么」这一节，而且只该出现在输入本来就脏的两页上。
 *   - DOCX 那页多一条「HTML + 图片 ZIP」的出口（方案 §6.2）。
 *   - 没有 PDF 页，所以没有文字层 / 扫描件那一组测试。
 */

/** [hreflang 语言码, URL 前缀]。英文不带前缀。 */
const LOCALES = [
  ["en", ""],
  ["zh-CN", "zh-cn"],
  ["zh-TW", "zh-tw"],
  ["es", "es"],
  ["pt", "pt"],
  ["ja", "ja"],
] as const;

/** 方案 §6 的六个工具页，加首页。 */
const SLUGS = [
  "",
  "markdown-to-html",
  "docx-to-html",
  "google-docs-to-html",
  "text-to-html",
  "csv-to-html-table",
  "excel-to-html-table",
];

/** 方案 §15 要求 AdSense 上线前这五页齐备，而且每个语种都得有。 */
const LEGAL = ["about", "contact", "privacy", "terms", "cookies"];

/** 长尾内容页：六个工具页各对应一篇。 */
const GUIDES = [
  "guides",
  "guides/markdown-tables-to-html",
  "guides/word-to-html-keep-formatting",
  "guides/google-docs-to-html-clean",
  "guides/plain-text-to-html-paragraphs",
  "guides/csv-to-html-table-large-files",
  "guides/excel-to-html-table-formulas",
];

/** sitemap 和 canonical 检查覆盖全站，不只是工具页。 */
const ALL_SLUGS = [...SLUGS, ...LEGAL, ...GUIDES];

/** 只有这两页的输入本来就带垃圾，所以只有它们该有「清掉了什么」那一节。 */
const DIRTY_PAGES = ["docx-to-html", "google-docs-to-html"];

/** 全站 trailingSlash，路径一律以 / 结尾。 */
function url(prefix: string, slug: string) {
  return `/${[prefix, slug].filter(Boolean).map((p) => `${p}/`).join("")}`;
}

// 固件跟测试放一起。image.docx 是这站独有的 —— 抽图那条路（方案 §6.2）
// 需要一份真带内嵌图片的文档，而 rich.docx 一张图都没有。
// 造它的脚本在 fixtures/make-image-docx.py。
const FIXTURES = path.join(__dirname, "fixtures");

/** 站点承诺「文件不出本机」，所以任何外部请求都算 bug。 */
function watchNetwork(page: Page) {
  const external: string[] = [];
  const errors: string[] = [];
  page.on("request", (r) => {
    const u = r.url();
    if (
      !u.startsWith("http://localhost") &&
      !u.startsWith("data:") &&
      !u.startsWith("blob:") &&
      // sandbox="" 的 iframe 用 srcdoc 加载，about:srcdoc 不是网络请求
      !u.startsWith("about:")
    ) {
      external.push(u);
    }
  });
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  page.on("pageerror", (e) => errors.push(String(e)));
  return { external, errors };
}

/** 结果区的源码。tab 名在六个语种里都不一样，靠 <pre> 定位最稳。 */
function source(page: Page) {
  return page.locator("pre").first();
}

async function waitForResult(page: Page, timeout = 15000) {
  await expect(source(page)).toBeVisible({ timeout });
  return source(page).innerText();
}

/**
 * 产物里所有 href / src 的值。
 *
 * 危险协议要按属性值查，不能对整段 HTML 做子串匹配：`javascript:` 这几个字
 * 完全可以作为可见正文合法出现（markdown 里写 `[x](javascript:…)` 时
 * markdown-it 拒绝生成链接，原样留成文字就是正确行为），而 Google 的
 * 重定向包装里也可能带着它当查询参数。真正要盯的是「它有没有变成一个能点的
 * 地址」。
 */
function urlsIn(html: string) {
  return [...html.matchAll(/(?:href|src|cite)="([^"]*)"/gi)].map((m) => m[1]);
}

/** 断言产物里没有任何一个可点的危险地址。 */
function expectNoDangerousUrls(html: string) {
  for (const u of urlsIn(html)) {
    const flat = u.replace(/[\u0000-\u0020\u00a0]/g, "").toLowerCase();
    expect(flat, `危险地址进了产物：${u}`).not.toMatch(
      /^(?:javascript|vbscript|data):/,
    );
  }
}

/** 预览面板那个 iframe。方案 §13 的落点。 */
function previewFrame(page: Page) {
  return page.locator("iframe");
}

async function openPreview(page: Page) {
  await page.getByRole("tab", { name: /preview/i }).click();
  await expect(previewFrame(page)).toBeVisible();
}

/* ── 每页都要能渲染出来 ───────────────────────────────── */

for (const [locale, prefix] of LOCALES) {
  for (const slug of SLUGS) {
    const p = url(prefix, slug);
    test(`renders ${p} (${locale})`, async ({ page }) => {
      const { external, errors } = watchNetwork(page);
      await page.goto(p, { waitUntil: "networkidle" });

      await expect(page.locator("html")).toHaveAttribute("lang", locale);
      // 一页一个 H1 —— 方案 §8
      await expect(page.locator("h1")).toHaveCount(1);
      const h1 = (await page.locator("h1").innerText()).trim();
      expect(h1.length).toBeGreaterThan(4);

      // 方案 §8.7 的正文三段 + FAQ + 转换器
      await expect(page.locator("#how")).toBeAttached();
      await expect(page.locator("#faq")).toBeAttached();
      await expect(page.locator("#convert")).toBeAttached();
      await expect(page.locator("input[type=file]")).toHaveCount(1);

      // 「清掉了什么」只该出现在输入本来就脏的页面上。CSV 页面摆一张
      // 「删掉了 mso- 样式」的表是在说一件没发生的事
      const expectClean = DIRTY_PAGES.includes(slug);
      await expect(page.locator("#cleans")).toHaveCount(expectClean ? 1 : 0);

      expect(external, `external requests on ${p}`).toEqual([]);
      expect(errors, `console errors on ${p}`).toEqual([]);
    });
  }
}

for (const [locale, prefix] of LOCALES) {
  for (const slug of LEGAL) {
    const p = url(prefix, slug);
    test(`renders ${p} (${locale})`, async ({ page }) => {
      const { external, errors } = watchNetwork(page);
      await page.goto(p, { waitUntil: "networkidle" });

      await expect(page.locator("html")).toHaveAttribute("lang", locale);
      // 长度只做「不是空的」下限：中日文里「服务条款」四个字就是一个完整
      // 标题，按拉丁字母的字数卡会误伤
      await expect(page.locator("h1")).toHaveCount(1);
      expect((await page.locator("h1").innerText()).trim().length).toBeGreaterThan(2);

      // 正式页面没有转换器，但必须是真内容。AdSense 审核就看这个：
      // 五页齐备而每页两句话，照样退回
      await expect(page.locator("#faq")).toHaveCount(0);
      await expect(page.locator("input[type=file]")).toHaveCount(0);
      const words = (await page.locator("main").innerText()).trim();
      expect(words.length, `${p} 内容太薄`).toBeGreaterThan(900);
      expect(await page.locator("main h2").count()).toBeGreaterThanOrEqual(3);

      expect(external, `external requests on ${p}`).toEqual([]);
      expect(errors, `console errors on ${p}`).toEqual([]);
    });
  }
}

/* ── SEO 与合规 ───────────────────────────────────────── */

test("the five formal pages are one click from any tool page", async ({ request }) => {
  // 方案 §15 要「清晰导航」：审核员从任意落地页都得能走到 About / Privacy。
  // 查静态 HTML 而不是点击，顺带确认不依赖 JS
  for (const p of ["/", "/ja/docx-to-html/", "/es/csv-to-html-table/"]) {
    const html = await (await request.get(p)).text();
    const foot = html.match(/<footer[\s\S]*?<\/footer>/)?.[0];
    expect(foot, `${p} 没有 footer`).toBeTruthy();
    const prefix = p === "/" ? "" : p.split("/")[1];
    for (const slug of LEGAL) {
      expect(foot, `${p} 的页脚缺 ${slug}`).toContain(`href="${url(prefix, slug)}"`);
    }
  }
});

test("every tool page links to the sibling site", async ({ request }) => {
  // 两站互指：找错门的人一次就能走到对的那边，权重也传得过去。
  // 不能加 nofollow —— 那是自己的站
  const html = await (await request.get("/text-to-html/")).text();
  const link = html.match(/<a[^>]*href="https:\/\/docstomd\.com\/"[^>]*>/)?.[0];
  expect(link, "没有指向 docstomd.com 的链接").toBeTruthy();
  expect(link).not.toContain("nofollow");
});

test("tool pages carry WebApplication markup and a two-step breadcrumb", async ({
  request,
}) => {
  for (const slug of ["markdown-to-html", "excel-to-html-table"]) {
    const html = await (await request.get(url("", slug))).text();
    const block = html.match(
      /<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
    )?.[1];
    expect(block, `${slug} 没有结构化数据`).toBeTruthy();
    const graph = JSON.parse(block!) as Record<string, unknown>[];
    const types = graph.map((n) => n["@type"]);

    expect(types, `${slug} 缺 WebApplication`).toContain("WebApplication");
    expect(types, `${slug} 缺 FAQPage`).toContain("FAQPage");

    const crumbs = graph.find((n) => n["@type"] === "BreadcrumbList");
    expect(crumbs, `${slug} 没有面包屑`).toBeTruthy();
    expect(crumbs!.itemListElement as unknown[]).toHaveLength(2);

    // 方案 §8.6 禁止编造评分、评论和下载量
    const flat = JSON.stringify(graph);
    expect(flat).not.toContain("aggregateRating");
    expect(flat).not.toContain("reviewCount");
    expect(flat).not.toContain("ratingValue");
    expect(flat).not.toContain("downloadCount");
  }

  // 首页只有自己一层，单元素面包屑没有信息量，不该发
  const home = await (await request.get("/")).text();
  const homeGraph = JSON.parse(
    home.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)![1],
  ) as Record<string, unknown>[];
  expect(homeGraph.map((n) => n["@type"])).not.toContain("BreadcrumbList");
});

test("formal pages carry WebPage markup, not WebApplication", async ({ request }) => {
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
});

test("every page has its own title, description and self-canonical", async ({
  request,
}) => {
  const titles = new Map<string, string>();
  const descs = new Map<string, string>();
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
      // 方案 §8.7：不同工具页的正文必须是格式特定的内容，不能是换关键词。
      // description 撞了就是最直接的信号
      expect(descs.get(desc), `${p} 和 ${descs.get(desc)} 描述撞了`).toBeUndefined();
      descs.set(desc, p);

      // 自引用 canonical：本地化页面指自己，不能全指英文
      const canon = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1] ?? "";
      expect(new URL(canon).pathname, `${p} 的 canonical`).toBe(p);
      expect(new URL(canon).host, `${p} 的 canonical 域名`).toBe("docs2html.com");
    }
  }
});

test("hreflang is complete and bidirectional on the formal pages too", async ({
  request,
}) => {
  for (const slug of [...LEGAL, "excel-to-html-table"]) {
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
  for (const p of [
    "/",
    "/ja/docx-to-html/",
    "/zh-tw/excel-to-html-table/",
    "/pt/google-docs-to-html/",
  ]) {
    await page.goto(p, { waitUntil: "networkidle" });
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow, `overflow on ${p}`).toBeLessThanOrEqual(1);

    // 头部导航必须单行 —— 六个入口在 375px 上放不下，所以是横向滚动，
    // 折行会让页头高度乱跳
    const rows = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll("header nav a"));
      const visible = links.filter((a) => (a as HTMLElement).offsetParent !== null);
      return new Set(visible.map((a) => Math.round(a.getBoundingClientRect().top))).size;
    });
    expect(rows, `nav rows on ${p}`).toBe(1);
  }
});

test("language switch keeps the slug", async ({ page }) => {
  await page.goto("/csv-to-html-table/");
  const box = page.locator('[data-slot="lang-switch"]');

  await box.locator("summary").click();
  await box.getByRole("link", { name: "日本語" }).click();
  await expect(page).toHaveURL(/\/ja\/csv-to-html-table\/$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "ja");

  // 切回去，slug 还得在
  await box.locator("summary").click();
  await box.getByRole("link", { name: "Español" }).click();
  await expect(page).toHaveURL(/\/es\/csv-to-html-table\/$/);

  // 英文没有前缀，切回英文应该落在裸 slug 上
  await box.locator("summary").click();
  await box.getByRole("link", { name: "English" }).click();
  await expect(page).toHaveURL(/\/csv-to-html-table\/$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
});

test("the switcher's six links sit in the static HTML", async ({ request }) => {
  // 方案 §7：切换器必须是真的 <a href>，不跑 JS 也能被爬到。
  // 所以链接必须在源码里，不能等展开才挂载
  const html = await (await request.get("/ja/docx-to-html/")).text();
  const box = html.match(/<details[^>]*data-slot="lang-switch"[\s\S]*?<\/details>/)?.[0];
  expect(box, "lang-switch 不在静态 HTML 里").toBeTruthy();

  for (const [locale, prefix] of LOCALES) {
    expect(box, `缺 ${locale} 的链接`).toContain(
      `href="${url(prefix, "docx-to-html")}"`,
    );
  }
});

test("accordion opens and closes with a height transition", async ({ page }) => {
  await page.goto("/");
  const triggers = page.locator("#faq button");
  const first = triggers.first();
  const second = triggers.nth(1);

  // 第一条默认展开
  await expect(first).toHaveAttribute("data-panel-open", "");
  await expect(page.locator("#faq [role=region]").first()).toBeVisible();

  await expect(second).not.toHaveAttribute("data-panel-open", "");
  await second.click();
  await expect(second).toHaveAttribute("data-panel-open", "");
  const panel2 = page.locator("#faq [role=region]").nth(1);
  await expect(panel2).toBeVisible();
  await expect
    .poll(async () => (await panel2.boundingBox())?.height ?? 0)
    .toBeGreaterThan(10);

  await second.click();
  await expect(second).not.toHaveAttribute("data-panel-open", "");
  await expect(panel2).toBeHidden();

  // multiple: 第一条应该还开着
  await expect(first).toHaveAttribute("data-panel-open", "");
});

/* ── 首页那条：Markdown → HTML ──────────────────────────── */

test("markdown converts, tabs slide, and the html is real markup", async ({ page }) => {
  const { external, errors } = watchNetwork(page);
  await page.goto("/");

  await page.locator("textarea").fill(
    [
      "# Quarterly Report",
      "",
      "Some **bold** and *italic* text with a [link](https://example.com).",
      "",
      "## Numbers",
      "",
      "| Region | Revenue |",
      "| --- | --- |",
      "| APAC | 1,200 |",
      "",
      "- [x] Ship the thing",
      "- [ ] Tell people about it",
      "",
      "~~struck out~~",
      "",
      "```js",
      'console.log("hello")',
      "```",
    ].join("\n"),
  );
  await page.getByRole("button", { name: /^convert$/i }).click();

  const html = await waitForResult(page);

  // CommonMark 的基本盘
  expect(html).toContain("<h1>Quarterly Report</h1>");
  expect(html).toContain("<strong>bold</strong>");
  expect(html).toContain("<em>italic</em>");
  expect(html).toContain('<a href="https://example.com">link</a>');

  // GFM 三件套。表头要是真的 <thead> + <th> —— 用 div 拼出来的网格
  // 屏幕阅读器读不成一张表
  expect(html).toContain("<h2>Numbers</h2>");
  expect(html).toContain("<table>");
  expect(html).toContain("<thead>");
  expect(html).toMatch(/<th[^>]*>Region<\/th>/);
  expect(html).toContain("<td>APAC</td>");
  expect(html).toContain("<s>struck out</s>");
  // 任务列表是禁用的复选框，不是字面的方括号
  expect(html).toContain('type="checkbox"');
  expect(html).toContain("disabled");
  expect(html).toContain("task-list-item");
  // 勾上的那条要 checked，没勾的不能有 —— 否则两条渲染成一样，状态就丢了
  expect(html).toMatch(/<input[^>]*checked[^>]*>\s*Ship the thing/);
  expect(html).not.toMatch(/<input[^>]*checked[^>]*>\s*Tell people/);
  expect(html).not.toContain("[x] Ship");
  // 代码块带 language- 钩子，颜色留给用户自己的高亮器
  expect(html).toContain('class="language-js"');

  // 片段模式不该带文档壳：那会去改用户已有页面的样子
  expect(html).not.toContain("<!DOCTYPE");
  expect(html).not.toContain("<style>");

  // 墨块 Indicator 由 --active-tab-left 驱动，切 tab 后应该滑到新位置
  const indicator = page.locator('[data-slot="tabs-indicator"]');
  const leftOf = () =>
    indicator.evaluate((el) =>
      getComputedStyle(el).getPropertyValue("--active-tab-left").trim(),
    );
  const before = await leftOf();
  expect(before).not.toBe("");

  const preview = page.getByRole("tab", { name: /preview/i });
  await preview.click();
  await expect(preview).toHaveAttribute("data-active", "");
  await expect.poll(leftOf).not.toBe(before);
  await page.waitForTimeout(400);
  const ind = (await indicator.boundingBox())!;
  const tab = (await preview.boundingBox())!;
  expect(Math.abs(ind.x - tab.x)).toBeLessThan(2);
  expect(Math.abs(ind.width - tab.width)).toBeLessThan(2);

  expect(external).toEqual([]);
  expect(errors).toEqual([]);
});

test("fragment and full-page modes produce genuinely different output", async ({
  page,
}) => {
  // 方案 §6.1 要两种模式。差别不能只是文案上说说 —— 片段贴进已有页面，
  // 整页要能直接双击打开，两者要的东西完全不同
  await page.goto("/markdown-to-html/");
  await page.locator("textarea").fill("# Hello\n\nA paragraph.");
  await page.getByRole("button", { name: /^convert$/i }).click();

  const fragment = await waitForResult(page);
  expect(fragment).toContain("<h1>Hello</h1>");
  expect(fragment).not.toContain("<html");
  expect(fragment).not.toContain("<meta");

  await page.getByRole("button", { name: /^full page$/i }).click();
  await expect.poll(() => source(page).innerText()).toContain("<!DOCTYPE html>");

  const doc = await source(page).innerText();
  // 整页必须自带这四样，否则双击打开会是乱码或一坨没排版的文字
  expect(doc).toContain('<html lang="en">');
  expect(doc).toContain('<meta charset="utf-8">');
  expect(doc).toContain('name="viewport"');
  expect(doc).toContain("<style>");
  // <title> 从第一个 h1 猜出来，而不是写死 "Document"
  expect(doc).toContain("<title>Hello</title>");
  expect(doc).toContain("<h1>Hello</h1>");
});

test("the full-page html carries the site language, not a hardcoded en", async ({
  page,
}) => {
  // 日语用户导出的整页文件，<html lang> 该是 ja
  await page.goto("/ja/markdown-to-html/");
  await page.locator("textarea").fill("# こんにちは");
  await page.getByRole("button", { name: /変換する/ }).click();
  await expect(source(page)).toBeVisible({ timeout: 15000 });

  await page.getByRole("button", { name: /^ページ全体$/ }).click();
  await expect.poll(() => source(page).innerText()).toContain('<html lang="ja">');
});

test("indentation is on by default and can be switched off", async ({ page }) => {
  await page.goto("/markdown-to-html/");
  await page.locator("textarea").fill("# Title\n\n- one\n- two");
  await page.getByRole("button", { name: /^convert$/i }).click();
  const pretty = await waitForResult(page);

  // 默认缩进：块级元素之间断行，<li> 比 <ul> 深一格
  expect(pretty).toMatch(/<ul>\n {2}<li>one<\/li>/);

  // 紧凑模式只是不再加缩进。markdown-it 本身在块级标签之间会断行，那些换行
  // 属于产物、不是排版，所以这里验的是「没有缩进」而不是「没有换行」
  await page.getByRole("button", { name: /^compact$/i }).click();
  await expect
    .poll(() => source(page).innerText(), { timeout: 15000 })
    .not.toMatch(/\n +</);
  expect(await source(page).innerText()).toContain("<li>one</li>");
});

test("raw html inside markdown is sanitised, not passed through", async ({ page }) => {
  // markdown 里可以直接写 HTML block —— CommonMark 允许，markdown-it 会原样
  // 透出去。所以渲染之后必须净化（方案 §12 的顺序）
  const { errors } = watchNetwork(page);
  await page.goto("/markdown-to-html/");

  await page.locator("textarea").fill(
    [
      "# Mixed",
      "",
      '<div class="note">a kept div</div>',
      "",
      "<script>alert(1)</script>",
      "",
      '<img src=x onerror="alert(2)">',
      "",
      "[click](javascript:alert(3))",
      "",
      '<iframe src="https://evil.example"></iframe>',
      "",
      "body marker",
    ].join("\n"),
  );
  await page.getByRole("button", { name: /^convert$/i }).click();
  const html = await waitForResult(page);

  // 好内容留着 —— 净化不该把无害的 HTML 一起吃掉
  expect(html).toContain("<h1>Mixed</h1>");
  expect(html).toContain('class="note"');
  expect(html).toContain("a kept div");
  expect(html).toContain("body marker");

  // 危险的一个都不许留
  expect(html).not.toContain("<script");
  expect(html).not.toContain("alert(1)");
  expect(html).not.toContain("onerror");
  expect(html).not.toContain("<iframe");
  expect(html).not.toContain("evil.example");
  // 一个能点的危险地址都不许有。注意 markdown 里的 [x](javascript:…)
  // markdown-it 本来就拒绝生成链接，原样留成可见文字是对的 —— 所以这里按
  // 属性值查，而不是对整段 HTML 做子串匹配
  expectNoDangerousUrls(html);
  expect(html).not.toMatch(/<a[^>]+href/);

  // 用户有权知道文件里有东西被删了
  await expect(page.locator("details", { hasText: /removed unsafe/i })).toBeVisible();

  expect(errors).toEqual([]);
});

/* ── 预览：方案 §13 的落点 ─────────────────────────────── */

test("the preview is a sandboxed iframe fed by srcdoc", async ({ page }) => {
  // 方案 §13 明确要求：HTML 预览放进受限制的 sandbox iframe，
  // 且未清理的 HTML 不能插入主页面 DOM。
  await page.goto("/markdown-to-html/");
  await page.locator("textarea").fill(
    "# Preview Heading\n\n| A |\n| --- |\n| 1 |\n\n[fine](https://example.com/ok)",
  );
  await page.getByRole("button", { name: /^convert$/i }).click();
  await expect(source(page)).toBeVisible({ timeout: 15000 });
  await openPreview(page);

  const frame = previewFrame(page);
  // sandbox 写成空串是最严的一档：脚本不跑、表单不提交、顶层不能被导航，
  // 而且是一个独立的 opaque origin
  await expect(frame).toHaveAttribute("sandbox", "");
  // srcdoc 而不是 src：不走网络，也不需要一个能被指向别处的地址
  const srcdoc = await frame.getAttribute("srcdoc");
  expect(srcdoc, "预览没有用 srcdoc").toBeTruthy();
  expect(await frame.getAttribute("src")).toBeNull();
  // 片段模式下预览仍然是整页 —— iframe 里没有外层页面的样式
  expect(srcdoc).toContain("<!DOCTYPE html>");
  expect(srcdoc).toContain("Preview Heading");
  await expect(frame).toHaveAttribute("referrerpolicy", "no-referrer");

  // 主页面 DOM 里不该出现文档内容变成的真元素。源码视图是 <pre> 里的文字，
  // 预览在 iframe 里 —— 两处都不是主文档的 <table>/<a>
  expect(await page.locator("main table").count(), "文档内容进了主页面 DOM").toBe(0);
  expect(await page.locator('main a[href^="https://example.com"]').count()).toBe(0);

  // 框里要真的渲染出来，不是一个空壳
  const inside = page.frameLocator("iframe");
  await expect(inside.locator("h1")).toHaveText("Preview Heading");
  await expect(inside.locator("table")).toBeVisible();
});

test("nothing from a hostile document ever executes", async ({ page }) => {
  // 产物那边的净化另有测试，这个盯的是运行时：哪怕净化漏了，
  // sandbox="" 也得让它跑不起来
  const fired: string[] = [];
  page.on("dialog", async (d) => {
    fired.push(`dialog:${d.message()}`);
    await d.dismiss();
  });
  await page.exposeFunction("__pwned", (how: string) => fired.push(how));
  await page.addInitScript(() => {
    window.alert = () => {
      (window as unknown as { __pwned: (s: string) => void }).__pwned("alert");
    };
  });

  await page.goto("/markdown-to-html/");
  await page.locator("textarea").fill(
    [
      "# Hostile",
      "",
      "<script>window.parent.__pwned && window.parent.__pwned('script')</script>",
      '<img src=x onerror="alert(1)">',
      '<svg onload="alert(2)"></svg>',
      '<body onload="alert(3)">',
      "",
      "body marker",
    ].join("\n"),
  );
  await page.getByRole("button", { name: /^convert$/i }).click();
  await expect(source(page)).toBeVisible({ timeout: 15000 });
  await openPreview(page);

  // 给框里的东西一点时间试着跑
  await page.waitForTimeout(600);

  const inside = page.frameLocator("iframe");
  await expect(inside.locator("body")).toContainText("body marker");
  // 框里也不该有能点的危险东西
  expect(await inside.locator("script").count()).toBe(0);
  expect(await inside.locator("[onclick], [onerror], [onload]").count()).toBe(0);

  expect(fired, "有东西执行了").toEqual([]);
  expect(new URL(page.url()).pathname).toBe("/markdown-to-html/");
});

/* ── DOCX → HTML（方案 §6.2）────────────────────────────── */

test("docx becomes semantic html with no word junk", async ({ page }) => {
  const { external, errors } = watchNetwork(page);
  await page.goto("/docx-to-html/");
  await page.locator("input[type=file]").setInputFiles(`${FIXTURES}/rich.docx`);

  const html = await waitForResult(page);

  // 结构从 Word 的样式来，不是按字号猜的
  expect(html).toContain("<h1>Quarterly Report</h1>");
  expect(html).toContain("<h2>Numbers</h2>");
  expect(html).toContain("<strong>bold</strong>");
  expect(html).toContain("<em>italic</em>");
  expect(html).toContain("https://example.com");
  expect(html).toContain("<table>");
  expect(html).toContain("APAC");
  expect(html).toContain("<ul>");
  expect(html).toContain("<li>Ship the thing</li>");
  expect(html).toContain("<blockquote>");
  expect(html).toContain("A quote worth keeping.");
  expect(html).toContain("<pre>");
  expect(html).toContain('print("hello")');

  // 方案 §6.2：不生成 Office 专属标签，清掉 Word 的冗余 class 和样式
  expect(html).not.toContain("mso-");
  expect(html).not.toContain("MsoNormal");
  expect(html).not.toContain("ListParagraph");
  expect(html).not.toContain("<o:p");
  expect(html).not.toContain("style=");
  expect(html).not.toContain("<font");

  // 下载名是 .html，不是 .md —— 这站的产物是 HTML
  const [download] = await Promise.all([
    page.waitForEvent("download"),
    page.getByRole("button", { name: /download \.html/i }).click(),
  ]);
  expect(download.suggestedFilename()).toBe("rich.html");

  expect(external).toEqual([]);
  expect(errors).toEqual([]);
});

test("docx images inline as base64 or come out as a zip", async ({ page }) => {
  // 方案 §6.2 的「下载 HTML 与图片 ZIP」
  const { external, errors } = watchNetwork(page);
  await page.goto("/docx-to-html/");
  await page.locator("input[type=file]").setInputFiles(`${FIXTURES}/image.docx`);

  const inline = await waitForResult(page);
  expect(inline).toContain("<h1>Report With A Picture</h1>");
  // 默认内嵌：一个自足的文件，代价是体积
  expect(inline).toContain('src="data:image/png;base64,');
  expect(inline).toContain('alt="a red dot"');
  // 内嵌模式下没有外部文件，打包按钮就没有意义
  await expect(page.getByRole("button", { name: /html \+ images/i })).toHaveCount(0);

  // 换成抽成文件：<img> 指相对路径，图片另出一个 ZIP
  await page.getByRole("button", { name: /^separate files$/i }).click();
  await expect
    .poll(() => source(page).innerText(), { timeout: 15000 })
    .toContain('src="images/image-01.png"');
  const extracted = await source(page).innerText();
  expect(extracted).not.toContain("base64,");
  expect(extracted).toContain('loading="lazy"');

  const zipBtn = page.getByRole("button", { name: /html \+ images/i });
  await expect(zipBtn).toBeVisible();
  const [download] = await Promise.all([page.waitForEvent("download"), zipBtn.click()]);
  expect(download.suggestedFilename()).toBe("image.zip");

  // 丢掉图片这条也要能用
  await page.getByRole("button", { name: /^drop them$/i }).click();
  await expect
    .poll(() => source(page).innerText(), { timeout: 15000 })
    .not.toContain("base64,");
  expect(await source(page).innerText()).toContain("Body text after the image.");

  expect(external).toEqual([]);
  expect(errors).toEqual([]);
});

test("a hostile .docx can't smuggle a clickable script into the html", async ({
  page,
}) => {
  const { external, errors } = watchNetwork(page);
  await page.goto("/docx-to-html/");
  await page.locator("input[type=file]").setInputFiles(`${FIXTURES}/hostile.docx`);

  const html = await waitForResult(page);

  // 正文照常转出来 —— 净化不该把好内容一起吃掉
  expect(html).toContain("Hostile Document");
  expect(html).toContain("hostile body marker");
  expect(html).toContain("https://example.com/safe");

  // mammoth 会把 w:hyperlink 的 Target 原样写进 href，它的文档明说输出不做
  // 安全清理。用户把这段贴到自己的站上就是一个能点的 XSS，危害转移给了下游
  expectNoDangerousUrls(html);
  expect(html).not.toContain("<script");

  // 链接文字要留着，只是不再可点
  expect(html).toContain("click me");
  expect(html).toContain("mixed case");

  await expect(page.locator("details", { hasText: /removed unsafe/i })).toBeVisible();

  expect(external).toEqual([]);
  expect(errors).toEqual([]);
});

test("a zip bomb is refused before it's unpacked", async ({ page }) => {
  await page.goto("/docx-to-html/");
  await page.locator("input[type=file]").setInputFiles(`${FIXTURES}/bomb.docx`);

  // .docx 本身就是 zip，几 KB 能声明展开成 3GB。文件大小限制挡不住这个，
  // 所以要在解压前看中央目录里声明的尺寸
  await expect(page.getByText(/zip bomb|expands to far more/i)).toBeVisible({
    timeout: 15000,
  });
  await expect(page.locator("pre")).toHaveCount(0);
});

test("legacy .doc converts too, and says it's the old format", async ({ page }) => {
  const { external, errors } = watchNetwork(page);
  await page.goto("/zh-cn/docx-to-html/");
  await page.locator("input[type=file]").setInputFiles(`${FIXTURES}/sample.doc`);

  const html = await waitForResult(page, 20000);
  expect(html).toContain("Quarterly Report");
  expect(html).toContain("APAC");
  expect(html).toContain("<table>");

  // 老格式取不到图片和精确编号，警告框的标题该换成「这是老格式」，
  // 而不是罗列条数
  await expect(page.locator("details", { hasText: /老式 \.doc/ })).toBeVisible();

  expect(external).toEqual([]);
  expect(errors).toEqual([]);
});

test("an xlsx dropped on the docx page is named, not just refused", async ({ page }) => {
  // .docx 和 .xlsx 的文件头一模一样。认不出来会让 mammoth 报一句看不懂的错，
  // 而用户下一步该做什么就不明确了
  await page.goto("/docx-to-html/");
  await page.locator("input[type=file]").setInputFiles(`${FIXTURES}/sample.xlsx`);
  await expect(page.getByText(/excel/i).first()).toBeVisible({ timeout: 15000 });
  await expect(page.locator("pre")).toHaveCount(0);
});

/*
 * 系统选择器必须放行全站能处理的所有格式，不只本页的。
 *
 * 这个坑踩了两次：先是 Markdown 页选不了 Word，再是 CSV 页选不了 Excel。
 * 根因是把 `input.accept`（这一页转什么）当成了选择器的过滤器（这个站能拿
 * 这个文件做什么）—— 灰掉的文件进不了 pick()，那套「这一页不收，去那一页」
 * 的路由一句都不会触发，用户看到的只是文件点不动。
 *
 * 下面那条测的是「打开选择器之前的指路文案」，不够 —— 人是先点按钮再读字的。
 * 这条测的是选择器本身别撒谎，两条一起才覆盖完整。
 */
test("the picker offers every format the site can handle, not just this page's", async ({
  page,
}) => {
  await page.goto("/csv-to-html-table/");
  const accept = (await page.locator("input[type=file]").getAttribute("accept")) ?? "";
  const offered = accept.split(",").map((s) => s.trim());

  // 别处收的格式也要能选中 —— 选完由 pick() 解释该去哪一页
  for (const ext of [".xlsx", ".docx", ".md", ".html"]) {
    expect(offered, `选择器该放行 ${ext}`).toContain(ext);
  }

  // 但「本页收什么」那行字不能跟着放宽：它说的是这一页的真实边界
  await expect(page.locator("#convert").getByText(/^\.csv \.tsv \.txt \//)).toBeVisible();

  // 选中一个本页不收的，要有解释和链接，而不是静默或硬解出垃圾
  await page.locator("input[type=file]").setInputFiles(`${FIXTURES}/sample.xlsx`);
  await expect(page.getByText(/doesn't take \.xlsx/i)).toBeVisible({ timeout: 15000 });
  await expect(
    page.locator("#convert").locator("a[href*='excel-to-html-table']").first(),
  ).toBeVisible();
  await expect(page.locator("pre")).toHaveCount(0);
});

/*
 * 一个扩展名可能有好几个都对的去处，报错要把它们全列出来。
 *
 * `.txt` 是这个站唯一的真歧义：三页收，而且是三个不同的引擎（Markdown /
 * 纯文本 / CSV）。里面装的是哪一种，光看扩展名分不出来 —— 所以只指一个页
 * 有三分之二的概率是错的。原来就是只指第一个：拿着逗号分隔的 .txt 被指到
 * Markdown 页，转出来是一坨没有表格的段落，而 CSV 页就在旁边。
 *
 * 顺带盯住「不止一个去处时换一句文案」：「This one does:」后面跟三个链接
 * 读起来是错的（this one 指哪个？），而且它没告诉用户为什么有三个。
 *
 * 反面用例在下一条：同一个引擎的几个入口不能列成几条，那是三个同义词。
 */
test("a .txt lists every page that could take it, not just the first", async ({
  page,
}) => {
  await page.goto("/excel-to-html-table/");
  await page.locator("input[type=file]").setInputFiles({
    name: "notes.txt",
    mimeType: "text/plain",
    buffer: Buffer.from("Part,Qty\nbolt,12\n"),
  });

  /* 必须锁到那张失败的任务卡上，不能用整个 #convert —— 拖放区上方那行
     前置指路文案里也有这三个链接，用 #convert 的话报错里一个链接都没有
     这条也会绿。 */
  const card = page.locator("#convert li").filter({ hasText: "notes.txt" });
  // 换过的那句文案：说清「哪个都可能，你自己认」，而不是「那一页收」
  await expect(card.getByText(/could be any of these/i)).toBeVisible({
    timeout: 15000,
  });

  // 三个引擎三条链接，一个都不能少 —— 少哪个，拿着那种 .txt 的人就没路
  for (const slug of ["markdown-to-html", "text-to-html", "csv-to-html-table"]) {
    await expect(
      card.locator(`a[href$='/${slug}/']`),
      `报错里该有去 ${slug} 的链接`,
    ).toHaveCount(1);
  }

  await expect(page.locator("pre")).toHaveCount(0);
});

/*
 * 同引擎的别名页不能列成几条。
 *
 * `.html` 这个站只有 Google Docs 页收（引擎 richhtml），所以指路只该有一条。
 * 判据是引擎不是页数 —— 要是哪天再开一个走 richhtml 的页，这条会红，
 * 而它应该红：两页转出来的东西一字不差，列两个链接是拿同义词烦用户。
 */
test("pages sharing one engine collapse to a single link", async ({ page }) => {
  await page.goto("/csv-to-html-table/");
  await page.locator("input[type=file]").setInputFiles({
    name: "page.html",
    mimeType: "text/html",
    buffer: Buffer.from("<p>hi</p>"),
  });

  // 同上，锁到失败的那张卡 —— #convert 里还有前置指路那行的同名链接
  const card = page.locator("#convert li").filter({ hasText: "page.html" });
  await expect(card.getByText(/doesn't take \.html/i)).toBeVisible({
    timeout: 15000,
  });
  // 一条，而且是那句确定的文案 —— 只有一个去处时不该说「哪个都可能」
  await expect(card.getByText(/could be any of these/i)).toHaveCount(0);
  await expect(card.locator("a[href$='/google-docs-to-html/']")).toHaveCount(1);
});

/*
 * `accept` 把不收的格式在系统选择器里变灰 —— 灰掉的文件永远进不了 pick()，
 * 所以「这一页不收 .docx，去 DOCX → HTML」那套报错对走按钮的用户一句都不会
 * 触发。实际发生过：有人在 Markdown 页打开选择器，Word 文档是灰的，没有任何
 * 解释，结论是「这站坏了」。拖进来的人反而有指路，两条入口的待遇正好反了。
 *
 * 所以指路必须在打开选择器之前就摆在页面上。这条盯的是那个前置说明，
 * 不是报错 —— 底下那条 wrong-type 的用例测的是另一条入口。
 */
test("the dropzone names the formats it doesn't take, before the picker opens", async ({
  page,
}) => {
  await page.goto("/markdown-to-html/");
  const zone = page.locator("#convert");

  // 被问过两次的两个格式：Word 去站内的页，PDF 全站都不收、只有兄弟站收
  await expect(zone.getByText(".docx", { exact: false }).first()).toBeVisible();
  await expect(zone.getByRole("link", { name: /docx/i }).first()).toHaveAttribute(
    "href",
    /\/docx-to-html\/$/,
  );
  await expect(zone.getByText(".pdf", { exact: false }).first()).toBeVisible();
  await expect(zone.getByRole("link", { name: /docstomd/i }).first()).toHaveAttribute(
    "href",
    /docstomd\.com/,
  );

  // 不能把本页自己收的格式也说成「去别处」：Markdown 页收 .txt，
  // 不该把用户推去纯文本页转一个这里就能转的文件。
  //
  // 查的是 .txt 这个扩展名有没有出现在指路行里，不是「有没有链到纯文本页」——
  // 纯文本页确实该出现，因为它收 .text 而本页不收。断言写成「没有 Text → HTML
  // 这个链接」会把一条正确的指路判成错。
  const lead = zone.getByText(/Other formats:/);
  await expect(lead).not.toContainText(/\.txt(\s|$)/);
});

test("pasting a file from the clipboard converts it", async ({ page }) => {
  await page.goto("/docx-to-html/");
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
        if (await source(page).isVisible()) return true;
        await paste();
        return false;
      },
      { timeout: 20000, intervals: [200, 300, 500, 500, 1000] },
    )
    .toBe(true);
  expect(await source(page).innerText()).toContain("<h1>Quarterly Report</h1>");
  await expect(page.getByText("pasted.docx")).toBeVisible();
});

test("batch of two files offers a zip", async ({ page }) => {
  const { external, errors } = watchNetwork(page);
  await page.goto("/docx-to-html/");
  await page
    .locator("input[type=file]")
    .setInputFiles([`${FIXTURES}/rich.docx`, `${FIXTURES}/image.docx`]);
  await expect(source(page)).toBeVisible({ timeout: 25000 });

  const zipBtn = page.getByRole("button", { name: /^zip 2 files$/i });
  await expect(zipBtn).toBeVisible();
  const [download] = await Promise.all([page.waitForEvent("download"), zipBtn.click()]);
  expect(download.suggestedFilename()).toBe("html.zip");

  expect(external).toEqual([]);
  expect(errors).toEqual([]);
});

test("copy puts the html on the clipboard", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/docx-to-html/");
  await page.locator("input[type=file]").setInputFiles(`${FIXTURES}/rich.docx`);
  await expect(source(page)).toBeVisible({ timeout: 15000 });

  await page.getByRole("button", { name: /^copy$/i }).click();
  const clip = await page.evaluate(() => navigator.clipboard.readText());
  expect(clip).toContain("<h1>Quarterly Report</h1>");
  expect(clip).toContain("<table>");
  await expect(page.getByText(/copied/i)).toBeVisible();
});

/* ── Google Docs → HTML（方案 §6.3）───────────────────── */

/**
 * 一段贴近真实的 Google Docs 复制产物。
 *
 * 每一处垃圾都是真的会出现的：c1/c17 类名指向一份没跟过来的样式表，
 * <b style="font-weight:normal"> 是 Docs 包在全文外面的文档级外壳，
 * 外链被改写成 google.com/url?q=，还带 utm_。
 */
const GOOGLE_PASTE = [
  '<meta charset="utf-8">',
  '<b style="font-weight:normal" id="docs-internal-guid-9f3a1c2b-7fff-0000">',
  '<h1 class="c5" style="mso-line-height-rule:exactly"><span class="c1">Doc Heading</span></h1>',
  '<p class="c3"><span class="c1">A paragraph with a </span>',
  '<a class="c17" href="https://www.google.com/url?q=https://example.com/real%3Futm_source%3Ddocs&amp;sa=D&amp;usg=AOvVaw">real link</a>',
  '<span class="c1"> in it.</span></p>',
  '<ul class="c8 lst-kix_abc-0"><li class="c3"><span class="c1">one</span></li>',
  '<li class="c3"><span class="c1">two</span></li></ul>',
  '<table class="c11"><tr><td class="c2"><p class="c3"><span class="c1">cell</span></p></td></tr></table>',
  "</b>",
].join("");

test("google docs paste loses the junk and keeps the document", async ({ page }) => {
  const { errors } = watchNetwork(page);
  await page.goto("/google-docs-to-html/");

  await page.locator("textarea").fill(GOOGLE_PASTE);
  await page.getByRole("button", { name: /^convert$/i }).click();
  const html = await waitForResult(page);

  // 结构留住
  expect(html).toContain("Doc Heading");
  expect(html).toContain("<h1");
  expect(html).toContain("<ul>");
  expect(html).toContain("one");
  expect(html).toContain("<table>");
  expect(html).toContain("cell");
  expect(html).toContain("real link");

  // 死 class 清掉 —— 它们指向的样式表没有跟着复制过来
  expect(html).not.toMatch(/class="[^"]*\bc\d+\b/);
  expect(html).not.toContain("docs-internal-guid");
  expect(html).not.toContain("mso-");
  expect(html).not.toContain("style=");

  // 「把全文加粗」那层外壳拆掉：<b> 是行内标签，合法 HTML 里它不会包着 <h1>
  expect(html).not.toContain("<b");
  expect(html).not.toContain("font-weight");

  // 跟踪参数和 Google 的重定向包装都清掉（方案 §6.3）
  expect(html).toContain('href="https://example.com/real"');
  expect(html).not.toContain("google.com/url");
  expect(html).not.toContain("utm_source");

  // 顺手清掉了什么要说出来，别静悄悄改用户的内容
  const tidied = page.locator("details", { hasText: /cleaned out/i });
  await expect(tidied).toBeVisible();
  await tidied.locator("summary").click();

  // 这一条单独盯着，因为它最容易被挤掉：改写 href 是真的动了用户的内容
  // （链接指向变了），而同一份粘贴会带来十几个死 class。报告一截断，
  // 唯一重要的那条就没了 —— 曾经就是这么丢的。
  const report = (await tidied.innerText()).toLowerCase();
  expect(report, "重写了链接却没说").toContain("google.com/url");

  // 截断了必须说还剩多少条。少说和「一共就这些」读起来一样，那是在骗人。
  if (/\(\+\d+ more\)/.test(report)) {
    // 有截断的话，被留下的必须是链接那条 —— 死 class 不能把它挤到线外
    const cleaned = report.slice(report.indexOf("cleaned out"));
    expect(cleaned.indexOf("google.com/url")).toBeLessThan(
      cleaned.indexOf("(+"),
    );
  }

  expect(errors).toEqual([]);
});

test("clipboard rich text takes the same path as a paste into the box", async ({
  page,
}) => {
  // 方案 §6.3：靠复制粘贴，不用 Google API、不需要登录。
  // 剪贴板里的 HTML 来自任意网页，和上传的文件一样不可信
  const { errors } = watchNetwork(page);
  await page.goto("/google-docs-to-html/");

  const paste = () =>
    page.evaluate((html) => {
      const dt = new DataTransfer();
      dt.setData("text/html", html);
      window.dispatchEvent(
        new ClipboardEvent("paste", { clipboardData: dt, bubbles: true }),
      );
    }, GOOGLE_PASTE);

  await expect
    .poll(
      async () => {
        if (await source(page).isVisible()) return true;
        await paste();
        return false;
      },
      { timeout: 20000, intervals: [200, 300, 500, 500, 1000] },
    )
    .toBe(true);

  const html = await source(page).innerText();
  expect(html).toContain("Doc Heading");
  expect(html).not.toMatch(/class="[^"]*\bc\d+\b/);
  expect(html).not.toContain("google.com/url");
  expect(errors).toEqual([]);
});

test("hostile clipboard html is sanitised before anything else happens", async ({
  page,
}) => {
  const { errors } = watchNetwork(page);
  await page.goto("/google-docs-to-html/");

  await page.locator("textarea").fill(
    '<h1>Pasted Page</h1><p><b>bold</b> ' +
      '<a href="javascript:alert(1)">evil</a> ' +
      '<a href="https://example.com/ok">fine</a></p>' +
      '<p onmouseover="alert(2)">hover</p><script>alert(3)<\/script>' +
      '<iframe src="https://evil.example"></iframe>' +
      '<object data="x.swf"></object><embed src="y">' +
      '<a href="https://www.google.com/url?q=javascript:alert(4)">wrapped evil</a>' +
      "<table><tr><th>A</th></tr><tr><td>1</td></tr></table>",
  );
  await page.getByRole("button", { name: /^convert$/i }).click();
  const html = await waitForResult(page);

  expect(html).toContain("<h1>Pasted Page</h1>");
  expect(html).toContain("<table>");
  expect(html).toContain('href="https://example.com/ok"');
  // 内容留着，能点的部分不留
  expect(html).toContain("hover");
  expect(html).toContain("evil");

  expectNoDangerousUrls(html);
  expect(html).not.toContain("onmouseover");
  expect(html).not.toContain("alert(3)");
  expect(html).not.toContain("<iframe");
  expect(html).not.toContain("<object");
  expect(html).not.toContain("<embed");
  expect(html).not.toContain("evil.example");
  // 拆包装那一步会往 href 写新值，所以拆出来的地址必须重新过一遍协议白名单。
  // 拆不出安全地址时保留原样的 google.com/url 是可以接受的 —— 它是个
  // https 地址，点开只会走到 Google 的重定向页，不会执行任何东西。
  // 要紧的是那个 javascript: 没有变成 href 本身
  expect(html).not.toMatch(/href="\s*javascript:/i);

  expect(errors).toEqual([]);
});

/* ── 纯文本 → HTML（方案 §6.4）─────────────────────────── */

test("text becomes paragraphs, with the knobs actually doing something", async ({
  page,
}) => {
  const { errors } = watchNetwork(page);
  await page.goto("/text-to-html/");

  await page.locator("textarea").fill(
    [
      "First paragraph, line one",
      "still the first paragraph",
      "",
      "",
      "Second paragraph with https://example.com/a and www.example.org in it.",
      "",
      "Mail me at ada@example.com.",
      "",
      "A literal <b>tag</b> & an ampersand.",
    ].join("\n"),
  );
  await page.getByRole("button", { name: /^convert$/i }).click();
  const html = await waitForResult(page);

  // 空行分段，连续空行算一次
  expect((html.match(/<p>/g) ?? []).length).toBe(4);
  // 段内换行默认变 <br>
  expect(html).toContain("<br>");
  expect(html).toContain("still the first paragraph");

  // 裸 URL 变链接，www. 补上协议，邮箱变 mailto
  expect(html).toContain('<a href="https://example.com/a"');
  expect(html).toContain('<a href="https://www.example.org"');
  expect(html).toContain('<a href="mailto:ada@example.com"');
  // 产物会贴到别人的站上，站外链接带 noopener 是基本卫生
  expect(html).toContain('rel="noopener nofollow"');
  // 句末的句号属于句子，不属于 URL —— 链接要在 /a 处收住
  expect(html).toContain('<a href="https://example.com/a"');
  expect(html).not.toContain("example.com/a.");
  expect(html).toContain("in it.");
  // mailto 同理：句号不能吃进地址里
  expect(html).toContain('"mailto:ada@example.com"');
  expect(html).not.toContain("ada@example.com.<");

  // 这条链上不过 DOMPurify —— 输入是纯文本，转义就一个字符都不能漏
  expect(html).toContain("&lt;b&gt;tag&lt;/b&gt;");
  expect(html).toContain("&amp;");
  expect(html).not.toContain("<b>tag</b>");

  // 方案 §6.4：两个开关都要能关
  await page.getByRole("button", { name: /^leave as text$/i }).click();
  await expect
    .poll(() => source(page).innerText(), { timeout: 15000 })
    .not.toContain("<a href");
  expect(await source(page).innerText()).toContain("https://example.com/a");

  await page.getByRole("button", { name: /^let text flow$/i }).click();
  await expect
    .poll(() => source(page).innerText(), { timeout: 15000 })
    .not.toContain("<br>");
  expect(await source(page).innerText()).toContain(
    "line one still the first paragraph",
  );

  expect(errors).toEqual([]);
});

test("text with no blank lines says so instead of silently making one blob", async ({
  page,
}) => {
  await page.goto("/text-to-html/");
  await page
    .locator("textarea")
    .fill(Array.from({ length: 12 }, (_, i) => `line ${i + 1}`).join("\n"));
  await page.getByRole("button", { name: /^convert$/i }).click();
  await expect(source(page)).toBeVisible({ timeout: 15000 });

  // 一个巨大的段落几乎总是「原文用单换行分段」。提示一下比默默交出一坨强
  await expect(page.locator("details", { hasText: /blank lines/i })).toBeVisible();
});

/* ── CSV → 表格（方案 §6.5）────────────────────────────── */

test("csv detects the delimiter and builds a semantic table", async ({ page }) => {
  const { external, errors } = watchNetwork(page);
  await page.goto("/csv-to-html-table/");
  await page.locator("input[type=file]").setInputFiles(`${FIXTURES}/sample.csv`);

  const html = await waitForResult(page);

  // 第一行当表头，而且是 <th scope="col"> —— 屏幕阅读器靠 scope 把数据格
  // 和表头对应起来，视觉加粗它读不出来
  expect(html).toContain("<thead>");
  expect(html).toContain('<th scope="col">name</th>');
  expect(html).toContain('<th scope="col">note</th>');
  expect(html).toContain("<tbody>");
  expect(html).toContain("<td>Ada</td>");
  expect(html).toContain("<td>born 1815, London</td>");
  // 前导零不许被当成数字：dynamicTyping 关着就是为了这个
  expect(html).toContain("<td>007</td>");
  // 单元格里的真换行在 HTML 里会塌成空格，得显式换行 —— 那是内容
  expect(html).toContain("line one<br>line two");
  // 表头 1 行 + 数据 3 行。引号里的换行不算新行
  expect((html.match(/<tr>/g) ?? []).length).toBe(4);

  // 分号分隔要自己认出来，并且告诉用户认到了什么
  await expect(page.locator("details", { hasText: /delimiter/i })).toBeVisible();

  // 方案 §6.5 的「可选基础响应式样式」：窄屏上一张十列的表只能自己横向滚动
  expect(html).toContain('<div class="table-wrap">');
  await page.getByRole("button", { name: /^bare$/i }).click();
  await expect
    .poll(() => source(page).innerText(), { timeout: 15000 })
    .not.toContain("table-wrap");

  const [download] = await Promise.all([
    page.waitForEvent("download"),
    page.getByRole("button", { name: /download \.html/i }).click(),
  ]);
  expect(download.suggestedFilename()).toBe("sample.html");

  expect(external).toEqual([]);
  expect(errors).toEqual([]);
});

test("csv takes pasted text and the header knob re-runs in place", async ({ page }) => {
  await page.goto("/csv-to-html-table/");
  await page.locator("textarea").fill("a,b\n1,2\n3,4");
  await page.getByRole("button", { name: /^convert$/i }).click();
  const withHeader = await waitForResult(page);
  expect(withHeader).toContain('<th scope="col">a</th>');
  expect(withHeader).toContain("<td>1</td>");

  // 关掉表头：HTML 里没有「必须有表头行」这条限制，所以整张表就是 tbody，
  // 第一行也变成数据 —— 这和 markdown 那边给一行空表头的做法不同
  await page.getByRole("button", { name: /^none$/i }).click();
  await expect
    .poll(() => source(page).innerText(), { timeout: 15000 })
    .not.toContain("<thead>");
  const none = await source(page).innerText();
  expect(none).toContain("<td>a</td>");
  expect((none.match(/<tr>/g) ?? []).length).toBe(3);
});

test("a chosen delimiter overrides the guess", async ({ page }) => {
  await page.goto("/csv-to-html-table/");
  // 一行里同时有逗号和分号：猜错的话格数就不对，所以能验出开关真的生效
  await page.locator("textarea").fill("a;b\n1,2;3");
  await page.getByRole("button", { name: /^convert$/i }).click();
  await expect(source(page)).toBeVisible({ timeout: 15000 });

  await page.getByRole("button", { name: /^comma$/i }).click();
  await expect
    .poll(() => source(page).innerText(), { timeout: 15000 })
    .toContain('<th scope="col">a;b</th>');
  expect(await source(page).innerText()).toContain("<td>1</td>");
});

/* ── Excel → 表格（方案 §6.6）──────────────────────────── */

test("xlsx reads displayed values, not formula source", async ({ page }) => {
  const { external, errors } = watchNetwork(page);
  await page.goto("/excel-to-html-table/");
  await page.locator("input[type=file]").setInputFiles(`${FIXTURES}/sample.xlsx`);

  let html = await waitForResult(page, 20000);

  // 默认只转第一张表 —— 一个工作簿常有十几张，全转出来没人看得下去
  expect(html).toContain('<th scope="col">Region</th>');
  expect(html).toContain("<td>APAC</td>");
  expect(html).toContain("<td>17</td>");
  // 公式格读的是缓存的显示值，不是公式源码（方案 §5.5 / §6.6）
  expect(html).toContain("<td>42</td>");
  expect(html).not.toContain("SUM(");
  expect(html).not.toContain("pipe");
  // 单张表时表名进 <caption>：那是 HTML 给表格配标题的正规位置
  expect(html).toContain("<caption>Numbers</caption>");

  // 方案 §6.6 一期不还原颜色、字体、公式、合并单元格。这是有意的取舍，
  // 必须说出来 —— 用户看到自己配色的表变成黑白框线，第一反应是工具坏了
  const caveat = page.locator("details", { hasText: /worth knowing|值得|注意/i });
  await expect(caveat).toBeVisible();
  await caveat.locator("summary").click();
  await expect(caveat).toContainText(/colours, fonts, merged cells and formulas/i);

  // 第二张表加进来：多表时每张前面加 <h2> 当分隔
  await page.getByRole("button", { name: /^Notes/ }).click();
  await expect
    .poll(() => source(page).innerText(), { timeout: 20000 })
    .toContain("<h2>Notes</h2>");
  html = await source(page).innerText();
  expect(html).toContain("<h2>Numbers</h2>");
  // 多表时表名已经在 h2 上了，caption 再来一遍是重复
  expect(html).not.toContain("<caption>");
  // 管道在 HTML 里没有语法意义，不该被转义成 markdown 那样的 \|
  expect(html).toContain("pipe|inside");
  expect(html).not.toContain("pipe\\|inside");
  expect(html).toContain("line one<br>line two");

  expect(external).toEqual([]);
  expect(errors).toEqual([]);
});

test("the excel sheet picker keeps at least one sheet on", async ({ page }) => {
  await page.goto("/excel-to-html-table/");
  await page.locator("input[type=file]").setInputFiles(`${FIXTURES}/sample.xlsx`);
  await expect(source(page)).toBeVisible({ timeout: 20000 });

  // 全取消掉的话没有东西可渲染，所以最后一张要点不掉
  await page.getByRole("button", { name: /^Numbers/ }).click();
  await page.waitForTimeout(300);
  expect(await source(page).innerText()).toContain("Region");

  await page.getByRole("button", { name: /^select all$/i }).click();
  await expect
    .poll(() => source(page).innerText(), { timeout: 20000 })
    .toContain("<h2>Notes</h2>");
});

/* ── 路由与静态导出 ───────────────────────────────────── */

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
    "/docx-to-html/extra/",
    // 没做的语种就是没有这一页
    "/de/",
    "/ko/docx-to-html/",
    // 大小写不同的前缀不该另开一份，路径一律小写
    "/ZH-CN/",
    // 英文不带前缀，/en/ 不该存在，否则同一份内容两个地址
    "/en/",
    "/en/docx-to-html/",
    "/en/privacy/",
    // 姐妹站的 slug 不属于这个域名
    "/docx-to-markdown/",
    "/pdf-to-markdown/",
    // 方案 §6 的写法是 csv-to-html-table，别的拼法不该有
    "/csv-to-html/",
    "/excel-to-html/",
    // 正式页面也只有这五个 slug
    "/privacy-policy/",
    "/cookie/",
    // 不认识的 guide slug 必须真 404，不能回退到 /guides/ 列表页 ——
    // 回退等于每个拼写错误都变成一份重复内容的软 404
    "/guides/nope/",
    "/guides/markdown-to-html/",
    "/ja/guides/nope/",
    "/guides/markdown-tables-to-html/extra/",
  ]) {
    expect((await request.get(p)).status(), `status for ${p}`).toBe(404);
  }
});

test("a missing trailing slash redirects to the canonical form", async ({ request }) => {
  for (const [from, to] of [
    ["/markdown-to-html", "/markdown-to-html/"],
    ["/ja/excel-to-html-table", "/ja/excel-to-html-table/"],
  ]) {
    const res = await request.get(from, { maxRedirects: 0 });
    expect(res.status(), `status for ${from}`).toBe(308);
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
    expect(new URL(loc).host, `${loc} 域名不对`).toBe("docs2html.com");
    const p = new URL(loc).pathname;
    expect((await request.get(p)).status(), `sitemap 里的 ${p}`).toBe(200);
  }

  const robots = await (await request.get("/robots.txt")).text();
  expect(robots).toContain("sitemap.xml");
  expect(robots).toContain("docs2html.com");
  // 别把整站 Disallow 掉
  expect(robots).not.toMatch(/^Disallow: \/$/m);
});

/* ── 承诺与合规 ───────────────────────────────────────── */

test("the privacy page's promises match what the site actually does", async ({
  page,
  context,
}) => {
  // 写在隐私政策里的话是承诺，不是文案。转一份文件、切个语种，然后核对：
  // 一个 cookie 都不该有，storage 一片空白
  await page.goto("/privacy/", { waitUntil: "networkidle" });
  await page.goto("/docx-to-html/", { waitUntil: "networkidle" });
  await page.locator("input[type=file]").setInputFiles(`${FIXTURES}/rich.docx`);
  await expect(source(page)).toBeVisible({ timeout: 15000 });

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

/* ── 包体积：方案 §8 ──────────────────────────────────── */

/**
 * 按内容指纹找出解析库落在哪个 chunk 里。
 *
 * 不能写死文件名 —— chunk 名带内容哈希，每次改代码都变。所以在 out/ 里按
 * 一段该库独有的字符串反查，测试才不会一 build 就红。
 */
function chunkWith(marker: string): string {
  const dir = path.join(__dirname, "..", "out", "_next", "static", "chunks");
  const hits = readdirSync(dir).filter(
    (f) => f.endsWith(".js") && readFileSync(path.join(dir, f), "utf8").includes(marker),
  );
  expect(hits, `没有 chunk 含 "${marker}"，指纹该换了`).toHaveLength(1);
  return hits[0];
}

test("no page loads a parser it doesn't need", async ({ page }) => {
  // 方案 §8：首页不得加载全部解析库。mammoth / markdown-it / read-excel-file /
  // papaparse 加起来好几 MB，而一次访问只会用到其中一个。
  const PARSERS = {
    // mammoth 自己的报错文案
    mammoth: chunkWith("was referenced but not defined"),
    // read-excel-file 读 sst 的那个部件名
    excel: chunkWith("sharedStrings"),
    // papaparse 猜分隔符失败时说的话
    papaparse: chunkWith("auto-detect delimiting"),
  };

  const seen = new Set<string>();
  page.on("request", (r) => {
    if (r.resourceType() === "script") seen.add(path.basename(new URL(r.url()).pathname));
  });

  const loaded = () =>
    Object.entries(PARSERS)
      .filter(([, file]) => seen.has(file))
      .map(([name]) => name);

  // 首页是 Markdown → HTML，别的解析库一个都不该来
  await page.goto("/", { waitUntil: "networkidle" });
  expect(loaded(), "首页拉了不该拉的解析库").toEqual([]);

  await page.goto("/csv-to-html-table/", { waitUntil: "networkidle" });
  expect(loaded(), "CSV 页拉了不该拉的解析库").toEqual([]);

  // 空着的 DOCX 页也不该先把 mammoth 拉下来 —— 用户可能只是来看说明的
  await page.goto("/docx-to-html/", { waitUntil: "networkidle" });
  expect(loaded(), "DOCX 页空着就拉了 mammoth").toEqual([]);

  // 反过来：真丢了文件才该拉，而且只拉这一个
  await page.locator("input[type=file]").setInputFiles(`${FIXTURES}/rich.docx`);
  await expect(source(page)).toBeVisible({ timeout: 15000 });
  // 只该拉 mammoth 这一条链，Excel 和 CSV 的解析器不该跟着来。
  // JSZip 不在这张表里 —— 它是 mammoth 的依赖（.docx 就是个 zip），
  // 跟着 mammoth 一起进同一批 chunk 是对的，不是多加载
  expect(loaded(), "DOCX 转换时拉的库不对").toEqual(["mammoth"]);
});
