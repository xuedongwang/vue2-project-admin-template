import Vue from 'vue';
import Antd from 'ant-design-vue';

import App from './App.vue';
import store from './store';
import router from './router';
import { titleMixin, breadcrumbMixin } from './mixins';
import TabMenu from './components/tab-menu';

import './assets/scss';
import 'ant-design-vue/dist/antd.css';

Vue.use(titleMixin);
Vue.use(breadcrumbMixin);
Vue.use(Antd);
Vue.use(TabMenu);

/* eslint-disable no-new */
new Vue({
  el: '#root',
  store,
  router,
  render: h => h(App)
});
