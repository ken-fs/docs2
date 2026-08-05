/**
 * 把 pdfjs-dist 的 worker 和字体资源复制到 public/pdfjs/。
 *
 * 为什么要复制，而不是让打包器处理：
 *
 * 1. worker。pdf.js 在一个 Web Worker 里解析 PDF，worker 必须是一个能用 URL
 *    取到的独立文件。pdf.js 默认会去 CDN 上拿 —— 那就把用户的文件名和使用
 *    行为泄露给第三方了，跟「文件不出你电脑」这个承诺直接冲突。所以自己托管。
 *
 * 2. cmaps。中日韩的 PDF 常用预定义 CMap 编码（比如 UniJIS-UCS2-H），要把
 *    字符码映射回 Unicode 就得读这些表。站点有 zh-CN / zh-TW / ja 三个语种，
 *    没有它们，日文 PDF 抽出来就是一串乱码。
 *
 * 3. standard_fonts。PDF 允许不嵌入那 14 个标准字体，此时字形到字符的映射
 *    要从这里查。
 *
 * wasm 目录（jbig2 / openjpeg / qcms / quickjs）刻意不复制：那些是解码图像和
 * 跑表单脚本用的，我们只抽文字，永远走不到。对应地传 useWasm: false。
 *
 * 用法：pnpm build 前自动跑。产物在 .gitignore 里 —— 4MB 的第三方二进制没有
 * 进版本库的理由，装完依赖重新生成就是。
 */
import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const app = join(here, "..");
const require = createRequire(import.meta.url);
const pdfjs = dirname(require.resolve("pdfjs-dist/package.json"));
const { version } = JSON.parse(await readFile(join(pdfjs, "package.json"), "utf8"));

const out = join(app, "public/pdfjs");
await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });

await cp(join(pdfjs, "build/pdf.worker.min.mjs"), join(out, "pdf.worker.min.mjs"));
await cp(join(pdfjs, "cmaps"), join(out, "cmaps"), { recursive: true });
await cp(join(pdfjs, "standard_fonts"), join(out, "standard_fonts"), {
  recursive: true,
});
// 保留许可声明 —— pdf.js 是 Apache-2.0，标准字体是 Foxit 授权的
await cp(join(pdfjs, "LICENSE"), join(out, "LICENSE"));

/**
 * 版本写进文件里，让运行时能校验。
 *
 * worker 和主线程的 pdf.js 版本必须一致，pdf.js 自己会检查并报错。危险的
 * 情况是升级了依赖但忘了重新复制 —— 那时 public/ 里躺着的是旧 worker，
 * 而报错只在用户真的转 PDF 时才出现。写下版本号，让运行时能提前发现。
 */
await writeFile(
  join(app, "src/lib/pdfjs-assets.ts"),
  `// 由 scripts/copy-pdfjs.mjs 生成，不要手改。
// 资源在 public/pdfjs/（.gitignore 掉了），跑 pnpm pdfjs 重新生成。

/** 复制资源时 pdfjs-dist 的版本。运行时拿它和库自报的版本对一下。 */
export const PDFJS_ASSET_VERSION = "${version}";

/** 全部同源，不碰任何 CDN。 */
export const PDFJS_WORKER_SRC = "/pdfjs/pdf.worker.min.mjs";
export const PDFJS_CMAP_URL = "/pdfjs/cmaps/";
export const PDFJS_FONT_URL = "/pdfjs/standard_fonts/";
`,
);

console.log(`public/pdfjs: pdfjs-dist ${version}`);
