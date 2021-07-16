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
      if(confirm('Confirmz vous la suppression ?')) {
      this.tasks = this.tasks.filter((task) => task.id !== id )
      }
    },
    toggleReminder(id) {
      this.tasks = this.tasks.map((task) => task.id === id ? {...task, reminder: !task.reminder} : task)
    },
  },
  created(){
    this.tasks = [
      {
        id: 1,
        text: 'Reunion generale',
        day: '10:00 02/08/2021',
        reminder: true,
      },
       {
        id: 2,
        text: 'Sortie entre nous',
        day: '11:00 05/08/2021',
        reminder: true,
      },
       {
        id: 3,
        text: 'Exposition',
        day: '14:00 08/08/2021',
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
