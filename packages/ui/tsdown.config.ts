import { defineConfig } from "tsdown";

export default defineConfig({
  entry: { index: "src/index.ts" },
  format: ["esm"],
  dts: true,
  clean: true,
  // Keep future React client boundaries at their original module scope.
  unbundle: true,
  fixedExtension: false,
  outDir: "dist",
  external: ["react", "react-dom", "react/jsx-runtime", "tailwindcss"],
});
