<template>
  <div>
    <h1>Salut {{ user.firstName }}, voila tes posts:</h1>
    <h1>
      <router-link to="/new"
        ><button class="btn btn-outline-success btn-sm">
          Ajouter un nouveau post
        </button>
      </router-link>
    </h1>
    <div class="row row-cols-1 row-cols-md-2 g-4">
      <div v-for="post in myPosts" :key="post.id">
        <Post :post="post" />
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
  methods: {},
};
</script>

<style scoped>
</style>
