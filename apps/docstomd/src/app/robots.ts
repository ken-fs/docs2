import type { MetadataRoute } from "next";

// 静态导出下 Next 要求元数据路由显式声明是静态的
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://docstomd.com/sitemap.xml",
  };
}
