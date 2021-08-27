<template>
  <div class="register">
    <h1>Veuillez créer votre compte :</h1>
    <form @submit.prevent="inscription" autocomplete="off">
      <div class="form">
        <input
          v-model="firstName"
          type="text"
          name="firstName"
          class="input"
          placeholder="Entrez votre prenom"
          required
        />
        <input
          v-model="lastName"
          type="text"
          name="lastName"
          class="input"
          placeholder="Entrez votre nom"
          required
        />
        <input
          v-model="email"
          type="email"
          name="email"
          class="input"
          placeholder="Entrez votre e-mail"
          required
        />
        <input
          v-model="password"
          type="password"
          class="input"
          placeholder="Entrez votre mot de passe"
          required
        />
        <input
          v-model="password"
          type="password"
          class="input"
          placeholder="Confirmer votre mot de passe"
          required
        />
        <button type="submit" class="btn">Créer mon compte</button>
        <p id="message"></p>
      </div>
    </form>
  </div>
</template>

<script>
import store from "@/store";
export default {
  data() {
    return {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
    };
  },
  methods: {
    async inscription() {
      let json = await store.inscription(
        this.firstName,
        this.lastName,
        this.email,
        this.password
      );
      if (json) {
        localStorage.user = JSON.stringify({
          userId: json.user.id,
          firstName: json.user.firstName,
        });
        localStorage.token = json.token;
        //ou aller apres inscription
        const redirectPath = this.$route.query.redirect || "/";
        this.$router.push(redirectPath);
      } else {
        document.getElementById("message").innerText = "Connexion impossible";
      }
    },
  },
};
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: 0 auto;
}
#message {
  color: red;
}
</style>