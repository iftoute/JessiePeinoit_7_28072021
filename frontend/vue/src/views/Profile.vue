<template>
  <div class="card">
    <h1 class="card__title">Mon profil</h1>
    <div class="profile__photo">

      <div class="profile__photo__modify">
        <button
          @click="uploadFile"
          type="button"
          class="profile__photo__modify__btnInvisible"
        >
          <i class="far fa-edit"></i> Modifier ma photo de profil
        </button>
        <input
          type="file"
          ref="fileUpload"
          @change="onFileSelected"
          accept="image/*"
          id="file-input"
          aria-label="Modifier ma photo de profil"
        />
      </div>
    </div>
    <div class="profile__info">
      <p class="profile__info__title">Pseudo</p>
      <div class="profile__info__text">{{ user.username }}</div>
      <p class="profile__info__title">Email</p>
      <div class="profile__info__text">{{ user.email }}</div>
    </div>

    <button @click="modifyProfile" class="profile__smallButton">
      Enregister <i class="fas fa-check"></i>
    </button>

    <div class="form-row">
      <button @click="logout" class="button">
        Déconnexion
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Profile",
      data: function () {
    return {
        userName: '',
        email: '',
        password: '',
      }
  },
  mounted: function() {
    console.log(this.$store.state.user);
    console.log(this.$store.state.user.email);
    console.log(this.$store.state.userInfos);

    if (this.$store.state.user.userId == -1) {
      this.$router.push("/");
      return;
    }
    this.$store.dispatch("getUserInfos");
  },
  computed: {
    ...mapState({
      user: "userInfos",
    }),
  },
  methods: {
    logout: function() {
      this.$store.commit("logout");
      this.$router.push("/");
    },
  }
}
</script>

<style scoped></style>>
