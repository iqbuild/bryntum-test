<template>
	<div>
		<div class="header">
			<button @click="incrementZoom">Zoom +</button>
			<button @click="decreaseZoom">Zoom -</button>
			<button @click="expandAll">Expandir Todos</button>
			<button @click="collapseAll">Colapsar Todos</button>
			<button @click="useCriticalPaths = !useCriticalPaths">
				Ruta critica
			</button>
		</div>
		<div style="height: 90vh">
			<BuilderGantt
				v-if="ganttDataLoaded"
				v-model:ganttConfig="ganttConfig"
				@onReady="onGanttReady"
				:zoom="zoom"
				:useCriticalPaths="useCriticalPaths"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import moment from 'moment';
import { Gantt } from '@bryntum/gantt';
import { defineComponent, reactive, toRaw } from 'vue';
import BuilderGantt from '../bdGantt.vue';
import builderProject from './builder_project.json';
import { BuilderData } from './BuilderInterfaces';

interface GanttConfig {
	startDate: string | Date;
	endDate?: string | Date;
	columns: Array<unknown>;
	project: Record<string, unknown>;
	calendar: string | number;
}

interface ProjectData {
	startDate: Date;
	endDate: Date;
	calendar: string | number;
	columns: Array<Record<string, unknown>>;
	resources: never[];
	tasks: Array<Record<string, unknown>>;
	assignments: Array<Record<string, unknown>>;
	calendars: Array<Record<string, unknown>>;
	dependencies: Array<Record<string, unknown>>;
}

interface GanttData {
	ganttConfig: GanttConfig;
	gantt: undefined | Gantt;
	ganttDataLoaded: boolean;
	zoom: number;
	useCriticalPaths: boolean;
	project: ProjectData;
}

export default defineComponent({
	name: 'demo-gantt',

	components: {
		BuilderGantt,
	},

	setup() {
		const data = reactive({
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
			project: {
				startDate: new Date(),
				endDate: new Date(),
				calendar: 0,
				columns: [
					{
						type: 'name',
						field: 'name',
						text: 'Nombre',
					},
					{
						type: 'date',
						field: 'startDate',
						text: 'Inicio',
					},
					{
						type: 'date',
						field: 'endDate',
						text: 'Termino',
					},
				],
				resources: [],
				tasks: [],
				assignments: [],
				calendars: [],
				dependencies: [],
			},
		}) as GanttData;

		return data;
	},

	methods: {
		setGanttData(): void {
			this.parseBuilderGantt(builderProject);

			const project = toRaw(this.project);

			this.ganttConfig = {
				project: {
					resourcesData: project.resources,
					eventsData: project.tasks,
					dependenciesData: project.dependencies,
					assignmentsData: project.assignments,
					calendarsData: project.calendars,
					syncDataOnLoad: true,
				},
				startDate: project.startDate,
				endDate: project.endDate,

				calendar: project.calendar,

				columns: project.columns,
			};

			this.ganttDataLoaded = true;
		},

		parseBuilderGantt(data: BuilderData) {
			let projectStart = moment();
			let projectEnd = moment();

			for (let s = 0; s < data.specialties.length; s += 1) {
				const specialty = data.specialties[s];
				const sTask: {
					id: string;
					name: string;
					children: Array<Record<string, unknown>>;
				} = {
					id: specialty.id,
					name: specialty.name,
					children: [],
				};
				this.project.tasks.push(sTask);

				for (let p = 0; p < specialty.processes.length; p += 1) {
					const process = specialty.processes[p];
					const pTask: {
						id: string;
						name: string;
						children: Array<Record<string, unknown>>;
					} = {
						id: process.id,
						name: process.name,
						children: [],
					};
					sTask.children.push(pTask);

					for (let sb = 0; sb < process.subProcesses.length; sb += 1) {
						const subProcess = process.subProcesses[sb];
						const start = moment(subProcess.start);
						const end = moment(subProcess.end);
						const duration = end.diff(start, 'days');
						const sbTask: {
							id: string;
							name: string;
							startDate: Date;
							duration: number;
							manuallyScheduled: boolean;
						} = {
							id: subProcess.id,
							name: subProcess.name,
							startDate: new Date(subProcess.start),
							duration,
							manuallyScheduled: true,
						};
						pTask.children.push(sbTask);

						if (start < projectStart) {
							projectStart = start.clone();
						}

						if (end > projectEnd) {
							projectEnd = end.clone();
						}
					}
				}
			}

			this.project.startDate = projectStart.toDate();
			this.project.endDate = projectEnd.toDate();
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
