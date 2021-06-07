import { App } from 'vue';
import TitleWSubtitle from './bdTitleWSubtitle.vue';

TitleWSubtitle.install = (Vue: App) => {
	Vue.component(TitleWSubtitle.name, TitleWSubtitle);
};

export default TitleWSubtitle;
