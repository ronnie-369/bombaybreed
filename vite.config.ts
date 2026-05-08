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
    rollupOptions: {
      output: {
        // Stable vendor chunks - libraries change far less often than app code,
        // so isolating them lets browsers reuse cached bundles across deploys.
        manualChunks(id) {
          if (!id.includes('node_modules')) return;

          if (id.includes('/react-dom/') || id.includes('/react/') || id.includes('/scheduler/')) {
            return 'vendor-react';
          }
          if (id.includes('/react-router') || id.includes('/@remix-run/router') || id.includes('/history/')) {
            return 'vendor-router';
          }
          if (id.includes('/@supabase/')) {
            return 'vendor-supabase';
          }
          if (id.includes('/@radix-ui/')) {
            return 'vendor-radix';
          }
          if (id.includes('/recharts/') || id.includes('/d3-') || id.includes('/victory-vendor/')) {
            return 'vendor-charts';
          }
          if (id.includes('/react-day-picker/') || id.includes('/date-fns/')) {
            return 'vendor-calendar';
          }
          if (id.includes('/framer-motion/')) {
            return 'vendor-motion';
          }
          if (id.includes('/lucide-react/')) {
            return 'vendor-icons';
          }
          if (id.includes('/@tanstack/')) {
            return 'vendor-tanstack';
          }
          if (id.includes('/dompurify/') || id.includes('/marked/')) {
            return 'vendor-content';
          }

          return 'vendor';
        },
      },
    },
  },
}));
