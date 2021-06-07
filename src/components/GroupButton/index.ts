import { App } from 'vue';
import GroupButton from './bdGroupButton.vue';

GroupButton.install = (Vue: App) => {
	Vue.component(GroupButton.name, GroupButton);
};

export default GroupButton;
