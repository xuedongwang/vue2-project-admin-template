import Vue from 'vue';
import Antd from 'ant-design-vue';

import App from './App.vue';
import store from './store';
import router from './router';
import { titleMixin } from './mixins';

import './assets/scss';
import 'ant-design-vue/dist/antd.css';

Vue.use(titleMixin);
Vue.use(Antd);

/* eslint-disable no-new */
new Vue({
  el: '#root',
  store,
  router,
  render: h => h(App)
});
