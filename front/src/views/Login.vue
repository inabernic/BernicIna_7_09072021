<template>
  <div class="login">
    <h1>Login</h1>
    <div class="form">
      <label for="email">Email</label>
      <input v-model="email" type="email" name="email" class="input" />
      <label for="password">Password</label>
      <input v-model="password" type="password" class="input" />
      <button @click="login()" class="btn">Login</button>
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
      const resp = await fetch('http://localhost:3000/api/users/login', {
        method : 'POST',
        headers : {
          'Content-type' : 'application/json',
        },
        body : JSON.stringify({email: this.email,
                               password: this.password }),
      });
      const token = await resp.json();
      console.log(token);
      store.user=token.user;
      localStorage.token = JSON.stringify(token.token); 

      const redirectPath = this.$route.query.redirect || "/";
      this.$emit("connect");
      this.$router.push(redirectPath);
    },
  },
  emits: ["connect"]
};
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: 0 auto;
}
</style>