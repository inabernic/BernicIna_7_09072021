<template>
  <div class="updatePost">
    <h1>Veuillez modifier le post :</h1>
    <form @submit.prevent="updatePost" autocomplete="off">
      <div class="form">
        <input
          v-model="post.title"
          type="text"
          name="title"
          class="input"
          placeholder="Entrez le title"
          required
        />
        <textarea
          v-model="post.content"
          type="text"
          name="content"
          class="input"
          placeholder="Entrez le contenu"
          required
        />
        <img v-show="post.attachement" :src="post.attachement" alt="image" />
        <input
          type="file"
          name="file"
          ref="file"
          class="input"
          @change="getFile"
        />
   
        <button type="submit" class="btn">Enregistrer la modification </button>
        <p id="message"></p>
      </div>
    </form>
  </div>
</template>

<script>
import store from "@/store";
export default {
  data() {
    return {
      file: null,
    };
  },

   props: {
    post: {
      type: Object,
      required: true,
    },
   },

  methods: {
    getFile(){
        this.file = this.$refs.file.files[0];
    },
    async updatePost() {
      let json = await store.updatePost(
        this.post,
        this.file,
      );
      if (json) {
        //redirection
        const redirectPath = this.$route.query.redirect || "/";
        this.$router.push(redirectPath);
      } else {
        document.getElementById("message").innerText = "La modification du post est impossible";
      }
    },
  },
};
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: 0 auto;
}
#message {
  color: red;
}
</style>