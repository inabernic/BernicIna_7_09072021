<template>
  <div class="home">
    <h1><router-link to="/new"><button class="btn btn-outline-success btn-sm">Ajouter un nouveau post</button> </router-link></h1>
    <p id="message"></p>
    <div class="row row-cols-1 row-cols-md-2 g-4">
      <div v-for="post in posts" :key="post.id" class="col">
          <Post :post="post" />
      </div>
    </div>
  
  </div>
</template>

<script>
// @ is an alias to /src
import store from "@/store.js";
import Post from "./Post";

export default {
  name: "Home",
  components: { Post },
  data() {
    return {
      posts: [],
    };
  },
  async created() {
    this.posts = await store.getAllPosts();
  },
  methods: {},
};
</script>

<style scoped>
.title {
  text-align: center;
}
.home {
  max-width: 1400px;
  margin: 0 auto;
}
img {
  max-width: 200px;
}
.posts {
  display: block;
  align-content: left;
}
</style>
