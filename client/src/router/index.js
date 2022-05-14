import routes from './modules/home/index.js';
import { createRouter, createWebHistory } from 'vue-router';


const routers = createRouter({
    history: createWebHistory(),
    routes
})

export default routers;