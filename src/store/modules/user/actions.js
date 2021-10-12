import { message } from 'ant-design-vue';
import { $http } from '@/utils';
const actions = {
  fetchUserinfo ({ commit }) {
    const hide = message.loading({
      content: '加载中...',
      duration: 0,
      key: 'key'
    });
    return $http.get('/user/info')
      .then(res => {
        hide();
        commit('set_user_info', res.data);
      })
      .catch(err => {
        message.error({
          content: '网络故障，请重试',
          key: 'key'
        });
        throw err;
      });
  }
};

export default actions;
