import {createWebHistory, createRouter} from 'vue-router';
import listproducts from '../components/Main.vue';
import cg from '../components/componentG.vue';
import pnf from '../components/PageNotFound.vue';
import app from '../../App.vue';
import login from '../components/Login-page.vue';
import listuser from '../components/ListUser.vue';
import newuser from '../components/NewUser.vue';
import edituser from '../components/EditUser.vue';
//import newproduct from '../components/NewProduct.vue';
import verificarcode from '../components/VerifiCode.vue';
import verificarlogin from '../components/VerifyLogin.vue';
import VueCookies from 'vue-cookies';
import gencode from '../components/GenCode.vue';
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', component:cg,beforeEnter(){
            if(!VueCookies.get('user_data')){
                return {name: 'login'}
            }else{return true}
        } ,children: [
            {path:'/:catchAll(.*)',component:pnf,name:'NotFound'},
            {path: '/administracion', component:gencode, name:'administracion'},
            {path: '/usuarios', component:listuser, name:'listusuarios'},
            {path: '/nuevo/usuario', component:newuser, name:'newuser'},
            //{path: '/nuevo/producto', component:newproduct, name:'newproduct'},
            {path: '/editar/user/:id', component:edituser, name:'edituser'}
            
        ]},
        {path: '/login', component:login, name:'login',beforeEnter(){
            if(VueCookies.get('user_data')){
                return {path: '/'}
            }else{return true}
        }},
        {path: '/verificar/:id', component:verificarcode, name:'verificarcode',beforeEnter(){
            if(VueCookies.get('user_data')){
                return {path: '/'}
            }else{return true}
        }},
        {path: '/verificar/login/:id', component:verificarlogin, name:'verificarlogin',beforeEnter(){
            if(VueCookies.get('user_data')){
                return {path: '/'}
            }else{return true}
        }}
    ]
})

export default router