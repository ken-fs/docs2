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
pnpm verify:perf      # Lighthouse，含 Core Web Vitals 预算
```

跨站的三个脚本需要两个静态服务同时起着：

```bash
node apps/docstomd/verify/serve.mjs &   # 3311
node apps/docs2html/verify/serve.mjs &  # 3312
```

`serve.mjs` 模拟 Cloudflare Pages 的行为（大小写敏感、尾斜杠、404），因为一期就托管在那儿，而 macOS 的文件系统不区分大小写，本地「能打开」不代表线上能。

关于 `verify:contrast`：改色板必跑。Lighthouse 的 color-contrast 审计只看首屏、只抽样，改一个色变量它未必报。这个脚本把 25 个页面里 header/main/footer 所有含文字的元素全走一遍（FAQ 折叠面板会先点开，Base UI 收起时是真的不渲染），按 WCAG AA 判：正文 4.5:1，大字 3:1。它上线时就抓到两处既存不达标 —— docstomd 的 `--ink-faint`（3.98）和 docs2html 的 `--graphite-faint`（3.87），Playwright 和 Lighthouse 都漏了。

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
