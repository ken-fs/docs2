/**
 * 把 out/ 当静态站点端出来，行为对齐 Cloudflare Pages：
 *
 *   /foo/          → out/foo/index.html
 *   /foo           → 308 到 /foo/          （trailingSlash: true 的产物）
 *   找不到          → out/404.html，状态码 404
 *
 * 为什么不用 next start：一期部署是纯静态托管，next start 会跑 Node 服务器，
 * 测出来的 404 行为和线上不一样。这里测的就是真正要上传的那堆文件。
 */
import { createServer } from "node:http";
import { readFile, realpath, stat } from "node:fs/promises";
import { join, extname, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const OUT = join(fileURLToPath(new URL(".", import.meta.url)), "..", "out");
const PORT = Number(process.argv[2] ?? 3311);

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".png": "image/png",
};

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

  const send = (code, body, type) => {
    res.writeHead(code, { "content-type": type ?? "text/html; charset=utf-8" });
    res.end(body);
  };

  // 带扩展名的当资源文件
  if (extname(pathname)) {
    const body = await readIfFile(join(OUT, pathname));
    if (body) return send(200, body, TYPES[extname(pathname)]);
  }

  if (pathname.endsWith("/")) {
    const body = await readIfFile(join(OUT, pathname, "index.html"));
    if (body) return send(200, body);
  } else {
    // 目录存在就补斜杠跳过去，跟 trailingSlash: true 的线上行为一致
    const body = await readIfFile(join(OUT, pathname, "index.html"));
    if (body) {
      res.writeHead(308, { location: `${pathname}/${url.search}` });
      return res.end();
    }
  }

  const notFound = await readIfFile(join(OUT, "404.html"));
  return send(404, notFound ?? "404");
}).listen(PORT, () => console.log(`serving out/ on http://localhost:${PORT}`));
