# SEO 改动台账（docstomd.com + docs2html.com）

每次 SEO 调整记一条：日期、改了什么（带网址）、为什么、预期、复查日 + 看哪些指标。到复查日补结果（✅ / ❌ / ➖ + 原因）。
更早的改动和整体战略见 `seo-strategy.md`（不进版本库）。

## 基线 · docs2html.com · GSC 28 天（2026-10-14 ~ 11-10）

全站 29 点击 / 1,211 曝光 / 平均第 19.8 位（前 28 天 25 / 1,072）。巴西 7、日本 6、台湾 4、西班牙 3、美国 3 次点击。站上没广告。

---

## 2026-11-18 · docs2html · 加德 / 法 / 意 / 韩四种语言 + 英文 Word 词改落工具页

**改了什么**
- 新语言：/de/ /fr/ /it/ /ko/ 下全套页面（工具页 8 + guides 8 + about/contact/法律页），全站 138 → 212 页；sitemap、hreflang、语言切换自动带上。每种语言的 title / H1 按当地谷歌联想词写（如 de「Word in HTML umwandeln」、fr「Convertir Word en HTML」、it「Convertire Word in HTML」、ko「워드 HTML 변환」「엑셀 HTML 변환」；空行 guide 用 de「HTML Leerzeile einfügen」、fr「sauter une ligne html」、ko「html 한 줄 띄우기」）。韩语加 `word-break: keep-all`
- https://docs2html.com/docx-to-html/（英文）：title「DOCX to HTML Converter — clean semantic HTML, no Word junk」→「Word to HTML Converter — DOCX to clean HTML, free, in your browser」；H1「DOCX to HTML converter」→「Word to HTML converter」；description 以「Convert a Word document (.docx)」开头；keywords 前三个换成 word to html / word to html converter / convert word to html
- https://docs2html.com/guides/word-to-html-without-uploading/（英文）：title 去掉「Convert Word to HTML」→「No-upload document conversion: build the HTML in your tab, check it in a sandbox」；H1 →「Your .docx never leaves the tab: how to check that yourself」，把泛词让给工具页
- 各语言联系页「本站有六种语言」→ 十种；隐私页「托管在 Cloudflare Pages」→ Cloudflare Workers（实际部署方式）
- autopilot（Ship/scripts，fee498b）：/pt/docx-to-html/、/pt/excel-to-html-table/ 进 protect 列表，11-26 前不再改标题

**为什么**（GSC 90 天）
- 非英语页排第 5–30（zh-tw text-to-html 5.7 / 17 点击、ja google-docs 8.1、es 6–20），英文页排第 40–70；点击 60%+ 来自台湾 / 日本 / 巴西。德法意韩是高 CPM 市场里还没覆盖的，联想词里都有现成搜法
- 英文「word to html」（56 曝光）、converting word to html（45）、word html（16）、word doc to html（14）等全落在隐私 guide（排 50–75），工具页标题只写了 DOCX
- 葡语两页 10-13～11-04 标题改了 3 次，排名一直 25–35，前排是 convertio / aspose / freeconvert，差的是站的分量不是标题

**预期**：四种新语言 4 周内被收录、开始有曝光，至少一种语言的 Word / Excel 页进前 20；英文 word to html 这批词改落 /docx-to-html/

**复查 📅 2026-12-16**：GSC 28 天按语言前缀（/de/ /fr/ /it/ /ko/）的曝光 / 点击 / 排名、收录页数；word to html 这批词落在哪页、排第几
**结果**：（待补）

---

## 2026-11-12 · docs2html · CSV 页补问答 + 空行 guide 对准「html blank line」

**改了什么**
- https://docs2html.com/csv-to-html-table/（只改英文）：新加 3 条问答 —— 在浏览器里把 CSV 当表格打开（整页模式下载后双击）、Excel / Google Sheets 导出该选哪个 CSV（UTF-8）、怎么贴进 WordPress / CMS（Fragment + Custom HTML 块）。description 改成以「Convert CSV to an HTML table」开头并缩到 144 字符；keywords 加 csv to table、html table from csv
- https://docs2html.com/guides/plain-text-to-html-paragraphs/（只改英文）：title「Blank line between paragraphs in HTML: plain text to <p> tags」→「Blank line in HTML: how to add one between paragraphs」；H1「Blank lines and paragraphs in HTML」→「How to add a blank line in HTML」；description 改成直接给答案（152 字符）；最前面加一节「Four ways to get a blank line」（换段 / 两个 <br> / <p>&nbsp;</p> / CSS margin）；原来那节改名「Blank lines in plain text become <p> tags」
- 测试清单补上 10-20 上线的 /markdown-to-pdf/（site.spec 的 ALL_SLUGS + verify/i18n、contrast、cross-site），之前 sitemap 那条测试因此一直是红的

**为什么**（GSC 90 天 query × page）
- CSV 页：csv to html 68 次曝光排第 32.7、csv to html table 42 / 23.6、csv to table 4 / 8.5、html table from csv 5 / 36.6；28 天曝光 29 → 123，是英文页里唯一在涨的
- 空行 guide：html blank line 52 / 14.2、html empty line 18 / 28.2、blank line in html 14 / 13.8、html blank line between paragraphs 13 / 7.0，加上一串 how to add a blank line in html。搜的人要的是「怎么加空行」的代码，原页只讲转换器怎么切段落

**预期**：CSV 页 csv to html table 进前 15、csv to html 进前 25；guide 的 html blank line 从 14 进前 10，页面有点击（现在 28 天 1 次）

**复查 📅 2026-11-26**：GSC 28 天，两页的曝光 / 点击 / 平均排名，以及上面这些词各自的排名
**结果**：（待补）
