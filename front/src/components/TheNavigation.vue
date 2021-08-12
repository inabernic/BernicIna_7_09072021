<template>
  <nav id="nav">
    <p class="logo">Goupomania_ le meilleur site</p>
    <ul class="nav-links">
      <li class="links">
        <router-link to="/">Home</router-link>
      </li>
      <li
        v-for="post in posts"
        :key="post.name"
        class="links"
      >
        <router-link :to="{
            name: 'PostDetail',
            params: { id: post.id },
          }"
        >
          {{ post.name }}
        </router-link>
      </li>
      <li class="links">
        <router-link to="/user">Connexion</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import store from "@/store";
export default {
  data() {
    return {
      postId: this.$route.params.id,
      posts: store.posts,
    };
  },
};
</script>

<style scoped>
#nav {
  display: flex;
  align-items:center ;
  position: sticky;
  top: 0;
  background-color:white ;
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
  color: purple;
  font-weight: bold;
}
</style>