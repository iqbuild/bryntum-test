<template>
	<div>
		<GanttDemo />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import GanttDemo from './components/BryntumGantt/BryntumGantt.example.vue';

export default defineComponent({
	name: 'App',
	components: {
		GanttDemo,
	},
});
</script>

<style></style>
