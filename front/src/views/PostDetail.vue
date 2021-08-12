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
import store from "@/store.js";
import GoBack from "@/components/GoBack"

export default {
  components:{
    GoBack
  },
  data() {
    return {};
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  computed: {
    post() {
      return store.posts.find(
        (post) => post.id === this.id
      );
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