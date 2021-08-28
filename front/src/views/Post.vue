<template>
  <div class="boxPost">
    <router-link
      :to="{
        name: 'PostDetail',
        params: { post: post, postId: post.id.toString() },
      }"
    >
      <h2>{{ post.title }}</h2>
      <img v-show="post.attachement" :src="post.attachement" alt="image" />
      <h3>{{ post.content }}</h3>
      <h5>
        Modifié le: <span style="color: blue">{{ post.updatedAt }}</span>
      </h5>
      <h5>
        Posté par:
        <span style="color: blue"
          >{{ post.User.firstName }} {{ post.User.lastName }}</span
        >
      </h5>
    </router-link>

    <p id="message"></p>
    <button class="btn" @click="deletePost(post.id)" v-show="showDelete(post)">
      x Surpimmer le post x
    </button>
  </div>
</template>

 <script>
import store from "@/store";

export default {
  name: "Post",
  props: {
    post: Object,
  },
  created() {
    this.post.updatedAt = this.post.updatedAt.substring(0, 10);
  },

  methods: {
    showDelete(post) {
      let loggedUserId = JSON.parse(localStorage.user).userId;
      let isAdmin = JSON.parse(localStorage.user).isAdmin;
      let postUserId = post.UserId;
      return loggedUserId == postUserId || isAdmin == 1;
    },

    async deletePost(idPost) {
      let json = await store.deletePost(idPost);
      if (json) {
        //redirection
        this.$router.go();
      } else {
        document.getElementById("message").innerText =
          "La supression du post est impossible!";
      }
    },
  },
};
</script>
 
 

<style scoped>
a {
  color: rgb(77, 127, 235);
  text-decoration: none;
}
a:hover,
a:visited {
  text-decoration: underline;
}
.boxPost {
  background-color: rgb(239, 243, 237);
}
h2 {
  color: #42b983;
}
h3,
h5 {
  color: black;
}
h2,
h3 {
  text-align: left;
}
h5 {
  text-align: right;
}
</style>
