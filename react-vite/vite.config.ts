import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
import qiankun from 'vite-plugin-qiankun';
import babel from '@rollup/plugin-babel';

// 开发环境下支持作为子应用调试
const useDevMode = true

// https://vite.dev/config/
export default defineConfig({
  // 需要设置为生产环境部署访问的绝对路径
  base: 'http://localhost:7102/',
  server: {
    port: 7102,
  },
  plugins: [
    // 微前端下使用该插件会有问题，使用 babel替代
    // react(), 
    babel({ presets: ['@babel/preset-react'] }),
    qiankun('react-vite', {useDevMode})],
})