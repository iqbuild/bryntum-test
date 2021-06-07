import { App } from 'vue';
import Gantt from './bdGantt.vue';

Gantt.install = (Vue: App) => {
	Vue.component(Gantt.name, Gantt);
};

export default Gantt;
