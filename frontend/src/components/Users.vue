<template>
<div>
    <div  :key="user.id" v-for="user in users">
        
        <User @toggle-reminder="$emit('toggle-reminder', user.id)" @delete-task="$emit('delete-task', user.id)" :user="user"/> 
    </div>
</div>
</template>

<script>
import User from './User'

export default {
   name: 'Users',
   props: {
       users: Array,
   },
   components:{
      User,
   }, 
   emits: ['delete-task', 'toggle-reminder'],
}
</script>