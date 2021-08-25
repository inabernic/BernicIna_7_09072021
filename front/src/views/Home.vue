<template>
  <div class="home">
     <div id="mybutton">
      <button @click="logOut" class="btn logout">Log out</button>
    </div>
    <h1>Toutes les posts</h1>

    <div class="posts">
      <div v-for="post in posts" :key="post.id">
        <router-link :to="{ name: 'PostDetail', params: { id: post.id } }">
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
    this.posts = await this.getAllPosts();
  },
  methods: {
    logOut() {
      store.user = null;
      this.$router.go();
    },
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
.logout {
  background-color : #31B0D5;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  border-color: #46b8da;
}
#mybutton {
  position: fixed;
  bottom: -4px;
  right: 10px;
}
</style>


