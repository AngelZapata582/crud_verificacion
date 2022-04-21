<template>
    <div class="container my-6">
            
            <form class="box m-auto" style="width:450px;">
            <p class="is-size-2 has-text-centered">Verificacion</p>
            <div class="field">
                <label class="label">Codigo</label>
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
export default {
    data() {
        return {
            isCorrect:true,
            code: ''
        }
    },
    mounted(){
    },
    methods:{
        sendcode() {
            axios.post(endpoints+'/verificar/'+this.$route.params.id,{
                code:this.code.toString()
            })
            .then((response)=> {
                if(response.data.status){
                    alert('codigo valido')
                    document.getElementById('fcode').classList.remove('is-danger');
                    document.getElementById('fcode').classList.add('is-success');
                    this.isCorrect=true
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