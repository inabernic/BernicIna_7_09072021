// ./components/HomeLink.vue
<template>
<header>
	<h1>{{ title }}</h1>
	<Button text="Add Task" color="green"/>
    <Button text="UpdateTask" color="blue"/>
	<Button text="Delete Task" color="red"/> 
	</header>
</template>

<script>
import Button from './Button.vue'

export default {
	name: 'HomeLink',
	props: {
		title: String,
		},
		components:{
			Button,
}, 
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