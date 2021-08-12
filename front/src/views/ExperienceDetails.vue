<template>
  <section>
    <!-- <h1>Commentaires</h1> -->
    <h2>{{ experience.name }}</h2>
    <div class="experience-details">
      <img :src="require(`@/assets/${experience.image}`)" :alt="experience.name">
    </div>
    <p>{{ experience.description }}</p>
  </section>
</template>

<script>
import store from "@/store.js";
export default {
  props: {
    id: {
      type: String,
      required: true
    },
    experienceSlug: {
      type: String,
      required: true
    },
  },
  computed: {
    post() {
      return store.posts.find(
        (post) => post.id === this.id
      );
    },
    experience() {
      return this.post.experiences.find(
        (experience) => experience.slug === this.experienceSlug
      );
    },
  },
};
</script>

<style scoped>
.img{
  max-width: 600px;
   height: auto;
   width: 100%;
   max-height: 400px; 
}
.experience-details{
    display:flex;
    justify-content: space-between;
    padding: 40px;
}

p{
    margin: 0 40px;
    font-size: 20px;
    text-align: left;
}
</style>
