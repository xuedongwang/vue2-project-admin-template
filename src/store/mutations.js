const mutations = {
  setBreadcrumb (state, payload = []) {
    state.breadcrumb = payload;
  }
};

export default mutations;
