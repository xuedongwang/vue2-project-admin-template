const routes = [
  {
    path: '/',
    component: () => import('../pages/home/index.vue'),
    meta: {
      layout: 'CommonLayout'
    }
  },
  {
    path: '/login',
    component: () => import('../pages/login/index.vue'),
    meta: {
      layout: 'BlankLayout'
    }
  },
  {
    path: '*',
    component: () => import('../pages/404/index.vue'),
    meta: {
      layout: 'BlankLayout'
    }
  }
];

export default routes;
