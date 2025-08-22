import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  root: 'client',                         // 你的 index.html 在 client/
  base: '/',                              // 关键：从站点根加载 /assets/*.js
  publicDir: path.resolve(__dirname, 'client/public'),
  plugins: [react()],
  build: {
    outDir: path.resolve(__dirname, 'dist/public'), // 和 Cloudflare 输出目录一致
    emptyOutDir: true
  }
})
