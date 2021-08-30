<template>
  <nav id="nav">
    <img
      class="logo"
      :src="require('@/assets/icon-left-font.png')"
      alt="Logo"
    />
    <ul class="nav-links">
      <li class="links btn btn-light">
        <router-link to="/">Discutions</router-link>
      </li>
      <li class="links btn btn-light">
        <router-link to="/user">Mon Profil</router-link
        >
      </li>
      <li class="links">

      </li>
          <div id="logoutButton">
          <small>log out</small>
          <button @click="logOut" type="button" class="btn btn-close" aria-label="Close"></button>
        </div>
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
#logoutButton small{
  line-height: 1.5pt;
  vertical-align: middle;
  text-decoration: none;
}
</style>
