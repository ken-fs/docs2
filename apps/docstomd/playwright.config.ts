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
  webServer: {
    command: "node verify/serve.mjs 3311",
    url: "http://localhost:3311/",
    reuseExistingServer: true,
    timeout: 20_000,
  },
  use: {
    baseURL: "http://localhost:3311",
    ...devices["Desktop Chrome"],
  },
});
