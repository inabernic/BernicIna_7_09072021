<template>
  <div>
    <div id="mybutton">
      <button @click="logOut" class="btn logout">Log out</button>
    </div>
    <h1>Salut {{ user.firstName }}, voila tes posts:</h1>

    <div class="posts">
      <div v-for="post in myPosts" :key="post.id">
        <router-link :to="{ name: 'PostDetail', params: { id: post.id + '' } }">
          <Post :post="post" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import Post from "./Post";
export default {
  components: { Post },
  data() {
    return {
      user: store.user,
      myPosts: [],
    };
  },
  async created() {
    this.myPosts = await this.getMyPosts();
  },
  methods: {
    logOut() {
      store.user = null;
      this.$router.go();
    },
    async getMyPosts() {
      let posts = "";
      let api = "http://localhost:3000/api/posts/user/"+ store.user.id;
      const resp = await fetch(api, {
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