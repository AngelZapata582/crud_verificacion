<template>
    <div class="container my-6">
            <form @submit.prevent="" class="box m-auto" style="width:450px;">
            <p class="is-size-2 has-text-centered">Verificacion</p>
            <div class="field">
                <label class="label">Codigo</label>
                <p class="is-size-6">Seleccione el usuario al que le quiere dar permiso</p>
                <div class="control">
                    <label class="label">Usuario</label>    
                    <input v-model="code" id="fcode" class="input" type="number" placeholder="Codigo de Verificacion" />
                </div>
            </div>
            <p class="help is-danger m-2 " v-show="!isCorrect">El codigo es invalido</p>
            <div class="field">
                <button class="button is-info" type="button" @click="sendcode">Generar</button>
            </div>
        </form>
        </div>
</template>

<script>
export default {
    data(){
        return{
            code:0,
            isCorrect:false,
        }
    }
}
</script>