# DocsToMD 与 Docs2HTML 一期产品需求与技术方案

> 文档状态：一期需求基线  
> 更新日期：2026-08-04  
> 目标：同时上线 `docstomd.com` 与 `docs2html.com`，通过全球 SEO 获取自然流量，后续接入 Google AdSense。

## 1. 已确认的核心决策

- 两个网站同时开发和上线。
- 不提供注册、登录、账户、云端历史记录或付费订阅。
- 文件转换优先在用户浏览器本地完成，不上传服务器。
- 一期不使用生成式 AI，也不调用 OpenAI、Claude 等付费模型 API。
- 一个 Git 仓库，使用 `pnpm workspace`。
- 仓库内包含两个独立 Next.js App，共享内部转换包。
- 内部转换包不发布到 npm。
- 一期使用 Next.js 静态导出，优先部署到 Cloudflare Pages。
- 支持英文、简体中文、繁体中文、西班牙语、葡萄牙语和日语。
- 两个网站共享基础交互组件，但拥有独立品牌、SEO 内容、主题和部署项目。

## 2. 产品定位

| 网站 | 核心定位 | 英文说明 |
| --- | --- | --- |
| `docstomd.com` | 文档转干净、结构化的 Markdown | Convert documents to clean Markdown online |
| `docs2html.com` | 文档转干净、可预览和发布的 HTML | Convert documents to clean HTML online |

### 2.1 DocsToMD

主要面向：

- 开发者
- Markdown 用户
- Obsidian、知识库和内容迁移用户
- 需要整理文档结构的普通用户

核心卖点：

- 免费使用
- 无需注册
- 文件不离开浏览器
- 输出干净、结构化的 Markdown

### 2.2 Docs2HTML

主要面向：

- 博客作者
- CMS 和网站内容运营人员
- 开发者
- 需要将 Word、Markdown、表格发布到网页的用户

核心卖点：

- 输出干净、语义化 HTML
- 支持网页实时预览
- 可以复制 HTML 或下载完整网页
- 清理 Word 和 Google Docs 的冗余格式

## 3. 一期不做的功能

- 用户注册和登录
- 用户账户和团队协作
- 文件云端存储
- 转换历史
- 付费订阅
- 服务端批量转换
- 公共转换 API
- Google Docs OAuth 或 Google Drive 授权
- 扫描 PDF 的 OCR
- 复杂 PDF 表格和公式的高精度识别
- DOC、PPT、PPTX 格式
- Word 页面像素级还原
- 暗黑模式
- 服务端 SSR、ISR、Server Actions 和 API Routes

## 4. 两个网站的共享能力

每个转换工具页面必须提供：

1. 文件拖拽上传。
2. 点击选择文件。
3. 适用场景下支持粘贴文本或富文本。
4. 显示支持的格式、文件大小和转换限制。
5. 转换按钮和转换进度。
6. 转换结果预览。
7. 一键复制结果。
8. 下载结果文件。
9. 清空并重新转换。
10. 示例输入或示例文件。
11. 清晰的错误提示。
12. “文件不会离开浏览器”的隐私提示。
13. 相关工具入口。
14. 对应反向转换网站入口。

分析系统只能记录：

- 页面访问
- 转换按钮点击
- 转换成功或失败
- 文件类型
- 文件大小区间

不得采集：

- 文件名
- 文件内容
- 转换结果
- 用户文档中的任何文本

## 5. DocsToMD 一期工具

### 5.1 DOCX to Markdown

英文 URL：`/docx-to-markdown/`

支持：

- H1～H6 标题
- 普通段落
- 粗体、斜体、删除线
- 有序列表和无序列表
- 超链接
- 引用
- 代码和代码块
- GFM Markdown 表格
- DOCX 图片提取
- 下载 `.md`
- 包含图片时下载 Markdown 与 `images` 目录组成的 ZIP

限制：

- 不支持旧版 `.doc`
- 不支持密码保护或加密文件
- 页眉、页脚、批注和修订记录不保证保留
- 复杂浮动布局按普通内容顺序输出

### 5.2 PDF to Markdown

英文 URL：`/pdf-to-markdown/`

一期只支持包含可选择文字的普通 PDF：

