<template>
  <div class="login">
    <h1>Login</h1>
    <div class="form">
      <label for="email">Email</label>
      <input v-model="email" type="email" name="email" class="input" required />
      <label for="password">Password</label>
      <input v-model="password" type="password" class="input" required />
      <button @click="login()" class="btn">Login</button>
      <p id="message"></p>
    </div>
  </div>
</template>

<script>
import store from "@/store";
export default {
  data() {
    return {
      email: null,
      password: null,
    };
  },
  methods: {
    async login() {
      let json = await store.login(this.email, this.password);
      console.log(json);
      if (json) {
        localStorage.user = JSON.stringify({
          userId: json.user.id,
          firstName: json.user.firstName,
          lastName: json.user.lastName,
          isAdmin: json.user.isAdmin,
        });
        localStorage.token = json.token;

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
