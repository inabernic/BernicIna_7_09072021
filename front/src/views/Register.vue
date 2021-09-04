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
          placeholder="Prenom *"
          required
        />
        <input
          v-model="lastName"
          type="text"
          name="lastName"
          class="input"
          placeholder="Nom *"
          required
        />
        <input
          v-model="email"
          type="email"
          name="email"
          class="input"
          placeholder="E-mail *   'example@example.com'"
          required
        />
        <input
          v-model="password"
          type="password"
          :class="{ 'border border-danger': error}"
          class="input"
          placeholder="Mot de passe * "
          required
        />
        <button type="submit" class="btn btn-success">Créer mon compte</button>

        <p id="message">{{ error }}</p>
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
      error: null,
    };
  },
  methods: {
    async inscription() {
      const password_regex =
        /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/;

      if (!password_regex.test(this.password)) {
        this.error =
          "Le mot de passe doit contenir: 1 Majuscule, 1 minuscule, 1 ciffre, 1 caracetr spècial, min 8 caracteres";
        return;
      }

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
        document.getElementById("message").innerText =
          "Creation du compte impossible !";
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
