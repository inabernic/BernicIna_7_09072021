<template>
  <div>
    <GoBack />
    <section class="post">
      <h2>{{ post.title }}</h2>
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
    </section>

    <section class="comms">
      <h2>La liste des Commentaires:</h2>

      <div>
        <textarea
          rows="5"
          cols="33"
          v-model="newComment"
          type="text"
          name="content"
          placeholder="Laisser un commentaire..."
          required
        ></textarea>
      </div>

      <button @click="addComment" class="btn">Ajouter</button>
      <p id="message"></p>
      <div class="cards" id="commentaires">
        <div v-for="comm in commentaires" :key="comm.id" class="card">
          <span class="card_text">{{ comm.comment }}</span>
          <span> de {{ comm.User.firstName }} {{ comm.User.lastName }} </span>
        </div>
      </div>
      <router-view :key="$route.path" />
    </section>
  </div>
</template>

<script>
import GoBack from "@/components/GoBack";
import store from "@/store";

export default {
  components: {
    GoBack,
  },
  data() {
    return {
      commentaires: [],
      newComment: null,
    };
  },
  async created() {
    this.commentaires = await store.getCommentsForPost(this.postId);
  },
  props: {
    post: {
      type: Object,
      required: true,
    },
    postId: {
      type: String,
      required: true,
    },
  },
  methods: {
    async addComment() {
      if (!this.newComment) {
        return;
      }
      let json = await store.addComment(this.postId, this.newComment);
      if (json) {
        //redirection
        this.$router.go();
      } else {
        document.getElementById("message").innerText =
          "L'ajout du post est impossible";
      }
    },
  },
};
</script>

<style scoped>
img {
  max-width: 600px;
  height: auto;
  width: 100%;
  max-height: 400px;
}

.comms {
  padding: 40px 0;
}

.post-details {
  display: flex;
  justify-content: space-between;
}

p {
  margin: 0 40px;
  font-size: 20px;
  text-align: left;
}

.cards {
  justify-content: space-between;
}

.card {
  padding: 0 20px;
  position: relative;
}

.card_text {
  color: black;
  font-size: 25px;
  font-weight: bold;
  text-decoration: none;
}
</style>