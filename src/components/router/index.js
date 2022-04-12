import {createWebHistory, createRouter} from 'vue-router';
import listproducts from '../components/Main.vue';
import cg from '../components/componentG.vue';
import pnf from '../components/PageNotFound.vue';
import app from '../../App.vue';
import login from '../components/Login-page.vue';
import listuser from '../components/ListUser.vue';
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '', component:cg, children: [
            {path:'/:catchAll(.*)',component:pnf,name:'NotFound'},
            {path: '/productos', component:listproducts, name:'listproducts'},
            {path: '/usuarios', component:listuser, name:'listuser'}
        ]},
        {path: '/login', component:login, name:'login'}
    ]
})

export default router