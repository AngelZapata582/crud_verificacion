<template>
    <div class="container">
        <div class="box">
            <div class="has-text-centered">
                <p class="m-4">Introdusca la sala en su telefono</p>
                <b class="has-text-primary is-size-1 m-6">{{room}}</b>
                <p v-show="!isJoined">Esperando conexion con celular ...</p>
                <p class="m-4">Seleccione el siguiente numero en su pantalla</p>
                <b class="has-text-primary is-size-1 m-6">{{code}}</b>
            </div>
        </div>
    </div>
</template>

<script>
import endpoints from '../router/endpoint.js';
import Ws from '@adonisjs/websocket-client'
import axios from 'axios';
import VueCookies from 'vue-cookies';
const ws = Ws('wss://'+endpoints.ws)
export default {
    data(){
        return{
            vcode:0,
            id:0,
            codes:[],
            code:0,
            ws:null,
            isConnected:false,
            isJoined:false,
            room:0,
            data:{
                username:'',
                token:'',
                id:0
            }
        }
    },
    mounted(){
        this.id=this.$route.params.id
        ws.connect()
        ws.on('open',()=>{
            this.room = Math.floor(100000 + Math.random() * 900000)
            const w = ws.subscribe('login:'+this.room)
        w.on('message',(message)=>{
            console.log(message.code)
            console.log(message.vcode)
            if(message == "hello" && this.isConnected){
                w.emit('message',this.codes)
                this.isJoined = true
            }else if(message == "bye") {
                this.isJoined = false
            }

            if(parseInt(message.code) === this.code && parseInt(message.vcode) === this.vcode) {
                axios.post(endpoints.http+'/verify',{
                    id:this.id,
                    vcode:parseInt(message.vcode)
                })
                .then((response)=>{
                    if(response.data.status){
                        this.data.username = response.data.username
                        this.data.token = response.data.token
                        this.data.id = response.data.id
                        VueCookies.set('user_data',this.data,'1d',null,null,true);
                        //VueCookies.set('username', response.data.username)
                        this.$router.push('/')
                    }                 
                })
                .catch((error)=>console.log(error))
            }
            
        })
            for(var i=0;i<3;i++){
                this.codes.push(Math.floor(Math.random() * 100)+1)
            }
            this.code = this.codes[Math.floor(Math.random() * 3)]
            
            this.isConnected = true;
        })
        
        //w.on('new:user',() => {w.emit('message','hello')})
        axios.get(endpoints.http+'/verify/code/'+this.id)
        .then((response) => {
            this.vcode=response.data.code
        })
        .catch((error)=>console.log(error))
    },
    destroy(){
        ws.close()
        ws.on('close',()=>{
            this.isConnected = false;
        })
    }
}
</script>