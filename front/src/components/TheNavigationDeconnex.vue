<template>

  <nav id="nav">
      <img class="logo" :src="require('@/assets/icon-left-font.png')" :alt="Logo"/>
    <ul class="nav-links">
      <li class="links">
        <router-link to="/">Discutions</router-link>
      </li>
      <li class="links">
        <router-link to="/user">Mon Profil</router-link>
      </li>
    </ul>
      <div id="logoutButton">
        <button @click="logOut" class="btn logout">Log out</button>
      </div>
  </nav>
</template>

<script>
export default {
  methods: {
    logOut() {
      localStorage.clear();
      this.$router.go();
    },
  },
};
</script>

<style scoped>

</style>