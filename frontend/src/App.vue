<template>
<div class="container">
    <HomeLink  
      @toggle-add-task="toggleAddTask" 
      title="Echange entre les collegues" 
      :showAddTask="showAddTask"/>
      
      <div v-show="showAddTask">
        <AddTask @add-task="addTask"/>
      </div>
      <router-view :showAddTask="showAddTask"></router-view>
      <Footer/>

</div>
</template>

<script>
import HomeLink from './components/HomeLink'
import Footer from './components/Footer'


export default {
  name: 'App',
  components: {
    HomeLink,
    Footer
  },
  data(){
    return{
      showAddTask: false,
    }
  },
  methods: {
    toggleAddTask() {
      this.showAddTask = !this.showAddTask
    }
  },
}
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.btn{
  display: inline-block;
  background: #000;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
