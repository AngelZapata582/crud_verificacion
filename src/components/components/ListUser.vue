<template>
    <div class="container box">
        <div class="m-2">
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
                        <div class="buttons has-addons">
                            <button type="button" class="button is-warning"
                                @click="editar(d.id)">Editar</button>
                            <button type="button" class="button is-danger">Eliminar</button>
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
            rol:0
        };
    },
    methods: {
        listuser() {
            axios.get(endpoints.http + '/list/users')
                .then((response) => this.users = response.data.datos)
                .catch((error) => console.log(error))
        },
        eliminar(d) {
            axios.delete(endpoints.http + '/eliminarusuario/' + d)
                .then((response) => {
                    this.listuser()
                })
                .catch((error) => { console.log(error) })
        },
        editar(d){
            this.$router.push('/editar/user/'+d)
        }
    }
};
</script>