- 按页面顺序提取文字
- 尽力识别段落和标题
- 合并常见断行
- 可选页面分隔标记
- 下载 `.md`

必须明确提示：

- 不支持扫描版 PDF
- 不提供 OCR
- 多栏、复杂表格和公式属于尽力转换
- 加密 PDF 无法处理
- 检测不到文字时提示文件可能是扫描件

### 5.3 HTML to Markdown

英文 URL：`/html-to-markdown/`

支持：

- 粘贴 HTML
- 上传 `.html` 文件
- 标题、段落、列表、链接、表格和图片
- `pre`、`code` 和引用
- 删除脚本、事件属性和危险标签
- GFM 输出
- 复制或下载 `.md`

### 5.4 CSV to Markdown Table

英文 URL：`/csv-to-markdown/`

支持：

- 上传或粘贴 CSV
- 自动识别逗号、分号和 Tab 分隔符
- 表格预览
- 选择第一行是否为表头
- Markdown 表格对齐方式
- 复制或下载 `.md`

一期默认支持 UTF-8。

### 5.5 Excel to Markdown

英文 URL：`/excel-to-markdown/`

支持：

- `.xlsx` 文件
- 工作表列表和工作表选择
- 使用单元格显示值，而不是公式源码
- 空单元格处理
- 输出 GFM Markdown 表格
- 复制或下载 `.md`

建议限制：

- 最大文件 10MB
- 最多处理 100,000 个单元格

### 5.6 Google Docs to Markdown

英文 URL：`/google-docs-to-markdown/`

不接入 Google API。用户从 Google Docs 复制内容，再粘贴到网站：

1. 读取剪贴板中的富文本 HTML。
2. 清理 Google Docs 冗余格式。
3. 转换成 Markdown。

支持标题、列表、链接、表格和基础文本格式。

## 6. Docs2HTML 一期工具

### 6.1 Markdown to HTML

英文 URL：`/markdown-to-html/`

支持：

- CommonMark
- GFM 表格
- 删除线
- 任务列表
- 代码块
- 实时 HTML 预览
- 复制 HTML
- 下载 `.html`

输出模式：

- HTML Fragment
- Full HTML Document

### 6.2 DOCX to HTML

英文 URL：`/docx-to-html/`

支持：

- 标题、段落、粗体和斜体
- 列表、链接和表格
- 图片、引用和代码样式
- 清除 Word 冗余 class 和样式
- 输出语义化 HTML
- 下载 HTML 与图片 ZIP

不生成 Microsoft Office 专属标签。

### 6.3 Google Docs to HTML

英文 URL：`/google-docs-to-html/`

通过复制粘贴实现：

- 删除 Google Docs 冗余样式
- 保留文档结构
- 清除跟踪参数和无用属性
- 输出安全、干净的 HTML
- 不需要 Google 登录或 API

### 6.4 Text to HTML

英文 URL：`/text-to-html/`

支持：

- 纯文本转段落
- 空行划分段落
- URL 自动转换为链接，可关闭
- 换行转换为 `<br>`，可关闭
- HTML 特殊字符自动转义
- Fragment 和 Full Document 两种模式

### 6.5 CSV to HTML Table

英文 URL：`/csv-to-html-table/`

支持：

- CSV 上传或粘贴
- 自动识别分隔符
- 第一行作为表头
- 输出语义化 `<table>`
- 可选基础响应式样式
- 复制或下载 HTML

### 6.6 Excel to HTML Table

英文 URL：`/excel-to-html-table/`

支持：

- `.xlsx` 文件
- 工作表选择
- 表格预览
- 语义化 HTML 表格
- 基础响应式样式开关
- 下载完整 HTML 页面

一期不要求还原 Excel 颜色、字体、公式、合并单元格和复杂样式。

## 7. 多语言与 URL 规范

| 语言 | `lang`/hreflang | URL 前缀 |
| --- | --- | --- |
| 英文 | `en` | 无前缀 |
| 简体中文 | `zh-CN` | `/zh-cn/` |
| 繁体中文 | `zh-TW` | `/zh-tw/` |
| 西班牙语 | `es` | `/es/` |
| 葡萄牙语 | `pt` | `/pt/` |
| 日语 | `ja` | `/ja/` |

