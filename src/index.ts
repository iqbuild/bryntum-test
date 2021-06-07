import BuilderGantt from './components/Gantt';

import './styles/index.scss';
import 'ant-design-vue/dist/antd.css';
import '@bryntum/gantt/gantt.stockholm.css';
import { App } from 'vue';

const components = {
	BuilderGantt,
};

const install = (Vue: App): void => {
	// tslint:disable-next-line: forin
	for (const component in components) {
		// @ts-expect-error To avoid typescript error on export component
		Vue.component(components[component].name, components[component]);
	}
};

export default { install };

export { default as BuilderGantt } from './components/Gantt';
export { Gantt, ProjectModel } from '@bryntum/gantt';
