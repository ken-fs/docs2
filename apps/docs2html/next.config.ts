import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cloudflare Pages 只托管静态文件，构建产物是 out/
  output: "export",
  // 目录式 URL：/docx-to-markdown/ 而不是 /docx-to-markdown。
  // canonical 和 hreflang 写的就是带斜杠的地址，这样才不用多绕一次 308。
  trailingSlash: true,
  // 静态导出没有图片优化服务
  images: { unoptimized: true },
  // converters 包直接导出 .ts 源码、不预编译，所以要让 Next 自己转译
  transpilePackages: ["@document-tools/converters"],
};

export default nextConfig;
