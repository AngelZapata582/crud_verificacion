<template>
    <div class="container my-6">
        <form @submit.prevent="" class="box m-auto" style="width:650px;">
            <p class="is-size-2 has-text-centered">Autorizacion</p>
            <div class="field">
                <label class="label">Codigo</label>
                <p class="is-size-6">Seleccione el usuario al que le quiere dar permiso</p>
                <div class="control">
                    <label class="label">Usuario</label>
                    <div class="select m-4">
                        <select v-model="selected">
                            <option disabled value="">Seleccione un usuario</option>
                            <option v-for="user in users" :key="user" :value="user.id">
                                {{user.id}} - {{user.Nombre}} - {{user.email}}
                            </option>
                        </select>
                    </div>
                </div>
            </div>
            
            <p class="help is-danger m-2 " v-show="!isCorrect">Algo salio mal</p>
            <div class="field">
                <button class="button is-info" type="button" @click="gencode(selected)">Generar</button>
            </div>
            <div class="field has-text-centered" v-show="isShow">
            <p>Su codigo de permiso es:</p>
            <p class="has-text-primary is-size-3">{{code}}</p>
        </div>
        </form>
    </div>
    <pre>{{selected}}</pre>
</template>

<script>
import endpoints from '../router/endpoint.js';
import axios from 'axios';
export default {
    data() {
        return {
            code: 0,
            isCorrect: true,
            selected: 0,
            users:[],
            isShow:false,
        }
    },
    mounted(){
        axios.get(endpoints.http+'/list/users')
        .then((response) => {
            this.users = response.data.datos
        })
        .catch((error) => {console.log(error)})
    },
    methods: {
        gencode(id) {
            console.log(id)
            this.code = Math.floor(100000 + Math.random() * 900000)
            axios.post(endpoints.http+'/save/authorization',{
                user_id:id,
                code:this.code
            })
            .then((response) => {
                if(response.data.status){
                    this.isShow=true
                }
            })
            .catch((error)=>{
                console.log(error)
                this.isShow = false
                this.isCorrect = false;
            })
        }
    }
}
</script>