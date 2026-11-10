import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: { index: 'src/index.ts' },
  format: ['esm'],
  dts: true,
  clean: true,
  outDir: 'dist',
  external: ['react', 'react-dom', 'react/jsx-runtime', 'tailwindcss'],
});
