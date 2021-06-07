import AgGridCell from './components/agGrid/cellRenderers';
import DropdownButton from './components/DropdownButton';
import BuilderGantt from './components/Gantt';
import GroupButton from './components/GroupButton';
import Icon from './components/Icon';
import Input from './components/Input';
import Tabs from './components/Tabs';

import './styles/index.scss';
import 'ant-design-vue/dist/antd.css';
import '@bryntum/gantt/gantt.stockholm.css';
import { App } from 'vue';

const components = {
	...AgGridCell,
	DropdownButton,
	BuilderGantt,
	GroupButton,
	Icon,
	Input,
	Tabs,
};

const install = (Vue: App): void => {
	// tslint:disable-next-line: forin
	for (const component in components) {
		// @ts-expect-error To avoid typescript error on export component
		Vue.component(components[component].name, components[component]);
	}
};

export default { install };

export { default as AgGridCell } from './components/agGrid/cellRenderers';
export { default as BuilderGantt } from './components/Gantt';
export { Gantt, ProjectModel } from '@bryntum/gantt';
export { default as DropdownButton } from './components/DropdownButton';
export { default as GroupButton } from './components/GroupButton';
export { default as Icon } from './components/Icon';
export { default as Input } from './components/Input';
export { default as Tabs } from './components/Tabs';
