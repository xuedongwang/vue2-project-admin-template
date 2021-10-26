const getters = {
  isAdmin(state) {
    return state.user.info.role === 'admin';
  }
};

export default getters;
