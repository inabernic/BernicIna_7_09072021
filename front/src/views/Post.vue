<template>
  <div class="card mb-2">
    <router-link
      :to="{
        name: 'PostDetailRoute',
        params: { post: post, postId: post.id.toString() },
      }"
    >
      <div class="row g-0">
        <div class="col-md-4 h-100">
          <img
            class="img-fluid rounded-start img-thumbnail"
            style="height: 150px; width: 150px; object-fit: cover"
            v-show="post.attachement"
            :src="post.attachement"
            alt="no image"
          />
          <img
            class="img-fluid rounded-start img-thumbnail"
            style="height: 150px; width: 150px; object-fit: cover"
            src="@/assets/no_image.png"
            v-show="!post.attachement"
          />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">{{ post.title }}</h5>
            <p class="card-text"></p>
            <div class="text-truncate">
              {{ post.content }}
            </div>
            <p class="card-text"></p>
          </div>
        </div>
      </div>
    </router-link>
    <div class="card-footer d-flex d-flex justify-content-between">
      <small class="text-muted align-self-center"
        >Modifié le: {{ post.updatedAt }} par: {{ post.User.firstName }}
        {{ post.User.lastName }}
      </small>
      <router-link
        v-show="showModify()"
        :to="{
          name: 'updatePost',
          params: { post: post, postId: post.id.toString() },
        }"
      >
        <button type="button" class="btn btn-secondary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-pencil-square"
            viewBox="0 0 16 16"
          >
            <path
              d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
            ></path>
            <path
              fill-rule="evenodd"
              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
            ></path>
          </svg>
        </button>
      </router-link>
      <button
        type="button"
        class="btn btn-secondary"
        aria-label="Close"
        @click="deletePost(post.id)"
        v-show="showDelete()"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-trash"
          viewBox="0 0 16 16"
        >
          <path
            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
          ></path>
          <path
            fill-rule="evenodd"
            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
          ></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import utils from "@/utils";

export default {
  name: "Post",
  props: {
    post: Object,
  },
  created() {
    this.post.updatedAt = this.post.updatedAt.substring(0, 10);
  },

  methods: {
    showDelete() {
      return (
        utils.isConnectedUserOwnerOf(this.post) || utils.isConnectedUserAdmin()
      );
    },
    showModify() {
      return utils.isConnectedUserOwnerOf(this.post);
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
.text-truncate{
  color: black;
}
</style>
