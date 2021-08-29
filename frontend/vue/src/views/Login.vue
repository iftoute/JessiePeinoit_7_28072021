<template>
   <div class="card">
    <div class="card__logo">
      <img src="../assets/icon-above-font.png" alt="logo de Groupomania" id="cardLogo">
      <h1>Ensemble, restons connectés</h1>
    </div>
    <h2 class="card__title" v-if="mode == 'login'">Connexion</h2>
    <h2 class="card__title" v-else>Inscription</h2>
    <p class="card__subtitle" v-if="mode == 'login'">Vous n'avez pas encore de compte ? <a class="card__action" @click="switchToCreateAccount()">Créer un compte</a></p>
    <p class="card__subtitle" v-else>Vous avez déjà un compte ? <a class="card__action" @click="switchToLogin()">Se connecter</a></p>
    <div class="form-row">
      <input v-model="email" class="form-row__input" type="text" placeholder="Adresse mail"/>
    </div>
    <div class="form-row" v-if="mode == 'create'">
      <input v-model="userName" class="form-row__input" type="text" placeholder="Pseudo"/>
    </div>
    <div class="form-row">
      <input v-model="password" class="form-row__input" type="password" placeholder="Mot de passe"/>
    </div>
    <div class="form-row alert alert-danger alert-dismissible fade show" v-if="mode == 'login' && status == 'error_login'">
        <span class="" role="alert">
            Adresse et/ou mot de passe invalide
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </span>
    </div>
        <div class="form-row alert alert-danger alert-dismissible fade show" v-if="mode == 'create' && status == 'error_signup'">
        <span class="" role="alert">
            Adresse mail déjà utilisée
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </span>
    </div>

    <div class="form-row">
      <button @click="login()" class="button btn btn-primary" v-if="mode == 'login'">
          <span v-if="status == 'loading'">Connexion en cours...</span>
          <span v-else>Connexion</span>
      </button>
      <button @click="signup()" class="button btn btn-primary" v-else>
        <span v-if="status == 'loading'">Création en cours...</span>
        <span v-else>Créer mon compte</span>
      </button>
        <span></span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

  export default {
    name: 'Login',
    data: function () {
    return {
        mode: 'login',
        userName: '',
        email: '',
        password: '',
    }
    },
    mounted: function () {
        if (this.$store.state.user.userId != -1) {
            this.$router.push('/profile');
            return
        }
    },
    computed: {
        ...mapState(['status'])
    },
    methods: {
        switchToCreateAccount: function () {
        this.mode = 'create';
        },
        switchToLogin: function () {
        this.mode = 'login';
        },
        login: function () {
            const self = this
            this.$store.dispatch('login', {
                email: this.email,
                password: this.password
            }).then(function() {
                self.$router.push('/profile')
            }), function(error) {
                console.log(error)
            }
        },
        signup: function () {
            const self = this
            this.$store.dispatch('signup', {
                email: this.email,
                userName: this.userName,
                password: this.password
            }).then(function() {
                self.login()
            }), function(error) {
                console.log(error);
            }
        },
    }
  }
</script>

<style>
  body {
    background-image: linear-gradient(62deg, #fcb4a4 0%, #fcecec 100%);
}
.form-row {
    display: flex;
    margin: 16px 0px;
    gap:16px;
    flex-wrap: wrap;
  }
  .form-row__input {
    padding:8px;
    border: none;
    border-radius: 8px;
    background:#fcecec;
    font-weight: 500;
    font-size: 16px;
    flex:1;
    min-width: 100px;
    color: black;
  }
  .form-row__input::placeholder {
    color:#aaaaaa;
  }
  #cardLogo {
    display: flex;
    margin: auto;
  }
  h1 {
    text-align: center;
    font-size: 30px;
    color: #fc9a84;
    margin-bottom: 30px;
  }
</style> 