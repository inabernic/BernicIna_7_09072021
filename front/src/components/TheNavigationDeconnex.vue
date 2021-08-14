<template>
  <nav id="nav">
    <p class="logo">Goupomania- le meilleur réseau social interne</p>
    <ul class="nav-links">
      <li class="links">
        <router-link to="/">Discutions</router-link>
      </li>
      <li class="links">
        <router-link to="/user">Mon Profil</router-link>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
#nav {
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  background-color: white;
  border-bottom: 1px solid grey;
  z-index: 1;
}

#nav a {
  color: #2c3e50;
  text-decoration: none;
  font-weight: bold;
}

#nav a.vue-activ-link-class {
  color: #42b983;
}

.nav-links {
  display: flex;
}

.links {
  padding-right: 20px;
  list-style: none;
}

.links:hover {
  text-decoration: underline;
}

.logo {
  font-size: 20px;
  color: rgb(14, 185, 85);
  font-weight: bold;
}
</style>