import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
import qiankun from 'vite-plugin-qiankun';
import babel from '@rollup/plugin-babel';
const useDevMode = true

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 7102,
  },
  plugins: [
    // 微前端下使用该插件会有问题
    // react(), 
    babel({ presets: ['@babel/preset-react'] }),
    qiankun('react-vite', {useDevMode})],
})