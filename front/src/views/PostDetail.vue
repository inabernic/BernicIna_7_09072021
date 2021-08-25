<template>
  <div>
    <GoBack />
    <section class="post">
      <h1>{{ post.name }}</h1>
      <div class="post-details">
        <img :src="require(`@/assets/${post.image}`)" />
        <h4>{{ post.description }}</h4>
      </div>
    </section>

    <section class="experiences">
      <h2>Top comments in {{ post.name }}</h2>
      <div class="cards" id="experience">
        <div
          v-for="experience in post.experiences"
          :key="experience.slug"
          class="card"
        >
          <router-link
            :to="{
              name: 'experienceDetails',
              params: { experienceSlug: experience.slug },
              hash: '#experience'
            }"
          >
            <img
              :src="require(`@/assets/${experience.image}`)"
              :alt="experience.name"
            />
            <span class="card_text">{{ experience.name }}</span>
          </router-link>
        </div>
      </div>
      <router-view :key="$route.path" />
    </section>
  </div>
</template>

<script>
import GoBack from "@/components/GoBack"

export default {
  components:{
    GoBack
  },
 data() {
    return {
      post: {},
    };
  },
  async created() {
    this.post = await this.getPostDetails();
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
 methods: {
    async getPostDetails() {
      let posts = "";
      let api = "http://localhost:3000/api/posts/"+ this.id;
      const resp = await fetch(api, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: localStorage.token,
        },
      });
      const json = await resp.json();
      if (resp.ok) {
        posts = json;
      } else {
        console.log(json.error);
        document.getElementById("message").innerText = "Connexion impossible";
      }
      return posts;
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

.experiences{
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