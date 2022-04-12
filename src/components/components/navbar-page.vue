<template>
    <navbar class="navbar is-dark p-2" role="navigation">
        <div class="navbar-brand">
            <img class="image is-48x48"  src="../../assets/logo.svg"/>
        </div>
        <div class="navbar-menu">
            <div class="navbar-end">
                <div class="select is-primary mx-2 my-auto">
                    <select v-model="selected">
                        <option @click="click(selected)">productos</option>
                        <option @click="click(selected)">usuarios</option>
                    </select>
                </div>
                <div class="mx-2 my-auto">
                    Bienvenido {{user}}
                </div>
            </div>
        </div>
    </navbar>
</template>

<script>
export default {
    data(){
        return{
            selected:'productos',
            user:'user 3'
        }
    },
    methods: {
        click(v){
            console.log(v)
        }
    }
}
</script>