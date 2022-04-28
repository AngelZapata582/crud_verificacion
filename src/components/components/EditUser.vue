<template>
    <form @submit.prevent="" class="box m-auto" style="width:450px;">
        <div class="field">
            <label class="label">Nombre</label>
            <div class="control">
                <input v-model="user.Nombre" class="input" type="text" placeholder="Nombre" />
            </div>
        </div>

        <div class="field">
            <label class="label">Rol</label>
            <div class="control">
                <input v-model="user.Rol" class="input" type="number" placeholder="Rol" />
            </div>
        </div>
        <div class="field">
            <label class="label">Email</label>
            <div class="control">
                <input v-model="user.email" class="input" type="text" placeholder="Email" />
            </div>
        </div>
        <div class="field">
            <button class="button is-info" @click="edituser(user.id)">Enviar</button>
        </div>
    </form>

    <div id="verify-model" class="modal">
        <div class="modal-background"></div>

        <div class="modal-content">
            <div class="box">
                <p>No tiene suficiente nivel para esta accion</p>
                <div style="width:600px">
                    <form @submit.prevent="" class="box m-auto" style="width:450px;">
                        <div class="field">
                            <label class="label">Codigo</label>
                            <div class="control">
                                <input v-model="code" class="input" type="number" placeholder="Codigo" />
                            </div>
                        </div>
                        <div class="field">
                            <button class="button is-info" @click="verificarRol()">Verificar</button>
                            <button class="button is-danger mx-4" @click="this.$router.back()">Cancelar</button>
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
import endpoints from '../router/endpoint.js'
import VueCookies from "vue-cookies";

export default {
    mounted() {
        const id = VueCookies.get('user_data').id
        axios.get(endpoints.http+'/get/level/'+id)
        .then((response)=>{
            if (response.data < 3){
                document.getElementById('verify-model').classList.add('is-active');
            }
        })
        .catch((error)=>{console.log(error)})
    },
    props: {
        valueid: 0
    },
    data() {
        return {
            user: {},
            code:0
        };
    },
    methods: {
        async getuser(id) {
            await axios.get(endpoints.http + '/user/' + id)
                .then((response) => {
                    this.user = response.data.user
                })
                .catch((error) => console.log(error))
        },
        edituser() {
            axios.put(endpoints.http+'/actualizarusuario/'+this.$route.params.id,{
                id:+this.$route.params.id,
                Nombre:this.user.Nombre,
                Rol:this.user.Rol,
                email: this.user.email
            })
            .then(() => {this.$router.back()})
            .catch((error) => console.log(error))
        },
        verificarRol() {
            axios.post(endpoints.http+'/verify/authorization',{
                user_id:VueCookies.get('user_data').id,
                code:this.code
            })
            .then((response) =>{
                document.getElementById('verify-model').classList.remove('is-active')
                this.getuser(this.$route.params.id)
            })
            .catch((error) => console.log(error))
            //document.getElementById('verify-model').parentNode.removeChild(document.getElementById('verify-model'))
        }

    }
};

</script>