import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import viteImagemin from 'vite-plugin-imagemin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 20,
      },
      pngquant: {
        quality: [0.6, 0.8],
        speed: 4,
      },
      svgo: {
        plugins: [
          {
            removeViewBox: false,
          },
          {
            removeEmptyAttrs: false,
          },
        ],
      },
    }),
  ],
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
