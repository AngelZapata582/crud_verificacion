<template>
    <div class="container box">
        <div class="m-2" id="btn_add">
            <router-link :to="{ name: 'newuser' }" class="button is-primary">Agregar</router-link>
        </div>
        <table class="table mx-auto">
            <thead>
                <tr>
                    <th>Numero</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Rol</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(d, index) in users" :key="index" v-show="d.Rol < 3">
                    <td>{{ d.id }}</td>
                    <td>{{ d.Nombre }}</td>
                    <td>{{ d.email }}</td>
                    <td>{{ d.Rol }}</td>
                    <td>
                        <div class="buttons has-addons" >
                            <button type="button" id="btn_edit" class="button is-warning"
                                @click="editar(d.id)">Editar</button>
                            <button type="button" id="btn_delete" @click="eliminar(d.id)" class="button is-danger">Eliminar</button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <div id="verify-model" class="modal">
        <div class="modal-background"></div>

        <div class="modal-content">
            <div class="box">
                <p>No tiene suficiente nivel para esta accion.</p>
                <p>Contacte a un administrador para pedir un codigo de autorizacion.</p>
                <div style="width:600px">
                    <form @submit.prevent="" class="box m-auto" style="width:450px;">
                        <div class="field">
                            <label class="label">Codigo</label>
                            <div class="control">
                                <input v-model="code" class="input" type="number" placeholder="Codigo" />
                            </div>
                        </div>
                        <p class="has-text-danger" v-show="!isCorrect">Codigo incorrecto</p>
                        <div class="field">
                            <button class="button is-info" @click="verificarRol()">Verificar</button>
                            <button class="button is-danger" @click="cerrarModal()">Cancelar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <button class="modal-close is-large" aria-label="close"></button>
    </div>

</template>

<script>
import axios from "axios";
import endpoints from '../router/endpoint.js';
import VueCookies from 'vue-cookies';
export default {
    mounted() {
        axios.get('http://api.animex.click/ip')
        .then((response)=>{console.log(response.data)})
        .catch((error)=>{console.log(error)})
        axios.get(endpoints.http+'/get/level/'+VueCookies.get('user_data').id)
        .then((response) => {this.rol=response.data})
        .catch((error) => {console.error(error)})
        this.listuser()
    },
    data() {
        return {
            user: {
                Nombre: '',
                Apellido: '',
                Rol: null,
                email: '',
                password: ''
            },
            isCorrect: true,
            users: [],
            rol: 0,
            idd:0
        };
    },
    methods: {
        cerrarModal(){
            document.getElementById('verify-model').classList.remove('is-active')
        },
        async listuser() {
            await axios.get(endpoints.http + '/list/users')
                .then((response) => this.users = response.data.datos)
                .catch((error) => console.log(error))
        },
        eliminar(d) {
            console.log(d)
            if(this.rol<3){
                document.getElementById('verify-model').classList.add('is-active')
                this.idd=d
            }else{
                axios.delete(endpoints.http + '/eliminarusuario/'+d)
                .then(() => {
                    this.listuser()
                })
                .catch((error) => { console.log(error) })
            }
        },
        editar(d) {
            this.$router.push('/editar/user/' + d)
        },
        verificarRol() {
            console.log(this.idd)
            axios.post(endpoints.http+'/verify/authorization',{
                user_id:VueCookies.get('user_data').id,
                code:this.code
            })
            .then((response) =>{
                
                axios.delete(endpoints.http + '/eliminarusuario/'+this.idd)
                .then((response) => {
                    document.getElementById('verify-model').classList.remove('is-active')
                    this.listuser()
                })
                .catch((error) => { console.log(error) })
            })
            .catch((error) => console.log(error))
            //document.getElementById('verify-model').parentNode.removeChild(document.getElementById('verify-model'))
        }
    }
};
</script>