示例：

```text
https://docstomd.com/docx-to-markdown/
https://docstomd.com/zh-cn/docx-to-markdown/
https://docstomd.com/zh-tw/docx-to-markdown/
https://docstomd.com/es/docx-to-markdown/
https://docstomd.com/pt/docx-to-markdown/
https://docstomd.com/ja/docx-to-markdown/
```

一期所有语言使用相同英文 slug。标题、正文、按钮、错误提示和 FAQ 必须完整翻译。

语言切换器要求：

- 使用真实 `<a href>` 链接。
- 跳转到当前工具的对应语言版本。
- 不根据 IP 强制跳转。
- 不依赖 JavaScript 才能被搜索引擎发现。
- 可以提示用户切换语言，但不能覆盖用户当前选择。

## 8. SEO 硬性要求

### 8.1 渲染

- 所有公开页面必须在构建时静态生成。
- 搜索引擎直接请求 HTML 时能看到完整标题和正文。
- 转换器使用 Client Component。
- PDF、DOCX、XLSX 等大型解析库必须动态加载。
- 首页不得加载所有文件解析库。

### 8.2 页面元数据

每个语言和工具页面必须有独立的：

- `<title>`
- Meta description
- Canonical
- Open Graph title 和 description
- Open Graph locale
- 一个且仅一个 H1
- 正确的 `<html lang>`

禁止机械堆砌关键词。

### 8.3 Canonical

每个本地化页面使用自引用 Canonical，不能全部指向英文页面。

### 8.4 Hreflang

每个页面输出完整、双向一致的：

```text
en
zh-CN
zh-TW
es
pt
ja
x-default
```

`x-default` 指向英文地址。

两个域名分别生成自己的 hreflang 集合，不能混合为同一语言集。

### 8.5 Sitemap 与 robots

每个域名分别提供：

```text
/sitemap.xml
/robots.txt
```

Sitemap 只包含：

- 首页
- 工具页
- 所有语言版本
- About、Contact、Privacy、Terms 等正式页面

不得包含 404、重定向、参数页和临时转换结果。

### 8.6 结构化数据

工具页使用：

- `WebApplication` 或 `SoftwareApplication`
- `BreadcrumbList`

不得添加虚假评分、评论、下载量或用户数量。

### 8.7 工具页正文结构

每个工具页面必须有：

1. 唯一 H1。
2. 简短价值说明。
3. 转换器。
4. 如何使用。
5. 支持的格式和内容。
6. 转换前后示例。
7. 隐私和安全说明。
8. 限制说明。
9. 常见问题。
10. 相关工具。

不同工具页面必须提供针对格式的独立内容，不能只替换关键词。

## 9. 网站主题设计

两个网站采用“同一产品家族、不同任务心智”的设计，约 80% UI 共享，20% 品牌视觉区分。

| 项目 | DocsToMD | Docs2HTML |
| --- | --- | --- |
| 产品感觉 | 开发者、知识整理、结构化 | 网页发布、预览、内容展示 |
| 主色 | `#4F46E5` | `#C2410C` |
| Hover | `#4338CA` | `#9A3412` |
| 浅色背景 | `#EEF2FF` | `#FFF7ED` |
| Logo | 文档加 `#` | 文档加 `</>` |
| 结果区域 | Markdown 编辑器 | 浏览器网页预览 |

共享：

- 导航结构
- 上传组件
- 字体和字号层级
- 卡片、圆角、间距和阴影
- 语言切换器
- FAQ 和内容布局
- 页脚
- 广告位尺寸
- 错误、成功和进度状态
- 移动端布局

一期不做暗黑模式，避免增加六语言、预览、广告位和可访问性测试成本。

## 10. 仓库与 Workspace 架构

推荐结构：

```text
document-tools/
├── apps/
│   ├── docstomd/
│   │   ├── app/
│   │   ├── content/
│   │   ├── messages/
│   │   └── public/
│   └── docs2html/
│       ├── app/
│       ├── content/
│       ├── messages/
│       └── public/
├── packages/
│   └── converters/
├── package.json
├── pnpm-workspace.yaml
└── pnpm-lock.yaml
```

`pnpm-workspace.yaml`：

```yaml
packages:
  - "apps/*"
  - "packages/*"
```

