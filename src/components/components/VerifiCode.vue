<template>
    <div class="container my-6">
            
            <form @submit.prevent="" class="box m-auto" style="width:450px;">
            <p class="is-size-2 has-text-centered">Verificacion</p>
            <div class="field">
                <label class="label">Codigo</label>
                <p class="is-size-6">Se ha enviado el codigo a su correo</p>
                <div class="control">    
                    <input v-model="code" id="fcode" class="input" type="number" placeholder="Codigo de Verificacion" />
                </div>
            </div>
            <p class="help is-danger m-2 " v-show="!isCorrect">El codigo es invalido</p>
            <div class="field">
                <button class="button is-info" type="button" @click="sendcode">Enviar</button>
            </div>
        </form>
        </div>
</template>

<script>
import axios from "axios";
import endpoints from '../router/endpoint.js'
import VueCookies from 'vue-cookies'
export default {
    data() {
        return {
            isCorrect:true,
            code: '',
            data:{
                username:'',
                token:'',
                id:0
            }
        }
    },
    mounted(){
    },
    methods:{
        sendcode() {
            axios.post(endpoints.http+'/verificar/'+this.$route.params.id,{
                code:this.code.toString()
            })
            .then((response)=> {
                if(response.data.status){
                    if(response.data.loged){
                        alert('codigo valido')
                        document.getElementById('fcode').classList.remove('is-danger');
                        document.getElementById('fcode').classList.add('is-success');
                        this.isCorrect=true
                        this.data.username = response.data.username
                        this.data.token = response.data.token
                        this.data.id = response.data.cu
                        VueCookies.set('user_data',this.data,'1d');
                        //VueCookies.set('username', response.data.username)
                        this.$router.push('/')
                    }else{
                        this.$router.push('/verificar/login/'+this.$route.params.id)
                    }
                }else{
                    alert('codigo invalido')
                    document.getElementById('fcode').classList.remove('is-success');
                    document.getElementById('fcode').classList.add('is-danger');
                    this.isCorrect=false
                }
            })
            .catch((error)=>console.log(error))
        }
    }
}
</script>