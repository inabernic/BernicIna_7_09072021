<template>
    <nav id="nav">
      <img class="logo" :src="require('@/assets/icon-left-font.png')" alt="Logo"/>
      <ul class="nav-links">
        <li class="links">
          <router-link to="/">Authentification</router-link>
        </li>
        <li class="links">
          <router-link to="/register">Inscription</router-link>
        </li>
      </ul>
    </nav>
</template>

<style scoped>

</style>