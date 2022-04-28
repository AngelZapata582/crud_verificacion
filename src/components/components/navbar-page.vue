<template>
    <navbar class="navbar is-dark p-2" role="navigation">
        <div class="navbar-brand">
            <a href="/">
                <img class="image is-48x48" src="../../assets/logo.svg" />
            </a>
        </div>
        <div class="navbar-menu">
            <div class="navbar-end">
                <button class="button is-primary my-auto mx-4" @click="logout"> Cerrar sesion</button>
                <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link">
                        Menu
                    </a>
                    <div class="navbar-dropdown">
                        <a class="navbar-item" href="/administracion" v-if="isShow">
                            Administracion
                        </a>
                        <a class="navbar-item" href="/usuarios">
                            Usuarios
                        </a>
                    </div>
                </div>
                <div class="mx-2 my-auto">
                    Bienvenido {{ user }}
                </div>
            </div>
        </div>
    </navbar>
</template>

<script>
import endpoints from '../router/endpoint.js';
import VueCookies from 'vue-cookies';
import axios from 'axios'
export default {
    data() {
        return {
            user: VueCookies.get('user_data').username,
            rol:0,
            isShow:false
        }
    },
    mounted(){
        axios.get(endpoints.http+'/get/level/'+VueCookies.get('user_data').id)
        .then((response) => {
            axios.get(endpoints.http+'/ip')
            .then((res)=>{
                if(response.data >= 3 && res.data.ip == "137.184.114.118"){
                this.isShow = true}
            })
            .catch((error) => {console.log(error)})
        })
        .catch((error) => {console.error(error)})
    },
    methods: {
        logout(){
            VueCookies.remove('user_data')
            window.location.reload();
        }
    }
}
</script>