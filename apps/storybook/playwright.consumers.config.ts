import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests-consumers",
  outputDir: "../../../priv/t006-playwright-results",
  fullyParallel: false,
  workers: 1,
  timeout: 240_000,
  use: {
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
