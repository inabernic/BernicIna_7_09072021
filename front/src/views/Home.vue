<template>
  <div class="home">
     <div id="mybutton">
      <button @click="logOut" class="btn logout">Log out</button>
    </div>
    <h1 class="title">Goupomania- le meilleur réseau social interne </h1>

    <div class="posts">
      <div v-for="post in posts" :key="post.id">
        <router-link :to="{ name: 'PostDetail', params: { post: post, postId: post.id.toString() } }">
          <Post :post="post" />
        </router-link>
      </div>
    </div>
    <p id="message"></p>
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
  methods: {
    logOut() {
      localStorage.clear();
      this.$router.go();
    },
  },
};
</script>

<style scoped>
.title{
  text-align: left;
}
.home {
  max-width: 1400px;
  margin: 0 auto;
}
img {
  max-width: 200px;
}
.posts {
  display:block;
  align-content: left;
}
a {
  color: rgb(77, 127, 235);
  text-decoration: none;
}
a:hover,
a:visited {
  text-decoration: underline;
}
.logout {
  background-color : red;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  border-color: rgb(124, 18, 18);
}
#mybutton {
  position: fixed;
  bottom: -4px;
  right: 10px;
}
</style>


