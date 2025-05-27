import { createBrowserRouter } from "react-router";
import Home from "../views/Home";
import About from "../views/About";
import Layout from "../views/Layout";
import { qiankunWindow } from "vite-plugin-qiankun/dist/helper";
  
const router = createBrowserRouter([
    {
        path: "/",
        Component: Layout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: "about",
                Component: About,
            },
        ]
    }
], {
    basename: qiankunWindow.__POWERED_BY_QIANKUN__ ? '/react-vite' : '/'
});
  
export default router