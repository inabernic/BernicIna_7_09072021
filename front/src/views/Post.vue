<template>
  <div class="boxPost">
    <h2>{{ post.title }}</h2>
    <h3>{{ post.content }}</h3>
    <h5>Modifié le: <span style="color:blue">{{ post.updatedAt }}</span></h5>
    <h5>Posté par: <span style="color:blue">{{ post.User.firstName }} {{ post.User.lastName }}</span></h5>
  </div>
</template>

 <script>
export default {
  name: "Post",
  props: {
    post: Object,
  },
    created() {
    this.post.updatedAt = this.post.updatedAt.substring(0,10);
  },
};
</script>

<style scoped>
.boxPost {
  background-color: rgb(239, 243, 237);
}
h2{
 color:#42b983;
}
h3,
h5{
  color: black;
}
h2,h3{
  text-align: left;
}
h5{
  text-align: right;
}
</style>
