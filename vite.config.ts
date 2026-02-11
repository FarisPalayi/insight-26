import path from "path"
import { defineConfig, type PluginOption } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { visualizer } from "rollup-plugin-visualizer";

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss(), mode === 'analyze' && visualizer({
    open: true,
    gzipSize: true,
    brotliSize: true,
  }) as PluginOption].filter(Boolean),
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'animation': ['framer-motion', 'gsap'],
          'firebase': ["firebase/app", "firebase/firestore"],
          'reactVendor': ['react', 'react-dom', 'react-router'],
          'embla-carousel-react': ['embla-carousel-react'],
        }
      }
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}))
