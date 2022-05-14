import {flatRoute} from '../../module.js'
const routes = [
    {
        path: '/',
        redirect:  { 
            name: 'home' 
        }
    },
    {
        name: 'home',
        path: '/home',
        component: () => import('../../../views/Home/index.vue')
    }
]

export default flatRoute(routes, []);