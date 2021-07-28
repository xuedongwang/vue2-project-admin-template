import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import { titleMixin } from './mixins';

Vue.use(titleMixin);

/* eslint-disable no-new */
new Vue({
  el: '#root',
  store,
  router,
  render: h => h(App)
});
