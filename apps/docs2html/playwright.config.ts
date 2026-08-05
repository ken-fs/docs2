import { defineConfig, devices } from "@playwright/test";

/**
 * 只做本地验收。测的是 out/ 里那堆真要上传的静态文件，而不是 next dev/start ——
 * 一期托管在 Cloudflare Pages，没有 Node 服务器，404 和尾斜杠的行为都不一样。
 * 跑之前先 pnpm build。
 */
export default defineConfig({
  testDir: "./verify",
  fullyParallel: true,
  workers: 4,
  reporter: [["list"]],
  // 端口跟 docstomd 那套错开：两站的验收套件常常要连着跑，撞端口时
  // reuseExistingServer 会让这边的测试跑到另一个站的 out/ 上，而且报错
  // 看起来像文案不对，很难查。
  webServer: {
    command: "node verify/serve.mjs 3312",
    url: "http://localhost:3312/",
    reuseExistingServer: true,
    timeout: 20_000,
  },
  use: {
    baseURL: "http://localhost:3312",
    ...devices["Desktop Chrome"],
  },
});
