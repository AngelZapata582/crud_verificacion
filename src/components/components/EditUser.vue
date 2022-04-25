<template>
    <form class="box m-auto" style="width:450px;">
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
                        <button class="button is-info" @click="agregar()">Enviar</button>
                    </div>
                </form>
</template>
<script>
import axios from "axios";
import endpoints from '../router/endpoint.js'
export default {
    mounted(){
        this.getuser(this.$route.params.id)
    },
    props:{
        valueid:0
    },
    data() {
        return {
            user:{}
        };
    },
    methods:{
        async getuser(id){
            await axios.get(endpoints.http+'/user/'+id)
            .then((response)=>{
                this.user = response.data.user
            })
            .catch((error)=>console.log(error))
        },
        edituser(){
            /*axios.put(endpoints.http+'/actualizarusuario/'+this.$route.params.id.{

            })*/
        }
        
    }
};

</script>