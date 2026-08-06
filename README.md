# document-tools

两个文档转换工具站的单体仓库。转换全部在浏览器里完成 —— 没有后端，文件不上传。

| 站点 | 域名 | 做什么 |
| --- | --- | --- |
| `apps/docstomd` | docstomd.com | 文档 → Markdown |
| `apps/docs2html` | docs2html.com | 文档 → HTML |

每站六个工具页 × 六种语言（English / 简体中文 / 繁體中文 / Español / Português / 日本語），加上各自的 About / Contact / Privacy / Terms / Cookies，构建出 154 个静态页面（docstomd 80，docs2html 74）。

## 目录结构

```
apps/docstomd      Next.js 应用，输出到 apps/docstomd/out
apps/docs2html     Next.js 应用，输出到 apps/docs2html/out
packages/converters  两站共用的转换内核（@document-tools/converters）
verify/            跨站验收脚本（单站测试在 apps/*/verify/）
```

`packages/converters` 不发布到 npm，靠 pnpm workspace 链接 + 两个应用的 `transpilePackages` 直接吃 TypeScript 源码。它按子路径导出，每个转换器一个入口，这样应用侧 `import` 谁就只打包谁 —— 首页不会因此拖进 pdf.js。

## 跑起来

需要 Node 22+ 和 pnpm 10（`packageManager` 已锁版本，用 corepack 即可）。

```bash
pnpm install
pnpm dev:md      # docstomd  → localhost:3000
pnpm dev:html    # docs2html → localhost:3001（错开端口，两站可以同时开着比对）
pnpm build       # 两站都构建，产物在 apps/*/out
pnpm lint
```

`build` 里除了 `next build` 还有生成步骤。两站都跑 `build-icons.mjs`，把用到的图标烘成本地数据 —— 运行时不向 iconify CDN 发请求，否则「文件不上传」这个承诺就漏了。docstomd 还跑 `copy-pdfjs.mjs`，把 pdf.js 的 worker、cmaps 和字体复制进 `public/` 以便同源加载（`public/pdfjs/` 因此不进版本库）；docs2html 没有 PDF 工具，不需要这一步。

## 验收

先 `pnpm build`，脚本测的是 `out/` 里那些真要上传的静态文件，不是 dev server。

```bash
pnpm test:md          # docstomd 单站，112 条
pnpm test:html        # docs2html 单站，115 条
pnpm verify:cross     # 两站正文不互抄 + 站内工具页各写各的
pnpm verify:i18n      # 六种语言没有漏翻
pnpm verify:browsers  # Chromium / Chrome / Firefox / WebKit / 移动端基本转换
pnpm verify:contrast  # 两站每页每个文字元素过一遍 WCAG AA
pnpm verify:color     # oklch → hex + 对比度速算，挑色值用
pnpm verify:perf      # Lighthouse，含 Core Web Vitals 预算
```

跨站的三个脚本需要两个静态服务同时起着：

```bash
node apps/docstomd/verify/serve.mjs &   # 3311
node apps/docs2html/verify/serve.mjs &  # 3312
```

`serve.mjs` 模拟线上托管的行为（大小写敏感、尾斜杠、404），因为本地「能打开」不代表线上能 —— macOS 的文件系统不区分大小写。它对齐的具体状态码见下面那节。

## 部署

两个站是两个独立的 Cloudflare Worker（Static Assets），配置各自在 `apps/*/wrangler.jsonc`。一个项目装不下两份 `out/`：两个域名、两份产物。

```bash
pnpm deploy:md      # 构建 docstomd 并发布
pnpm deploy:html    # 构建 docs2html 并发布
```

控制台连 Git 自动部署时，两个项目分别填：

| | docstomd | docs2html |
|---|---|---|
| 构建命令 | `pnpm --filter docstomd build` | `pnpm --filter docs2html build` |
| 部署命令 | `npx wrangler deploy --config apps/docstomd/wrangler.jsonc` | `npx wrangler deploy --config apps/docs2html/wrangler.jsonc` |

`wrangler.jsonc` 里那两条 `assets` 行为不是可选项，而且默认值跟这个站对不上、配错了不报错只会静默变坏：`html_handling: force-trailing-slash`（对齐 `trailingSlash: true`，否则同一页有两个都能打开的地址，白白分权重）、`not_found_handling: 404-page`（否则打错的地址变成状态码 200 的软 404）。理由写在那两个文件的注释里。

**尾斜杠跳转是 307，不是 308。**实测 workerd 和官方 html-handling 文档都是 307（临时重定向）。308 语义上更适合这种规范化跳转，但线上给的不是它，所以 `serve.mjs` 和两站的 spec 都跟着写 307 —— 否则本地验收测的是 `serve.mjs` 自己，不是线上行为。

关于 `verify:contrast`：改色板必跑。Lighthouse 的 color-contrast 审计只看首屏、只抽样，改一个色变量它未必报。这个脚本把 25 个页面里 header/main/footer 所有含文字的元素全走一遍（FAQ 折叠面板会先点开，Base UI 收起时是真的不渲染），按 WCAG AA 判：正文 4.5:1，大字 3:1。它上线时就抓到两处既存不达标 —— docstomd 的 `--ink-faint`（3.98）和 docs2html 的 `--graphite-faint`（3.87），Playwright 和 Lighthouse 都漏了。

它有个盲区：只走文字节点，图标是 SVG 走不到。docs2html 的 `--amber`（失败图标）当时在纸上只有 1.98:1，连图形的 3:1 门槛都不到，是 `verify:color` 手算才发现的。两个配着用：`verify:color` 纯算，改一个值立刻能看到它跟其他所有色的关系（包括还没写进 CSS 的候选值），不用 build；`verify:contrast` 跑真页面，验的是落地结果。带三个参数可以单独算一个候选值 —— `pnpm verify:color 0.44 .148 252`。

关于 `verify:perf`：它两种节流方式各跑一遍。Lighthouse 默认的 Lantern 模拟在 localhost 上测 LCP 会系统性虚高（把整包 JS 都算成 LCP 的前置依赖，八个页面一律 2.6s 且彼此相差不到 12ms），所以 Core Web Vitals 取 `--throttling-method=devtools` 那遍，分数取默认那遍以便和 PageSpeed Insights 对得上。细节写在 `verify/lighthouse.mjs` 的 `run()` 上面。

## 安全

不可信输入（DOCX、HTML、Markdown、PDF、剪贴板富文本）一律先过 DOMPurify 再进 DOM，而且清理之后不做任何会重新引入标签的处理。Mammoth 官方明确说它的输出不带安全清理，所以 DOCX 那条链是 `Mammoth → DOMPurify → Turndown`。HTML 预览放在受限的 sandbox iframe 里。这几条都有对应的测试（`nothing from a hostile .docx ever executes` 之类），不是只写在文档里。

## 依赖许可证

转换内核用到的第三方库及其许可证，商用时需保留声明：

| 库 | 许可证 |
| --- | --- |
| mammoth | BSD-2-Clause |
| turndown | MIT |
| markdown-it | MIT |
| dompurify | Apache-2.0 / MPL-2.0 |
| papaparse | MIT |
| read-excel-file | MIT |
| pdfjs-dist | Apache-2.0 |
| cfb | Apache-2.0 |

版本在 `pnpm-lock.yaml` 里锁定。
