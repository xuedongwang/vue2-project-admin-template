import Vue from 'vue';
import Antd from 'ant-design-vue';
import App from './App.vue';
import store from './store';
import router from './router';
import { titleMixin } from './mixins';
import { $event, $http } from './utils';
import TabMenu from './components/tab-menu';
import filters from './filters';

import './assets/scss';
import 'ant-design-vue/dist/antd.css';

Vue.use(filters);
Vue.use(titleMixin);
Vue.use(Antd);
Vue.use(TabMenu);

window.$http = $http;
window.$event = $event;

/* eslint-disable no-new */
new Vue({
  el: '#root',
  store,
  router,
  render: h => h(App)
});
