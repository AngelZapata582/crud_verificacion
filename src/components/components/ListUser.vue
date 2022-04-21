<template>
    <div class="container box">
        <div class="m-2">
            <router-link :to="{name:'newuser'}" class="button is-primary">Agregar</router-link>
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
                <tr v-for="(d,index) in users" :key="index">
                    <td>{{ d.id }}</td>
                    <td>{{ d.Nombre }}</td>
                    <td>{{ d.email }}</td>
                    <td>{{ d.Rol}}</td>
                    <td>
                        <div class="buttons has-addons">
                            <router-link type="button"
                            :to="{name:'edituser',params:{id:d.id}}" 
                            class="button is-warning">Editar</router-link>
                            <button type="button" class="button is-danger">Eliminar</button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    
    
</template>

<script>
import axios from "axios";
export default {
    mounted(){
        axios.get('http://localhost:3333/list/users')
        .then((response)=>this.users = response.data.datos)
        .catch((error)=>console.log(error))
    },
    data() {
        return {
            user:{
                Nombre:'',
                Apellido: '',
                Rol:null,
                email: '',
                password: ''
            },
            users:[]
        };
    },
    methods:{
        
    }
};
</script>
