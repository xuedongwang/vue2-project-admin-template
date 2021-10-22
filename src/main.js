import Vue from 'vue';
import Antd from 'ant-design-vue';
import VueClipboard from 'vue-clipboard2'
import App from './App.vue';
import store from './store';
import router from './router';
import { $event, $http, $upload } from './utils';
import TabMenu from './components/tab-menu';
import filters from './filters';
import { API } from './config';

import './assets/scss';
import 'ant-design-vue/dist/antd.css';

Vue.use(VueClipboard);
Vue.use(filters);
Vue.use(Antd);
Vue.use(TabMenu);

window.$http = $http;
window.$event = $event;
window.$upload = $upload;

window.API = API;

/* eslint-disable no-new */
new Vue({
  el: '#root',
  store,
  router,
  render: h => h(App)
});
