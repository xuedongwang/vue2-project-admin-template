
const directives = {};

export default Vue => {
  for (const [key, handler] of Object.entries(directives)) {
    Vue.directive(key, handler);
  }
};
