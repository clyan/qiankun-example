import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import qiankun from 'vite-plugin-qiankun';

const useDevMode = true

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 7404,
  },
  plugins: [vue(), qiankun('vue-vite', {useDevMode})],
})


