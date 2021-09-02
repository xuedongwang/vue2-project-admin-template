import Vue from 'vue';

const event = new Vue();

export default Vue => {
  Vue.prototype.$event = event;
  return event;
};
