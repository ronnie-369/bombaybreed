import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Content-hashed filenames let us serve /assets/* with a 1-year
    // immutable Cache-Control header (see public/_headers). Any code change
    // produces a new hash, busting the cache automatically.
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
        // Stable vendor chunks - libraries change far less often than app code,
        // so isolating them lets browsers reuse cached bundles across deploys.
        // Intentionally NO manualChunks: hand-grouping libraries like recharts
        // + d3 + victory-vendor causes cross-chunk circular imports that throw
        // "Cannot access 'X' before initialization" in production. Let Rollup
        // perform automatic code-splitting based on dynamic imports instead.
      },
    },
  },
}));
