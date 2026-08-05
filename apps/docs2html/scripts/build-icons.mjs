/**
 * 从 @iconify-json/ph 里挑出真正用到的图标，生成 src/components/icon-data.ts。
 *
 * 为什么不直接 addCollection(icons)：整个 ph 集合有 9161 个图标、约 4.5MB，
 * 全打进首屏包。这里只留用到的那二十来个。
 *
 * 用法：pnpm icons —— 加删图标后跑一次；CI 里 pnpm build 前会先跑，
 * 顺手校验有没有引用了不存在的图标名。
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const here = dirname(fileURLToPath(import.meta.url));
const app = join(here, "..");
const require = createRequire(import.meta.url);
const collection = JSON.parse(
  readFileSync(require.resolve("@iconify-json/ph/icons.json"), "utf8"),
);

/** 递归收集 src 下所有源码里出现的 "ph:xxx" 字面量。 */
function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if (/\.(tsx?|mts)$/.test(name)) out.push(p);
  }
  return out;
}

const used = new Set();
for (const file of walk(join(app, "src"))) {
  for (const m of readFileSync(file, "utf8").matchAll(/["']ph:([a-z0-9-]+)["']/g)) {
    used.add(m[1]);
  }
}

const names = [...used].sort();
const icons = {};
const missing = [];
for (const name of names) {
  const entry = collection.icons[name] ?? collection.icons[collection.aliases?.[name]?.parent];
  if (!entry) missing.push(name);
  else icons[name] = entry;
}

if (missing.length) {
  console.error(`ph 集合里没有这些图标: ${missing.join(", ")}`);
  process.exit(1);
}

const banner = `// 由 scripts/build-icons.mjs 生成，不要手改。加删图标后跑 pnpm icons。
// 只收录 src 里实际引用的 ${names.length} 个图标；整个 ph 集合有 ${Object.keys(collection.icons).length} 个、约 4.5MB。
`;
const data = {
  prefix: collection.prefix,
  width: collection.width,
  height: collection.height,
  icons,
};
writeFileSync(
  join(app, "src/components/icon-data.ts"),
  `${banner}\nexport const phSubset = ${JSON.stringify(data, null, 2)} as const;\n`,
);
console.log(`icon-data.ts: ${names.length} 个图标`);
