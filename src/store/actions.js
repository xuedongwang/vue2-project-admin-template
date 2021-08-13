import { CONST } from '@/config';
const actions = {
  loginOut ({ state }) {
    localStorage.removeItem(CONST.TOKEN_KEY);
    state.router.replace('/login');
  }
};

export default actions;
