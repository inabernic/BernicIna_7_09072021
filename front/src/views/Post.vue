<template>
     <div class="boxPost">
            <h2>{{ post.title }}</h2>
            <h4>{{ post.content }}</h4>
            <h5>{{ post.updatedAt }}</h5>
            <h6>{{ post.User.firstName }} {{ post.User.lastName }}</h6>
          </div>
</template>

 <script>
    export default {
        name: 'Post', 
        props: {
            post: Object,
        },
    }
 </script>

<style scoped>
 .boxPost {
  background-color: rgb(218, 209, 209);
}
</style>
