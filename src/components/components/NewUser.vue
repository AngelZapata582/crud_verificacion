<template>
    <form @submit.prevent="agregar" class="box m-auto" style="width:450px;">
        <div class="field">
            <label class="label">Nombre</label>
            <div class="control">
                <input v-model="user.Nombre" class="input" type="text" placeholder="Nombre" />
            </div>
        </div>

        <div class="field">
            <label class="label">Rol</label>
            <div class="control">
                <input v-model="user.Rol" class="input" type="number" placeholder="Edad" />
            </div>
        </div>
        <div class="field">
            <label class="label">Email</label>
            <div class="control">
                <input v-model="user.email" class="input" type="text" placeholder="Email" />
            </div>
        </div>
        <div class="field">
            <label class="label">Password</label>
            <div class="control">
                <input v-model="user.password" class="input" type="password" placeholder="Password" />
            </div>
        </div>
        <div class="field">
            <button class="button is-info">Enviar</button>
        </div>
    </form>
</template>
<script>
import axios from "axios";
export default {
    mounted() {
        
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
            users: []
        };
    },
    methods: {
        agregar() {
            axios.post('http://localhost:3333/users',this.user)
            .then(() => alert('usuario agregado'))
            .catch((error) => console.log(error))
        },
        editar() {

        }
    }
};

</script>