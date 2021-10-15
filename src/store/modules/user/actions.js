import { $http } from '@/utils';
import { SET_USER_INFO } from './mutation-types';
const actions = {
  fetchUserinfo ({ commit }) {
    return $http.get('/user/info', {loadingMsg: '获取登录信息...'})
      .then(res => {
        commit(SET_USER_INFO, res.data);
      })
  }
};

export default actions;
