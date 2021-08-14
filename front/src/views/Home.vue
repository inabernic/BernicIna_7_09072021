<template>
  <div class="home">
    <h1>All posts</h1>

    <div class="posts">
      <div v-for="post in posts" :key="post.id">
        <router-link :to="{ name: 'PostDetail', params: { id: post.id } }">
          <h2>{{ post.title }}</h2>
        </router-link>
      </div>
    </div>
    <p id="message"></p>
  </div>
</template>

<script>
// @ is an alias to /src
//import store from "@/store.js";

export default {
  name: "Home",
  components: {},
  data() {
    return {
      posts: [],
    };
  },
  async created(){
      this.posts = await this.getAllPosts();
  },
  methods: {
    async getAllPosts() {
      let posts = "";
      const resp = await fetch("http://localhost:3000/api/posts", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: localStorage.token,
        },
      });
      const json = await resp.json();
      if (resp.ok) {
        posts = json;
      } else {
        console.log(json.error);
        document.getElementById("message").innerText = "Connexion impossible";
      }
      return posts;
    },
  },
};
</script>

<style scoped>
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
a {
  color: lightseagreen;
  text-decoration: none;
}
a:hover,
a:visited {
  text-decoration: underline;
}
</style>


