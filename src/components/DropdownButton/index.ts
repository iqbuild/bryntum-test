import { App } from 'vue';
import DropDownButton from './bdDropdownButton.vue';

DropDownButton.install = (Vue: App) => {
	Vue.component(DropDownButton.name, DropDownButton);
};

export default DropDownButton;