一期先只提取 `packages/converters`。共享 UI 真正出现稳定重复后，再考虑 `packages/shared`，不要提前建立过多抽象。

## 11. 内部转换包

`packages/converters/package.json`：

```json
{
  "name": "@document-tools/converters",
  "version": "0.0.0",
  "private": true,
  "type": "module",
  "exports": {
    "./docx-to-markdown": "./src/docx-to-markdown.ts",
    "./html-to-markdown": "./src/html-to-markdown.ts",
    "./markdown-to-html": "./src/markdown-to-html.ts",
    "./csv": "./src/csv.ts",
    "./xlsx": "./src/xlsx.ts",
    "./pdf": "./src/pdf.ts"
  }
}
```

两个 App 使用：

```json
{
  "dependencies": {
    "@document-tools/converters": "workspace:*"
  }
}
```

该包不发布到 npm。pnpm 在安装时自动链接到两个 App，Next.js 构建时将其打包进静态网站。

两个 App 的 Next.js 配置应包含：

```ts
transpilePackages: ["@document-tools/converters"]
```

大型转换器通过动态 import 加载，不能进入所有页面的首屏包。

## 12. 开源依赖选型

不要直接采用 GitHub 搜索中的完整 `doc2html` 项目。多数项目属于多年未维护的 Java/Python 应用、没有明确许可证，或者不是浏览器依赖库。

### 12.1 一期核心依赖

| 用途 | npm 包 | GitHub | 许可证 |
| --- | --- | --- | --- |
| DOCX → HTML | `mammoth` | `mwilliamson/mammoth.js` | BSD-2-Clause |
| HTML → Markdown | `turndown` | `mixmark-io/turndown` | MIT |
| GFM 表格 | `turndown-plugin-gfm` | `mixmark-io/turndown-plugin-gfm` | MIT |
| Markdown → HTML | `markdown-it` | `markdown-it/markdown-it` | MIT |
| HTML 安全清理 | `dompurify` | `cure53/DOMPurify` | Apache-2.0 / MPL-2.0 |

核心处理链：

```text
DOCX → HTML
Mammoth → DOMPurify

DOCX → Markdown
Mammoth → DOMPurify → Turndown

HTML → Markdown
DOMPurify → Turndown

Markdown → HTML
markdown-it → DOMPurify
```

安装：

```bash
pnpm --filter @document-tools/converters add \
  mammoth \
  turndown \
  turndown-plugin-gfm \
  markdown-it \
  dompurify
```

### 12.2 按工具延后安装

PDF 页面开发时安装：

```bash
pnpm --filter @document-tools/converters add pdfjs-dist
```

CSV 页面开发时安装：

```bash
pnpm --filter @document-tools/converters add papaparse
```

XLSX 页面开发时安装：

```bash
pnpm --filter @document-tools/converters add read-excel-file
```

选择原因：

- `pdfjs-dist` 是 Mozilla PDF.js 的 npm 包，只在 PDF 页面动态加载。
- `papaparse` 支持 RFC 4180、分隔符、大文件和 Web Worker，不手写 CSV 解析器。
- `read-excel-file` 专注浏览器读取 XLSX，自带 Web Worker，避免引入完整电子表格 SDK。

商业使用时需保留依赖许可证声明，并锁定依赖版本。

## 13. HTML 安全要求

必须：

- 使用 DOMPurify 清理 HTML。
- 删除 `script`。
- 删除 `onclick` 等事件属性。
- 禁止 `javascript:` URL。
- 清理 `iframe`、`object` 和 `embed`。
- HTML 预览放入受限制的 sandbox iframe。
- 未清理 HTML 不能插入主页面 DOM。
- 设置文件大小和压缩包解压限制。
- 对 DOCX、HTML、Markdown 和 PDF 等不可信输入做错误隔离。
- DOMPurify 清理后不得再执行会重新引入危险标签的处理。

Mammoth 官方明确提示其输出不会自动执行安全清理，因此必须与 DOMPurify 搭配。

## 14. Cloudflare 部署方案

一期采用：

```text
Next.js 静态导出
        ↓
生成 out/
        ↓
Cloudflare Pages
```

