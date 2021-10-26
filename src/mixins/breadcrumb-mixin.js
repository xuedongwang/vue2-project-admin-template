import store from '@/store';
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
      store.commit('setBreadcrumb', breadcrumb)
    }
  },
  beforeDestroy() {
    store.commit('setBreadcrumb', [])
  }
};

export default breadcrumbMixin;
