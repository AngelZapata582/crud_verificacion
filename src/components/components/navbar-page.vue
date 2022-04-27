<template>
    <navbar class="navbar is-dark p-2" role="navigation">
        <div class="navbar-brand">
            <img class="image is-48x48" src="../../assets/logo.svg" />
        </div>
        <div class="navbar-menu">
            <div class="navbar-end">
                
                <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link">
                        Menu
                    </a>
                    <div class="navbar-dropdown">
                        <a class="navbar-item" href="/administracion">
                            Administracion
                        </a>
                        <a class="navbar-item" href="/usuarios">
                            Usuarios
                        </a>
                    </div>
                </div>
                <div class="mx-2 my-auto">
                    Bienvenido {{ user }}
                </div>
            </div>
        </div>
    </navbar>
</template>

<script>
export default {
    data() {
        return {
            user: 'user 3'
        }
    }
}
</script>