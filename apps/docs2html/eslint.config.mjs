import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // 第三方产物：scripts/copy-pdfjs.mjs 从 pdfjs-dist 里搬过来的压缩包，
    // 连同它生成的资源清单。别人的代码风格不该拿我们的规则去判。
    "public/pdfjs/**",
    "src/lib/pdfjs-assets.ts",
    "src/lib/icon-data.ts",
  ]),
]);

export default eslintConfig;
