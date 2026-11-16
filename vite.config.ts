import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import tsConfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    tanstackStart({
      spa: {
        enabled: true,
      },
      prerender: {
        failOnError: false,
      },
    }),
    react(),
    tailwindcss(),
    tsConfigPaths(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://api.infraglide.com',
        changeOrigin: true,
        secure: true,
        headers: {
          Origin: 'https://infraglide.com'
        }
      }
    }
  }
});
