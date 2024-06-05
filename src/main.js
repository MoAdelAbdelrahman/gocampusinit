import { createApp } from 'vue'
import App from './App.vue'
import './index.css'


import VueModelViewer from 'vue-model-viewer'

const app = createApp(App);
app.use(VueModelViewer);
app.mount('#app');

