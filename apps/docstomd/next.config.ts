import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // converters 包直接导出 .ts 源码、不预编译，所以要让 Next 自己转译
  transpilePackages: ["@document-tools/converters"],
};

export default nextConfig;
