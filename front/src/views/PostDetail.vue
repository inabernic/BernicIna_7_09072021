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
      <div>
        <textarea
          rows="5"
          cols="33"
          v-model="newComment"
          type="text"
          name="content"
          placeholder="Laisser un commentaire..."
        >
        </textarea>
      </div>
      <button @click="addComment" class="btn">Ajouter</button>
      <p id="message"></p>

      <p>Commentaires:</p>
      <p></p>
      <div class="cards" id="commentaires">
        <div v-for="comm in commentaires" :key="comm.id" class="card">
          <p style="color: blue">
            {{ comm.User.firstName }} {{ comm.User.lastName }}
          </p>
          <p class="card_text">
            <button @click="deleteComment(comm.id)" v-show="showDelete(comm)">
              x
            </button>
            {{ comm.comment }}
          </p>
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

    showDelete(comment) {
      let loggedUserId = JSON.parse(localStorage.user).userId;
      let isAdmin = JSON.parse(localStorage.user).isAdmin;
      let commentUserId = comment.UserId;
      return loggedUserId == commentUserId || isAdmin==1;
    },

    async deleteComment(idComm) {
      let json= await store.deleteComment(idComm);
      if (json) {
        //redirection
        this.$router.go();
      } else {
        document.getElementById("message").innerText =
          "La supression du commentaire est impossible!";
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
  font-style: italic;
  margin: 0.5rem;
}
</style>