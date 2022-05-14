import { createApp } from 'vue';
import App from './App.vue';
import '../style/index.scss';
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import router from "./router/index.js";
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
// 
const app = createApp(App)
app.use(router).use(ElementPlus).mount('#app')