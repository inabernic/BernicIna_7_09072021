<template>
  <div>
    <GoBack />
    <section class="post card text-center">
      <div class="card-header">
        <h2>{{ post.title }}</h2>
      </div>
      <div class="card-body">
        <img v-show="post.attachement" :src="post.attachement" alt="image" />
        <h3 class="card-text">{{ post.content }}</h3>
      </div>

      <router-link
        v-show="showModify()"
        :to="{
          name: 'updatePost',
          params: { post: post },
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

      <div class="card-footer text-muted">
        <h5>
          Modifié le: <span style="color: blue">{{ post.updatedAt }}</span>
        </h5>
        <h5>
          Posté par:
          <span style="color: blue"
            >{{ post.User.firstName }} {{ post.User.lastName }}</span
          >
        </h5>
      </div>
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
      <button @click="addComment" class="btn btn-success">Ajouter</button>
      <p id="message"></p>

      <p>Les commentaires du post:</p>
      <p></p>
      <div class="cards" id="commentaires">
        <div v-for="comm in commentaires" :key="comm.id" class="card">
          <div>
            <p class="card_text">
              <input :id="comm.id" disabled v-model="comm.comment"  />
              <button
                @click="updateComment(comm)"
                id="confirm"
                hidden
                class="btn btn-primary"
              >
                Sauvegarder la modification
              </button>
            </p>

            <div class="card-footer d-flex d-flex justify-content-between">
              <small class="text-muted align-self-center"
                >Modifié le: {{ comm.updatedAt }} par: {{ comm.User.firstName }}
                {{ comm.User.lastName }}
              </small>

              <button
                type="button"
                class="btn btn-secondary"
                @click="prepModifyComment(comm.id)"
                v-show="showModifyComment(comm)"
              >
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

              <button
                type="button"
                class="btn btn-secondary"
                aria-label="Close"
                @click="deleteComment(comm.id)"
                v-show="showDeleteComment(comm)"
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
    this.post.updatedAt = this.post.updatedAt.substring(0, 10);
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
    showDeleteComment(comm) {
      return utils.isConnectedUserOwnerOf(comm) || utils.isConnectedUserAdmin();
    },
    showModify() {
      return utils.isConnectedUserOwnerOf(this.post);
    },
    showModifyComment(comm) {
      return utils.isConnectedUserOwnerOf(comm);
    },

    prepModifyComment(idComm) {
      console.log(idComm);
      document.getElementById(idComm).disabled = false;
      document.getElementById("confirm").hidden = false;
    },

    async updateComment(comm) {
      let json = await store.updateComment(comm);
      if (json) {
        //redirection
        this.$router.go();
      } else {
        document.getElementById("message").innerText =
          "La modification du commentaire est impossible!";
      }
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
  margin-bottom: 2rem;
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
