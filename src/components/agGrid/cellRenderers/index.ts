import TitleWSubtitle from './TitleWSubtitle/bdTitleWSubtitle.vue';
import { App } from 'vue';

const AgGridCell = {
	TitleWSubtitle,
};

for (const elem in AgGridCell) {
	if (AgGridCell.hasOwnProperty(elem)) {
		// @ts-ignore
		const element = AgGridCell[elem];
		element.install = (Vue: App) => {
			Vue.component(element.name, element);
		};
	}
}

export default AgGridCell;
