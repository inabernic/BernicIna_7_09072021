<template>
  <div>
    <GoBack />
    <section class="post">
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
      <router-link
        v-show="showModify()"
        :to="{
          name: 'updatePost',
          params: { post: post },
        }"
      >
        Modifier le post
      </router-link>
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
            <button
              @click="deleteComment(comm.id)"
              v-show="showDeleteComment(comm)"
            >
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
import utils from "@/utils";

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
    this.commentaires = await store.getCommentsForPost(this.post.id);
  },
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async addComment() {
      if (!this.newComment) {
        return;
      }
      let json = await store.addComment(this.post.id, this.newComment);
      if (json) {
        //redirection
        this.$router.go();
      } else {
        document.getElementById("message").innerText =
          "L'ajout du post est impossible";
      }
    },
    showDelete() {
      return (
        utils.isConnectedUserOwnerOf(this.post) || utils.isConnectedUserAdmin()
      );
    },
    showModify() {
      return utils.isConnectedUserOwnerOf(this.post);
    },

    showDeleteComment(comment) {
      return (
        utils.isConnectedUserOwnerOf(comment) || utils.isConnectedUserAdmin()
      );
    },

    async deleteComment(idComm) {
      let json = await store.deleteComment(idComm);
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
  height: auto;
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

textarea {
  padding: 10px;
  max-width: 100%;
  line-height: 1.5;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-shadow: 1px 1px 1px #999;
}
</style>
