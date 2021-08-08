<template>
    <div @dblclick="$emit('toggle-reminder', user.id)" 
    :class="[user.isAdmin ? 'reminder' : '', 'user']">
        <h3>{{ user.firstName}}
            {{user.lastName }}
            <i @click="$emit('delete-task', user.id)" class="fas fa-times"></i>
        </h3>
    </div>
 </template>

 <script>
    export default {
        name: 'User', 
        props: {
            user: Object,
        },
    }
 </script>

 <style scope>
     .fas{
         color: crimson;
     }

     .user{
         background: #9b8b8b;
         margin: 5px;
         padding: 10px 20px;
         cursor: pointer;
     }

     .user.reminder{
         border-left: 5px solid green;
     }

     .user h3{
         display: flex;
         align-items: center;
         justify-content: space-between;
     }

</style>