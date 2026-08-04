import { defineConfig, devices } from "@playwright/test";

/** 只做本地验收：跑生产构建，不进 CI。 */
export default defineConfig({
  testDir: "./verify",
  fullyParallel: true,
  workers: 4,
  reporter: [["list"]],
  use: {
    baseURL: "http://localhost:3311",
    ...devices["Desktop Chrome"],
  },
});
