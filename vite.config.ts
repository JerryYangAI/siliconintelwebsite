// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  root: 'client',           // 如果 index.html 在 client/ 下
  base: '/',                // 关键：所有静态资源从站点根加载
  publicDir: path.resolve(__dirname, 'client/public'),
  plugins: [react()],
  build: {
    outDir: path.resolve(__dirname, 'dist/public'),
    emptyOutDir: true
  }
})
