<template>
    <AddTask v-show="showAddTask"
    @add-task="addTask"/>
     <Tasks 
       @toggle-reminder="toggleReminder" 
        @delete-task="deleteTask" 
        :tasks="tasks" 
        />
  <!-- <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div> -->

</template>

<script>
// @ is an alias to /src
import Tasks from '../components/Tasks'
import AddTask from '../components/AddTask'

export default {
  name: 'Home',
  props: {
    showAddTask: Boolean,
  },
  components: {
    Tasks,
     AddTask,
  },
  data() {
    return{
      tasks: [],
    }
  },
   methods: {
    async addTask(task) {
     // const res = await fetch('api/tasks', {
      const res = await fetch('http://localhost:5000/tasks', {
        method : 'POST',
        headers : {
          'Content-type' : 'application/json',
        },
        body : JSON.stringify(task),
      })

      const data = await res.json()

      this.tasks = [...this.tasks, data]
    },
    async deleteTask(id) {
      if(confirm('Confirmez vous la suppression ?')) {
        const res = await fetch(`http://localhost:5000/tasks/${id}`, {
          method: 'DELETE'
        })

        res.status === 200 ? (this.tasks = this.tasks.filter((task) => task.id !== id )) : alert('Error deleting task')
      }
    },
     async toggleReminder(id) {
       const taskToToggle = await this.fetchTask(id)
       const updTask = {...taskToToggle, reminder : !taskToToggle.reminder}

      const res = await fetch(`http://localhost:5000/tasks/${id}`, {
        method: 'PUT',
        headers : {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(updTask),
      })

      const data = await res.json()

      this.tasks = this.tasks.map((task) => task.id === id ? {...task, reminder: data.reminder} : task)
    },
    async fetchTasks() {
      //http://localhost:5000/=api
      //const res = await fetch('api/tasks')
      const res = await fetch('http://localhost:5000/tasks')
      console.log(res);
      const data = await res.json ()
      return data
    },
    async fetchTask(id) {
     //const res = await fetch(`api/tasks/${id}`)
      const res = await fetch(`http://localhost:5000/tasks/${id}`)

      const data = await res.json ()
      return data
    },
  },
  async created(){
    this.tasks = await this.fetchTasks() 
  }
}
</script>
