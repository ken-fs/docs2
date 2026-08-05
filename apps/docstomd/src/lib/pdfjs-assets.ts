// 由 scripts/copy-pdfjs.mjs 生成，不要手改。
// 资源在 public/pdfjs/（.gitignore 掉了），跑 pnpm pdfjs 重新生成。

/** 复制资源时 pdfjs-dist 的版本。运行时拿它和库自报的版本对一下。 */
export const PDFJS_ASSET_VERSION = "6.2.108";

/** 全部同源，不碰任何 CDN。 */
export const PDFJS_WORKER_SRC = "/pdfjs/pdf.worker.min.mjs";
export const PDFJS_CMAP_URL = "/pdfjs/cmaps/";
export const PDFJS_FONT_URL = "/pdfjs/standard_fonts/";
