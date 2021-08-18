const getBreadcrumb = vm => {
  const { breadcrumb } = vm.$options;
  if (breadcrumb) {
    return typeof breadcrumb === 'function'
      ? breadcrumb.call(vm)
      : breadcrumb;
  }
};

const breadcrumbMixin = {
  created () {
    const breadcrumb = getBreadcrumb(this);
    if (breadcrumb) {
      this.$store.commit('setBreadcrumb', breadcrumb);
    }
  },
  beforeDestroy () {
    const breadcrumb = getBreadcrumb(this);
    if (breadcrumb) {
      this.$store.commit('setBreadcrumb', []);
    }
  }
};

export default Vue => {
  Vue.mixin(breadcrumbMixin);
};
