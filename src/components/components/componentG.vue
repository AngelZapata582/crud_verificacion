<template>
    <navcom/>
    <router-view></router-view>
</template>

<script>
import navcom from "./navbar-page.vue"
export default {
    components:{
        navcom
    }
}
</script>