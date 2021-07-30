// ./components/HomeLink.vue
<template>
<header>
	<h1>{{ title }}</h1>
	<Button 
	v-show="homePage" 
	@btn-click="$emit('toggle-add-task')" 
	:text="showAddTask ? 'Fermé' : 'Ajout des taches'" :color="showAddTask ? 'red' : 'green' "/>

<!--     <Button text="Mis à jour" color="blue"/>
	<Button text="Suppression" color="red"/>  -->
	
	</header>
</template>

<script>
import Button from './Button.vue'

export default {
	name: 'HomeLink',
	props: {
		title: String,
		showAddTask: Boolean
		},
		components:{
			Button,
}, 
computed: {
	homePage(){
		if(this.$route.path === '/'){
			return true
		} else {
			return false
		}
	}
}
}
</script>


<style scoped>
header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20px;
	}

	a {
		text-decoration: blueviolet;
	}
</style>