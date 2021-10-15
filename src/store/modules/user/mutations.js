import { SET_USER_INFO } from './mutation-types';
const mutations = {
  [SET_USER_INFO] (state, payload) {
    state.info = payload;
  }
};

export default mutations;
