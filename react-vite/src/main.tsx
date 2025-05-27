import { StrictMode } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper';
import './index.css'
import App from './App.tsx'


let instance: Root | null = null;

const render = (props: any) => {
  const { container } = props;
  instance = createRoot(container ? container.querySelector('#root') :  document.getElementById('root')!)
  instance.render(
    <StrictMode>
      <App />,
    </StrictMode>
  )
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