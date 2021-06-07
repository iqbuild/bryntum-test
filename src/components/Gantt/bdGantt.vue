<template>
	<div id="bd_gantt"></div>
</template>

<script lang="ts">
import moment from 'moment';
import { defineComponent } from 'vue';
import { Gantt, ProjectModel } from '@bryntum/gantt';
import './styles.scss';

interface ComponentGanttData {
	gantt: undefined | Gantt;
}

export default defineComponent({
	name: 'bd-gantt',

	props: {
		ganttConfig: {
			type: Object,
			required: true,
		},

		autoHeight: {
			type: Boolean,
			default: false,
		},

		zoom: {
			type: [Number, String],
			default: 10,
		},

		useCriticalPaths: {
			type: Boolean,
			default: false,
		},

		useBaseLines: {
			type: Boolean,
			default: false,
		},

		useDependencies: {
			type: Boolean,
			default: false,
		},

		useTimeRanges: {
			type: Boolean,
			default: true,
		},
	},

	data(): ComponentGanttData {
		return {
			gantt: undefined,
		};
	},

	mounted(): void {
		this.setupGantt();
	},

	methods: {
		setupGantt() {
			if (this.gantt) {
				this.gantt.destroy();
			}

			const project = new ProjectModel({
				...this.ganttConfig.project,
				taskStore: {
					syncDataOnLoad: true,
				},
			});

			this.gantt = new Gantt({
				appendTo: 'bd_gantt',
				startDate: this.ganttConfig.startDate,
				endDate: this.ganttConfig.endDate,
				columns: this.ganttConfig.columns,
				project,
				autoHeight: this.autoHeight,
				features: {
					dependencies: {
						disabled: !this.useDependencies,
					},
					baselines: {
						disabled: !this.useBaseLines,
					},
					criticalPaths: {
						disabled: !this.useCriticalPaths,
					},
					taskDrag: {
						disabled: false,
					},
					timeRanges: {
						disabled: !this.useTimeRanges,
						showHeaderElements: true,
					},
				},
				taskRenderer({ taskRecord }: any) {
					return [
						{
							html: taskRecord.name,
							style: 'margin-bottom: 0.5em;text-align: center',
						},
					];
				},
			});

			this.gantt.zoomTo(this.zoom);
			const today = moment();
			// @ts-ignore
			this.gantt.features.timeRanges.store.add({
				name: today.format('DD-MM-YYYY'),
				startDate: today.toDate(),
				duration: 0,
			});
			this.$emit('onReady', this.gantt);
		},
	},

	watch: {
		zoom(newValue) {
			if (this.gantt) {
				this.gantt.zoomTo(newValue);
			}
		},

		useBaseLines(newValue: boolean) {
			if (this.gantt) {
				// @ts-ignore
				this.gantt.features.baselines.disabled = !newValue;
			}
		},

		useDependencies(newValue: boolean) {
			// @ts-ignore
			this.gantt.features.dependencies.disabled = !newValue;
		},

		// TODO: Fix typescript for features. For now it resets the entire gantt to toggle critical paths feature.
		useCriticalPaths(newValue: boolean) {
			if (this.gantt) {
				// @ts-ignore
				this.gantt.features.criticalPaths.disabled = !newValue;
			}
		},

		useTimeRanges(newValue: boolean) {
			if (this.gantt) {
				// @ts-ignore
				this.gantt.features.timeRanges.disabled = !newValue;
			}
		},
	},

	beforeUnmount() {
		if (this.gantt) {
			this.gantt.destroy();
		}
	},
});
</script>
