import type { MetadataRoute } from "next";

// 静态导出下 Next 要求元数据路由显式声明是静态的
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    // 每个域名一份 robots + sitemap（方案 §8.5）。这里写死本站的绝对地址，
    // 不能指向姐妹站的 sitemap —— 一份 sitemap 只能收自己域名下的 URL。
    sitemap: "https://docs2html.com/sitemap.xml",
  };
}
