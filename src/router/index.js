import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import store from '../store';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.needLogin && !store.state.user.info) {
    try {
      await store.dispatch('user/fetchUserinfo');
      next();
    } catch {
      next({name: '500'});
    }
  } else {
    next();
  }
});

export default router;
