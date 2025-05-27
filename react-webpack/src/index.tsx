import './public-path'; // 必须在最顶部引入
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

let root: ReactDOM.Root;

// 渲染函数
function render() {
  root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}

// 独立运行时直接渲染
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

// 作为微应用运行时
export const qiankunWindow = window as any;

// 作为微应用运行时
export async function bootstrap() {
  console.log('[react-webpack] 子应用初始化');
}

export async function mount(props: any) {
  console.log('[react-webpack] 子应用挂载', props);
  props.m9MicroEventBus.emit('g-test', { version: '1.0.0' });
  props.m9MicroEventBus.on('g-theme-change', (data: any) => {
    console.log('g-theme-change', data);
  });
  // 传递路由前缀
  if (props.routerBase) {
    // 可以在这里设置路由前缀
  }
  render();
}

export async function unmount() {
  console.log('[react-webpack] 子应用卸载');
  root?.unmount();
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
