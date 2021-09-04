<template>
  <nav id="nav">
    <img
      class="logo"
      :src="require('@/assets/icon-left-font.png')"
      alt="Logo"
    />
    <ul class="nav-links">
      <li class="links btn btn-light">
        <router-link to="/">Discussions</router-link>
      </li>
      <li class="links btn btn-light">
        <router-link to="/user">Mon Profil</router-link
        >
      </li>
      <li class="links"></li>
      
          <button @click="logOut" type="button" class="btn btn-danger" >Log out</button>
    </ul>
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
