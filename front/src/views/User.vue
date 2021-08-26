<template>
  <div>
    <div id="mybutton">
      <button @click="logOut" class="btn logout">Log out</button>
    </div>
    <h1>Salut {{ user.firstName }}, voila tes posts:</h1>

    <div class="posts">
      <div v-for="post in myPosts" :key="post.id">
        <router-link :to="{ name: 'PostDetail', params: { post: post, postId: post.id.toString() } }">
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
      user: JSON.parse(localStorage.user),
      myPosts: [],
    };
  },
  async created() {
    this.myPosts = await store.getMyPosts(this.user);
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