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
          @change="updateFile"
        />

        <button type="submit" class="btn btn-success">Enregistrer la modification</button>
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
    updateFile() {
      this.file = this.$refs.file.files[0];
      let reader = new FileReader();
      if (this.file) {
        reader.readAsDataURL(this.file);
        reader.onload = (e) => {
          this.post.attachement = e.target.result;
        };
      } else {
        this.post.attachement = null;
      }
    },
    async updatePost() {
      let json = await store.updatePost(this.post, this.file);
      if (json) {
        //redirection
        this.$router.go(-1);
      } else {
        document.getElementById("message").innerText =
          "La modification du post est impossible";
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
