<template>
	<div style="width: 100%">
		<h1>Tabla ejemplo</h1>
		<ag-grid-vue
			style="width: 100%; height: 650px"
			class="ag-theme-alpine"
			@grid-ready="onReady"
			:rowHeight="60"
		>
		</ag-grid-vue>
	</div>
</template>

<script lang="ts">
import { GridOptions, GridApi, ColDef } from 'ag-grid-community';
import { AgGridVue } from 'ag-grid-vue3';
import { defineComponent } from 'vue';

import TitleWSubtitleCellRenderer from './cellRenderers/TitleWSubtitle/bdTitleWSubtitle.vue';

interface Data {
	gridApi: GridApi | null | undefined;
	columnData: ColDef[];
	rowData: Array<any>;
}

export default defineComponent({
	name: 'example-table',

	components: {
		'ag-grid-vue': AgGridVue,
		// eslint-disable-next-line vue/no-unused-components
		TitleWSubtitleCellRenderer,
	},

	data(): Data {
		return {
			gridApi: null,
			columnData: [],
			rowData: [],
		};
	},

	methods: {
		createColDefs(): void {
			this.columnData.push({
				headerName: 'Columna 1',
				field: 'column1',
				width: 270,
				cellStyle: {
					display: 'flex',
					'align-items': 'flex-start',
					fontSize: '0.8125rem',
					'border-right': '1px solid #F4F4F4',
				},
				lockPosition: true,
				resizable: true,
				suppressMenu: true,
				sort: 'asc',
			} as ColDef);

			this.columnData.push({
				headerName: 'Columna 2',
				field: 'column2',
				width: 270,
				cellStyle: {
					display: 'flex',
					'align-items': 'flex-start',
					fontSize: '0.8125rem',
					'border-right': '1px solid #F4F4F4',
				},
				lockPosition: true,
				suppressMenu: true,
				sort: 'asc',

				cellRendererFramework: 'TitleWSubtitleCellRenderer',
			} as ColDef);
		},

		createRowDefs(): void {
			this.rowData.push({
				column1: 'Texto plano',
				column2: {
					title: 'Proyecto ejemplo',
					subtitle: 'Actualizado al 10-04-2021',
					icon: {
						name: 'plus',
						position: 'right',
						color: '#1285FF',
						onPress: (): void => {
							console.log('pressed');
						},
					},
				},
			});
		},

		createTable(): void {
			this.createColDefs();
			this.createRowDefs();
		},

		updateGridRowData(): void {
			this.createTable();
			// eslint-disable-next-line no-unused-expressions
			this.gridApi?.setColumnDefs(this.columnData as ColDef[]);
			// eslint-disable-next-line no-unused-expressions
			this.gridApi?.setRowData(this.rowData as Array<any>);
			// eslint-disable-next-line no-unused-expressions
		},

		onReady(params: GridOptions): void {
			this.gridApi = params.api;
			this.updateGridRowData();
		},
	},
});
</script>

<style></style>
