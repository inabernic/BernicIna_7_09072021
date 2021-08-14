<template>
  <div class="login">
    <h1>Login</h1>
    <div class="form">
      <label for="email">Email</label>
      <input v-model="email" type="email" name="email" class="input" required />
      <label for="password">Password</label>
      <input v-model="password" type="password" class="input" required/>
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
      // Authenticate against API
      const resp = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email: this.email, password: this.password }),
      });
      const json = await resp.json();
      if (resp.ok) {
        store.user = json.user;
        localStorage.token = json.token;
        const redirectPath = this.$route.query.redirect || "/";
        this.$emit("connect");
        this.$router.push(redirectPath);
      } else {
        console.log(json.error);
        document.getElementById('message').innerText="Connexion impossible";
      }
    },
  },
  emits: ["connect"],
};
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: 0 auto;
}
#message{
  color: red;
}
</style>