<template>
	<div>
		<div class="header">
			<button @click="incrementZoom">Zoom +</button>
			<button @click="decreaseZoom">Zoom -</button>
			<button @click="expandAll">Expand all</button>
			<button @click="collapseAll">Collapse all</button>
			<button @click="useCriticalPaths = !useCriticalPaths">
				Critical path
			</button>
			<button @click="useDependencies = !useDependencies">Dependencies</button>
			<button @click="useBaseLines = !useBaseLines">Baselines</button>
		</div>
		<div style="height: 90vh">
			<BuilderGantt
				v-if="ganttDataLoaded"
				v-model:ganttConfig="ganttConfig"
				@onReady="onGanttReady"
				:zoom="zoom"
				:useCriticalPaths="useCriticalPaths"
				:useBaseLines="useBaseLines"
				:useDependencies="useDependencies"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import { Gantt } from '@bryntum/gantt';
import { defineComponent } from 'vue';
import BuilderGantt from '../bdGantt.vue';
import proj from './example_project.json';

interface GanttConfig {
	startDate: string | Date;
	endDate?: string | Date;
	columns: Array<unknown>;
	project: Record<string, unknown>;
	calendar: string | number;
}

interface GanttData {
	ganttConfig: GanttConfig;
	gantt: undefined | Gantt;
	ganttDataLoaded: boolean;
	zoom: number;
	useCriticalPaths: boolean;
	useBaseLines: boolean;
	useDependencies: boolean;
}

export default defineComponent({
	name: 'demo-gantt',

	components: {
		BuilderGantt,
	},

	data(): GanttData {
		return {
			ganttConfig: {
				startDate: '',
				columns: [],
				project: {},
				calendar: 0,
			},
			gantt: undefined,
			ganttDataLoaded: false,
			zoom: 10,
			useCriticalPaths: false,
			useBaseLines: false,
			useDependencies: false,
		};
	},

	methods: {
		setGanttData(): void {
			this.ganttConfig = {
				project: {
					resourcesData: proj.resources,
					eventsData: proj.tasks.children,
					dependenciesData: proj.dependencies,
					assignmentsData: proj.assignments,
					calendarsData: proj.calendars.children,
					syncDataOnLoad: true,
				},
				startDate: proj.project.startDate,
				endDate: '2025-03-16',

				calendar: proj.project.calendar,

				columns: proj.columns,
			};

			this.ganttDataLoaded = true;
		},

		onGanttReady(gantt: Gantt): void {
			this.gantt = gantt;
		},

		incrementZoom(): void {
			this.zoom += 1;
		},

		decreaseZoom(): void {
			this.zoom -= 1;
		},

		expandAll() {
			if (this.gantt) {
				this.gantt.expandAll();
			}
		},

		collapseAll() {
			if (this.gantt) {
				this.gantt.collapseAll();
			}
		},
	},

	mounted(): void {
		this.setGanttData();
	},
});
</script>

<style scoped lang="scss">
.header {
	display: flex;
	padding: 5px;

	button {
		margin-right: 10px;
	}
}
</style>
