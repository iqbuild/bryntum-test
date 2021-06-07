<template>
	<div>
		<Icon name="users" family="MaterialIcons" :size="16" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Icon from './components/Icon';
// import GanttDemo from './components/BryntumGantt/BryntumGantt.example.vue';

export default defineComponent({
	name: 'App',
	components: {
		Icon,
	},
});
</script>

<style></style>
