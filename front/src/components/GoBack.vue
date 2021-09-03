<template>
  <span class="go-back">
    <button class="btn btn-primary" @click="goBack">Retour</button>
  </span>
</template>

<script>
export default {
  methods: {
    goBack() {
      return this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.go-back {
  display: flex;
  cursor: pointer;
}
button {
  border: 0;
  margin: 1rem;
}
</style>
