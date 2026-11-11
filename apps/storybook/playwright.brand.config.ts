import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  testMatch: "brand.spec.ts",
  fullyParallel: false,
  use: {
    baseURL: "http://127.0.0.1:4173/marisma/",
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command:
      "pnpm --dir ../landing run build:base && node tests/serve-landing.mjs",
    url: "http://127.0.0.1:4173/marisma/",
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
