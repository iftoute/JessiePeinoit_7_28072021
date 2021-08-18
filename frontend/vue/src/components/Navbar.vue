<template>  
    <div id="app">
        <nav class="navbar navbar-expand-lg navbar-light nav">
            <img class="nav__logo" src="../assets/icon-above-font.png" alt="Logo de Groupomania">

            <button class="navbar-toggler justify-content-center nav__menuButton" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <i class="fa fa-bars"></i>
            </button>
            
            <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                <ul class="navbar-nav nav__links">
                    <li class="nav-item">
                        <router-link to="/post" class="nav__links__link">Accueil</router-link> 
                    </li>

                    <li class="nav-item">
                        <router-link to="/profile" class="nav__links__link">Mon profil</router-link>
                    </li>

                    <li class="nav-item">
                        <ModaleLogout v-bind:revele="revele" v-bind:displayModale='displayModale'/>
                        <button @click="displayModale" class="nav__links__logoutLink">Déconnexion <i class="fas fa-sign-out-alt"></i></button>    
                    </li>
                </ul>
            </div>
        </nav>

        <router-view/>
    </div>
</template>

<script>
    

    export default {
        name: 'Navbar',
        data(){
            return {
                revele: false
            }
        },
        components: {
            
        },
        methods: {
            // Permet d'afficher la boîte modale de déconnexion 
            displayModale() {
                this.revele = !this.revele
            }
        }
    }
</script>

<style scoped lang="scss">
    
</style>