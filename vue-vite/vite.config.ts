import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import qiankun from 'vite-plugin-qiankun';

const useDevMode = false

// https://vite.dev/config/
export default defineConfig({
  // 需要设置为生产环境部署访问的绝对路径
  base: 'http://localhost:7104/',
  server: {
    port: 7104,
  },
  plugins: [vue(), qiankun('vue-vite', {useDevMode})],
})


