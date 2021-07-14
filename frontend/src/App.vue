<template>
<div class="container">
  <HomeLink  title="CouCou"/>
  <Tasks :tasks="tasks" />
  <h1>Salut Otilia draga</h1>
</div>
</template>

<script>
import HomeLink from './components/HomeLink'
import Tasks from './components/Tasks'

export default {
  name: 'App',
  components: {
    HomeLink,
    Tasks
  },
  data(){
    return{
      tasks:[]
    }
  },
  created(){
    this.tasks = [
      {
        id: 1,
        text: 'Doctors Appointment',
        day: 'March 1st at 2:30pm',
        reminder: true,
      },
       {
        id: 2,
        text: 'Meeting at School',
        day: 'March 3st at 1:30pm',
        reminder: true,
      },
       {
        id: 3,
        text: 'Shopping',
        day: 'March 4st at 3:30pm',
        reminder: false,
      }
    ]
  }
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
