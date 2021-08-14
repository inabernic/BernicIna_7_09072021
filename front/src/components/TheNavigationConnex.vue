<template>
  <div>
    <div class="logo">Goupomania- le meilleur réseau social interne</div>
    <nav id="nav">
      <ul class="nav-links">
        <li class="links">
          <router-link to="/">Authentification</router-link>
        </li>
        <li class="links">
          <router-link to="/user">Inscription</router-link>
        </li>
      </ul>
    </nav>
  </div>
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
  padding-inline-start: 0px;
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.links {
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