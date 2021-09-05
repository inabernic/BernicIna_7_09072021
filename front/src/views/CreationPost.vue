<template>
<div>
    <GoBack />
  <div class="creationPost">
    <h1>Veuillez ajouter le post :</h1>
    <form @submit.prevent="createPost" autocomplete="off">
      <div class="form">
        <input
          v-model="title"
          type="text"
          name="title"
          class="input"
          placeholder="Entrez le title (jusqu'a 50 caractère)"
          maxlength="50"
          required
        />
        <textarea
          v-model="content"
          taille="100"
          type="text"
          name="content"
          class="input"
          placeholder="Entrez le contenu  (jusqu'a 1000 caractère)"
          maxlength="1000"
          required
        />
        <input
          type="file"
          name="file"
          ref="file"
          class="input"
          @change="getFile"
          placeholder="Charger le fichier"
        />

        <button type="submit" class="btn btn-success">Ajouter</button>
        <p id="message"></p>
      </div>
    </form>
  </div>
  </div>
</template>

<script>
import store from "@/store";
import GoBack from "@/components/GoBack";

export default {
  components: {
    GoBack,
  },
  data() {
    return {
      title: null,
      content: null,
      file: null,
    };
  },
  methods: {
    getFile() {
      this.file = this.$refs.file.files[0];
    },
    async createPost() {
      let json = await store.createPost(this.title, this.content, this.file);
      if (json) {
        //redirection
        const redirectPath = this.$route.query.redirect || "/";
        this.$router.push(redirectPath);
      } else {
        document.getElementById("message").innerText =
          "L'ajout du post est impossible";
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
