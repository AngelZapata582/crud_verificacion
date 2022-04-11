import {createWebHistory, createRouter} from 'vue-router';
import main from '../components/Main.vue';
import cg from '../components/componentG.vue';
import pnf from '../components/PageNotFound.vue';
import app from '../../App.vue';
import login from '../components/Login-page.vue';
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '', component:cg, children: [
            {path:'/:catchAll(.*)',component:pnf,name:'NotFound'},
            {path: '', component:main, name:'home'}
        ]},
        {path: '/login', component:login, name:'login'}
    ]
})

export default router