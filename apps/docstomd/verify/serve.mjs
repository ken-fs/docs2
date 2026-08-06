/**
 * 把 out/ 当静态站点端出来，行为对齐 Cloudflare Workers 的 Static Assets：
 *
 *   /foo/          → out/foo/index.html
 *   /foo           → 307 到 /foo/          （trailingSlash: true 的产物）
 *   找不到          → out/404.html，状态码 404
 *   文本资源        → 按 Accept-Encoding 用 br / gzip 压缩后发
 *
 * 为什么不用 next start：一期部署是纯静态托管，next start 会跑 Node 服务器，
 * 测出来的 404 行为和线上不一样。这里测的就是真正要上传的那堆文件。
 *
 * 压缩这件事必须做，不然性能测出来是假的：Cloudflare 对文本资源默认开
 * brotli，而这堆 JS 压完只剩四分之一（1955KB → 484KB）。不压的话 Lighthouse
 * 在慢 4G 节流下把「下载完所有 JS」算成五六秒，LCP 直接判到 76 分 —— 那是在
 * 测这个测试服务器，不是在测站点。
 */
import { createServer } from "node:http";
import { createHash } from "node:crypto";
import { readFile, realpath, stat } from "node:fs/promises";
import { brotliCompress, gzip } from "node:zlib";
import { join, extname, normalize } from "node:path";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";

const brotliAsync = promisify(brotliCompress);
const gzipAsync = promisify(gzip);

const OUT = join(fileURLToPath(new URL(".", import.meta.url)), "..", "out");
const PORT = Number(process.argv[2] ?? 3311);

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  // pdf.js 的 worker 是 .mjs。浏览器对 module script 强制检查 MIME，
  // 猜错一个 text/html 就直接拒绝加载，而不是回退成普通脚本。
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".png": "image/png",
  // pdf.js 的 CMap（CJK 字符映射）和标准字体
  ".bcmap": "application/octet-stream",
  ".pfb": "application/octet-stream",
};

/**
 * 该不该压。二进制资源不压 —— woff2 内部已经是压缩格式，png 也是，
 * 再压一遍只是白烧 CPU，Cloudflare 同样跳过它们。
 */
const COMPRESSIBLE = /^(?:text\/|application\/(?:json|xml|javascript)|image\/svg)/;

/** 压过的结果缓存起来。一轮 Lighthouse 会把同一个 chunk 抓好几次。 */
const cache = new Map();

async function encode(body, type, accept) {
  if (!COMPRESSIBLE.test(type ?? "") || body.length < 1024) return [body, null];

  // brotli 优先，和 Cloudflare 的偏好一致
  const enc = /\bbr\b/.test(accept) ? "br" : /\bgzip\b/.test(accept) ? "gzip" : null;
  if (!enc) return [body, null];

  // 键必须是全文的哈希，不能是「长度 + 开头几个字节」那种指纹。
  //
  // 曾经就是那么写的，然后 /word-to-markdown/ 端出了 /docx-to-markdown/ 的
  // 页面：所有英文页的前 32 字节都是同一串 `<!DOCTYPE html><html lang="en" c`，
  // 于是键退化成只有长度，两个页面字节数一样就互相顶掉。表现出来是正文
  // 原创性检查报「两页 100% 重合」—— 一个假的产品缺陷，查了半天在服务器里。
  //
  // 用 sha1 是因为这里只要求「内容不同则键不同」，不涉及安全，图快。
  const key = `${enc}:${createHash("sha1").update(body).digest("base64")}`;
  const hit = cache.get(key);
  if (hit) return [hit, enc];

  // 压缩级别取默认值：线上是 CDN 边缘实时压，不会用最高级别，
  // 这里用默认档比追求最小体积更接近真实
  const out = enc === "br" ? await brotliAsync(body) : await gzipAsync(body);
  cache.set(key, out);
  return [out, enc];
}

async function readIfFile(p) {
  try {
    if (!(await stat(p)).isFile()) return null;
    // macOS 的 APFS 默认不区分大小写，/ZH-CN/ 在本地能读到 out/zh-cn/，
    // 但线上是区分的。realpath 拿磁盘上的真实拼写来比，别让本地测出假的 200。
    if ((await realpath(p)) !== p) return null;
    return await readFile(p);
  } catch {
    return null;
  }
}

createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost");
  // normalize 挡掉 ../ 穿越
  const pathname = normalize(decodeURIComponent(url.pathname));

  const send = async (code, body, type) => {
    const ct = type ?? "text/html; charset=utf-8";
    const [payload, enc] = await encode(body, ct, req.headers["accept-encoding"] ?? "");
    const headers = { "content-type": ct, "content-length": payload.length };
    if (enc) {
      headers["content-encoding"] = enc;
      // 同一个 URL 会按 Accept-Encoding 给出不同字节，不声明 Vary
      // 中间层可能把压缩过的响应发给不支持的客户端
      headers.vary = "Accept-Encoding";
    }
    // 指纹化的静态资源给长缓存，跟 Cloudflare 对 _next/static 的行为一致。
    // Lighthouse 的 cache-insight 审计会看这个头。
    headers["cache-control"] = pathname.startsWith("/_next/static/")
      ? "public, max-age=31536000, immutable"
      : "public, max-age=0, must-revalidate";
    res.writeHead(code, headers);
    res.end(payload);
  };

  // 带扩展名的当资源文件
  if (extname(pathname)) {
    const body = await readIfFile(join(OUT, pathname));
    if (body) return await send(200, body, TYPES[extname(pathname)]);
  }

  if (pathname.endsWith("/")) {
    const body = await readIfFile(join(OUT, pathname, "index.html"));
    if (body) return await send(200, body);
  } else {
    // 目录存在就补斜杠跳过去，跟 trailingSlash: true 的线上行为一致
    const body = await readIfFile(join(OUT, pathname, "index.html"));
    if (body) {
      // 307 而不是 308：这是 Cloudflare Workers 的 Static Assets 在
      // html_handling: force-trailing-slash 下的实际状态码（实测 workerd，
      // 官方文档的 html-handling 表格里也只出现 307）。
      //
      // 写 308 会让本地验收在这一条上撒谎 —— 而这个文件存在的全部意义
      // 就是「本地测出来的行为等于线上」。308 是永久重定向，语义上更适合
      // 这种规范化跳转，但线上给的不是它，所以这里跟着线上写。
      res.writeHead(307, { location: `${pathname}/${url.search}` });
      return res.end();
    }
  }

  const notFound = await readIfFile(join(OUT, "404.html"));
  return await send(404, notFound ?? "404");
}).listen(PORT, () => console.log(`serving out/ on http://localhost:${PORT}`));
