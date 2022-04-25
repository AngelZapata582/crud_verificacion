<template>
    <div class="container my-6">

        <form class="box m-auto" style="width:450px;">
            <p class="is-size-2 has-text-centered">Login</p>
            <div class="field">
                <label class="label">Email</label>
                <div class="control">
                    <input v-model="user.email" id="femail" class="input" type="text" placeholder="Email" />
                </div>
            </div>
            <div class="field">
                <label class="label">Password</label>
                <div class="control">
                    <input v-model="user.password" id="fpassword" class="input" type="password"
                        placeholder="Password" />
                </div>
            </div>
            <p class="help is-danger m-2 " v-show="!isCorrect">This email is invalid</p>
            <div class="field">
                <button class="button is-info" type="button" @click="login">Enviar</button>
            </div>
        </form>
    </div>
</template>

<script>
import axios from "axios";
import endpoints from '../router/endpoint.js'
import VueCookies from "vue-cookies";
export default {
    data() {
        return {
            isCorrect: true,
            user: {
                email: "",
                password: ""
            }
        }
    },
    methods: {
        async login() {
            axios.post(endpoints.http + '/Login', {
                email: this.user.email,
                password: this.user.password
            })
                .then((response) => {
                    alert('Ha iniciado sesion')
                    document.getElementById('femail').classList.add('is-success');
                    document.getElementById('fpassword').classList.add('is-success');
                    this.isCorrect = true
                    if (response.data.status) {
                        VueCookies.set('token', response.data.token)
                        this.$router.push('/')
                    } else {
                        this.secondverify(response.data.data)
                    }
                })
                .catch(() => {
                    document.getElementById('femail').classList.add('is-danger');
                    document.getElementById('fpassword').classList.add('is-danger');
                    this.isCorrect = false
                })
        },
        secondverify(id) {
            axios.get(endpoints.http + '/get/level/' + id)
                .then((response) => {
                    if (response.data >= 2) {
                        this.$router.push('/verificar/' + id)
                    }
                })
                .catch((error) => { console.log(error.message) })
        }
    }
}
</script>
