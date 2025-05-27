import { createApp,  } from 'vue'
import type { App } from 'vue'
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper';
import './style.css'
import AppComp from './App.vue'
import router from './router';

let instance: App<Element> | null = null;

const render = (props: any) => {
  const { container } = props;
  instance = createApp(AppComp)
  instance.use(router)
  instance.mount(container ? container.querySelector('#app') : '#app')
}

const initQianKun = () => {
  renderWithQiankun({
      bootstrap() {},
      mount(props) {
          render(props);
      },
      unmount() {
        instance?.unmount()
      },
      update() {}
  })
}

qiankunWindow.__POWERED_BY_QIANKUN__ ? initQianKun() : render({});