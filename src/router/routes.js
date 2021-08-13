const routes = [
  {
    path: '/',
    component: () => import('../pages/home'),
    meta: {
      layout: 'CommonLayout'
    }
  },
  {
    path: '/article',
    component: () => import('../pages/article/manage'),
    meta: {
      layout: 'CommonLayout'
    }
  },
  {
    path: '/article/create/:id',
    component: () => import('../pages/article/create'),
    meta: {
      layout: 'BlankLayout'
    }
  },
  {
    path: '/category',
    component: () => import('../pages/category'),
    meta: {
      layout: 'CommonLayout'
    }
  },
  {
    path: '/login',
    component: () => import('../pages/login'),
    meta: {
      layout: 'BlankLayout'
    }
  },
  {
    path: '/register',
    component: () => import('../pages/register'),
    meta: {
      layout: 'BlankLayout'
    }
  },
  {
    path: '/403',
    component: () => import('../pages/403'),
    meta: {
      layout: 'BlankLayout'
    }
  },
  {
    path: '*',
    component: () => import('../pages/404'),
    meta: {
      layout: 'BlankLayout'
    }
  }
];

export default routes;
