import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Serve the canonical repository brand asset; Vite copies it into the build.
const brandAssets = fileURLToPath(new URL("../../assets/brand/", import.meta.url));
export default defineConfig({
  plugins: [react(), tailwindcss()],
  publicDir: brandAssets,
});