两个 App 的 `next.config.ts`：

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  transpilePackages: ["@document-tools/converters"],
};

export default nextConfig;
```

构建：

```bash
pnpm --filter docstomd build
pnpm --filter docs2html build
```

生成：

```text
apps/docstomd/out/
apps/docs2html/out/
```

Cloudflare Pages 项目配置：

| 项目 | Build command | Output directory |
| --- | --- | --- |
| DocsToMD | `pnpm --filter docstomd build` | `apps/docstomd/out` |
| Docs2HTML | `pnpm --filter docs2html build` | `apps/docs2html/out` |

两个 Pages 项目都以仓库根目录作为构建根目录，以便访问 workspace 和共享包。

一期不需要：

- OpenNext
- Wrangler
- Cloudflare Workers
- Vercel 专属能力

未来增加 SSR、API、服务端 OCR 或大文件转换后，再使用 `@opennextjs/cloudflare` 和 Wrangler 部署到 Cloudflare Workers。

## 15. AdSense 准备要求

两个网站需要分别添加到 AdSense 进行网站审核，但可以使用同一个 AdSense 账户。

上线前必须有：

- About
- Contact
- Privacy Policy
- Terms of Service
- Cookie Policy
- 清晰导航
- 有实际价值的工具和说明内容
- 后续接入 `/ads.txt`

广告位建议：

1. 转换器和结果区域之后。
2. 长内容中部。
3. 桌面端内容侧边栏，可选。

禁止：

- 广告紧贴上传、转换、复制或下载按钮。
- 广告伪装成下载按钮。
- 转换完成后突然插入广告造成布局移动。
- 强制刷新页面增加广告展示。
- 使用遮挡转换结果的弹窗广告。

广告容器应预留固定空间，避免 CLS。

面向欧洲经济区、英国和瑞士提供 AdSense 时，需要按 Google 要求接入用户同意管理方案。

## 16. 性能目标

- LCP ≤ 2.5 秒。
- INP ≤ 200 毫秒。
- CLS ≤ 0.1。
- 移动端 Lighthouse Performance ≥ 90。
- Lighthouse SEO ≥ 95。
- Lighthouse Accessibility ≥ 90。
- 首页不加载 DOCX、PDF、XLSX 等解析库。
- 解析库仅在用户进入对应工具或选择文件后动态加载。
- 大文件转换不阻塞页面交互。
- 广告脚本未启用时不能影响首屏性能。

## 17. 一期验收清单

- 两个域名均可通过 HTTPS 访问。
- 每个网站上线六个工具页面。
- 每个工具页面拥有六种语言版本。
- 总计至少 72 个本地化工具 URL。
- 所有正式 URL 返回 200。
- Canonical 正确。
- Hreflang 完整、双向一致。
- Sitemap 只包含有效 URL。
- robots.txt 未误封页面和资源。
- 每页只有一个 H1。
- 每页 title 和 description 唯一。
- 文件没有上传服务器。
- 恶意 HTML 无法在预览中执行。
- 扫描 PDF 和加密文件有明确提示。
- Chrome、Safari、Edge 和 Firefox 可完成基本转换。
- 移动端可以上传、复制和下载。
- 六种语言不存在明显漏翻。
- 两个网站的正文内容不是互相复制。
- 两个域名分别完成 Search Console 验证。
- Analytics 不采集文件名和文档内容。

## 18. 推荐实施顺序

1. 初始化 pnpm workspace 和两个 Next.js App。
2. 配置静态导出、Cloudflare Pages 构建和独立域名。
3. 建立六语言路由、翻译结构、Canonical 和 hreflang。
4. 完成共享上传、预览、复制、下载和错误组件。
5. 完成 DOMPurify 安全层。
6. 完成 Markdown ↔ HTML。
7. 完成 DOCX → HTML → Markdown 转换链。
8. 完成 Google Docs 粘贴转换。
9. 完成 CSV 转换。
10. 完成 XLSX 转换。
11. 最后完成文本型 PDF 转 Markdown。
12. 补齐每个工具的六语言 SEO 内容。
13. 验证性能、安全、SEO、浏览器兼容性和移动端体验。
14. 上线并接入 Search Console。
15. 获得稳定内容和流量后申请或接入 AdSense。

