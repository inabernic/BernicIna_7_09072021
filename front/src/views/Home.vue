<template>
  <div class="home">
    <h1>All posts</h1>

    <div class="posts">
      <div v-for="post in posts" :key="post.name">
        <router-link :to="{name: 'PostDetail', params: {id:post.id}}">
          <h2>{{ post.name }}</h2>
        </router-link>
        <figure>
          <router-link :to="{name: 'PostDetail', params: {id:post.id}}">
            <img
              :src="require(`@/assets/${post.image}`)"
              :alt="post.name"
            />
          </router-link>
        </figure>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import store from "@/store.js";

export default {
  name: "Home",
  components: {},
  data() {
    return {
      posts: store.posts,
    };
  },
};
</script>

<style scoped>
.home{
  max-width: 1400px;
  margin: 0 auto;
}
img{
max-width: 200px;
}
.posts{
  display:flex;
  justify-content:space-between;
}
a{
  color:lightseagreen;
  text-decoration: none;
}
a:hover,
a:visited{
  text-decoration: underline;
}
</style>


