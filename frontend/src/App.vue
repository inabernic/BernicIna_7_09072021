<template>
<div class="container">
    <HomeLink  
      @toggle-add-task="toggleAddTask" 
      title="Echange entre les collegues" 
      :showAddTask="showAddTask"/>
      <div v-show="showAddTask">
    <AddTask 
       @add-task="addTask"/>
      </div>
     <Tasks 
       @toggle-reminder="toggleReminder" 
        @delete-task="deleteTask" 
        :tasks="tasks" />
    <h1>Salut </h1>
</div>
</template>

<script>
import HomeLink from './components/HomeLink'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'

export default {
  name: 'App',
  components: {
    HomeLink,
    Tasks,
    AddTask
  },
  data(){
    return{
      tasks:[],
      showAddTask: false,
    }
  },
  methods: {
    toggleAddTask() {
      this.showAddTask = !this.showAddTask
    },
    addTask(task) {
      this.tasks = [...this.tasks, task]
    },
    deleteTask(id) {
      if(confirm('Confirmez vous la suppression ?')) {
      this.tasks = this.tasks.filter((task) => task.id !== id )
      }
    },
    toggleReminder(id) {
      this.tasks = this.tasks.map((task) => task.id === id ? {...task, reminder: !task.reminder} : task)
    },
    async fetchTasks() {
      //http://localhost:5000/=api
      const res = await fetch('api/tasks')
console.log(res);
      const data = await res.json ()
      return data
    },
    async fetchTask(id) {
      const res = await fetch(`api/tasks/${id}`)

      const data = await res.json ()
      return data
    },
  },
  async created(){
    this.tasks = await this.fetchTasks() 
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
