import './styles/index.scss';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ant-design-vue/dist/antd.css';
import '@bryntum/gantt/gantt.stockholm.css';

import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);

app.mount('#app');
