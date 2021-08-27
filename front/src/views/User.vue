<template>
  <div>
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

</style>