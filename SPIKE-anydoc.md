# Spike: firecrawl/anydoc 能不能进这个仓库

分支 `spike/anydoc-wasm`。目标:拿实测数字决定 anydoc 值不值得进主仓,别拍脑袋。

## 一句话结论

**不能当内核换,只可能当"新格式"的懒加载附件。** npm 主包不能在浏览器跑;
能跑的 wasm 包是 **2.82 MB gzip 的单块 blob**,无法按格式拆分,而且不覆盖
本站已有的 html→md。

## 查到的事实(2026-08-13,anydoc 0.1.8)

### 1. `@firecrawl/anydoc`(主包)= Node 原生插件,浏览器用不了
- `@napi-rs/cli` 构建的 NAPI 原生插件,`index.js` 是自动生成的 native loader。
- `optionalDependencies` 全是按平台的二进制:`darwin-arm64` / `linux-x64-gnu` /
  `win32-x64-msvc`……`napi.targets` 里**没有任何 wasm 目标**。
- 直接违反本项目"浏览器里转换、不上传"的命根子。**排除。**

### 2. `@firecrawl/anydoc-wasm` = 浏览器能用的那个,但很重
- `anydoc_wasm_bg.wasm` = **6.73 MB 未压缩 / 2.82 MB gzip**。
- **单块 blob 装全部格式,无法 tree-shake。** 想只要 PPTX,也得付整块 2.82 MB;
  想要 pptx+odt+rtf+epub 全套,还是这同一块 2.82 MB。→ 走这条路要**一次把所有
  新格式都挂上去摊薄成本**,单独为一个格式引它不划算。
- 胶水 JS 14 KB,`.d.ts` 8.6 KB。MIT。
- API 干净:`Format = doc|docx|odt|pdf|ppt|pptx|rtf|epub|xlsx|ods|odp|csv`,
  给结构化 `Document` 模型(blocks/inlines/notes/assets)也能直接出 markdown。
- **不含 html / txt / markdown 输入**——本站现有的 html→md 工具它不接。
- PDF 图片件返回 `unsupported`(wasm 无 OCR),这点反而合"不上传"。

## 对照本项目架构

- README 明写:converters 按子路径导出,`import 谁只打包谁,首页不拖进 pdf.js`。
  现有最重的单个依赖(pdfjs)也就 ~1MB 级,且每页只吃自己那点。
- anydoc-wasm 是**每个用到它的页面都要 2.82 MB gzip**,且一块管所有格式。
  用它换现有已调优 + 已过安全测试的 docx/csv/xlsx/pdf = 净亏。

## 建议路线(若要继续)

1. **不动** mammoth(docx)、pdfjs(pdf)、现有 html/csv/excel 链——它们已验证,
   敌意样本测试围着它们写。
2. anydoc-wasm 只作为**懒加载、隔离打包**的手段,服务现有 JS 栈做不了的**新格式**
   (pptx / odt / rtf / epub),且只在这些新工具页按需加载。
3. `.wasm` 必须像 pdf.js 那样 copy 进 `public/` 同源加载,不走 CDN,否则漏掉
   "不发外部请求"承诺。
4. 走就一次把 pptx+odt+rtf+epub 都挂上,摊薄那 2.82 MB。
5. 安全:它输出 markdown,预览渲染(markdown-it)前仍要过现有 DOMPurify 关口;
   敌意样本要对 anydoc 重跑。

## 原型结果(已做)

分支上加了 `packages/converters/src/office-to-markdown.ts`(子路径导出),覆盖
pptx/ppt/odt/ods/odp/rtf/epub,懒加载 wasm、同源 URL、错误码映射到站里已有的错误类。
`tsc --noEmit` 过。真实文件实测:

| 输入 | 格式识别 | 耗时 | 输出质量 |
|---|---|---|---|
| 真实中文 PPTX(Downloads,7.4K 字) | pptx | 94ms | 好:每页标题→`##`、要点→列表、演讲者备注加粗、图片→alt 占位 |
| 手搓 RTF | rtf | 0.5ms | 通:粗体 + 超链接保住;有序列表编号有小瑕疵(手搓 RTF 编码问题,非库缺陷) |

结论:**转换能力和输出质量都够用**,PPTX 尤其好。

## 体积账(最终)

- `.wasm` 6.73MB / **gzip 2.82MB**,同源懒加载,不进 JS bundle(模块传显式 URL,
  bundler 不会 inline 它)。
- JS 胶水 14KB + 本模块极小,这才是进 JS chunk 的部分。
- 一块管全部格式,所以 pptx/odt/rtf/epub 四个页面共享同一份 2.82MB —— 一次挂全摊薄。

## 已上线:PPTX → Markdown 工具页(走完整流程)

`pptx-to-markdown` 页已在本分支做完并通过全套验收。改动:

- **引擎**:`converters/src/office-to-markdown.ts`(pptx/ppt/odt/ods/odp/rtf/epub),
  懒加载,错误码映射到站内错误类。`converter.tsx` 加 `office` 引擎(**不摆旋钮**,
  anydoc 自己生成 markdown)。
- **.wasm 加载**:交给打包器。anydoc 胶水的 `new URL('…_bg.wasm', import.meta.url)`
  让 Turbopack 把 .wasm 发到同源的 `_next/static/media/`,带 hash、自动解析,不碰 CDN
  —— 比 pdf.js 那套 copy 进 public/ 更省(pdf.js 的 worker 是运行时按 URL 起的,
  打包器管不到才必须自托管;wasm 不是那种情况)。**没有 copy 脚本、没有 public/anydoc**。
- **页面**:`pptx-to-markdown` 加进 PAGE_KEYS / PageKey / TOOL_INPUT(收 .pptx .ppt .odp),
  六语言 PageCopy 全部人工撰写(非机翻,但 es/pt/ja/zh 建议上线前过一遍母语)。
- **验收清单**:五份手写清单都补了(`verify/i18n.mjs`、`contrast.mjs`、`cross-site.mjs`
  + `site.spec.ts` 的 SLUGS)。`i18n.mjs` 的 PROPER 名单加了 pptx/ppt/odp/powerpoint/
  anydoc/webassembly(格式名是专有名词,不该翻)。

**验收结果(全绿)**:
- `pnpm build` 通过,131 静态页(126 段 + 404/robots/sitemap)。
- Playwright 122/122(含新增 `pptx converts off same-origin wasm` —— 断言标题→`##`、
  正文、演讲者备注,且 `external === []` 证明 .wasm 同源加载不走 CDN)。
- `verify:i18n` 六语言无漏翻;`verify:cross` 正文无互抄;`verify:contrast` 40 页全过 WCAG AA。
- 新增固件 `verify/fixtures/deck.pptx`(3.5KB 手工生成的两页 deck,带演讲者备注)。

## 待决策 / 后续

- 技术路线已验证,PPTX 页可合并。若要 odt/rtf/epub 也上,引擎已支持,只需再各加一个
  工具页(同样五份清单 + 六语言文案),共享同一块已在加载的 wasm。
- es/pt/ja/zh 文案按 AGENTS.md 标准应过一遍母语审校再正式上线。
