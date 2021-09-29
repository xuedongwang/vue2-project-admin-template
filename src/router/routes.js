const routes = [
  {
    path: '/',
    component: () => import('../pages/home'),
    meta: {
      layout: 'CommonLayout',
      needLogin: true
    }
  },
  {
    name: 'article-manage',
    path: '/article',
    component: () => import('../pages/article/manage'),
    meta: {
      layout: 'CommonLayout',
      needLogin: true
    }
  },
  {
    name: 'message',
    path: '/message',
    component: () => import('../pages/message'),
    meta: {
      layout: 'CommonLayout',
      needLogin: true
    }
  },
  {
    name: 'source',
    path: '/source',
    component: () => import('../pages/source/manage'),
    meta: {
      layout: 'CommonLayout',
      needLogin: true
    }
  },
  {
    name: 'settings',
    path: '/settings/:type',
    component: () => import('../pages/settings'),
    meta: {
      layout: 'CommonLayout',
      needLogin: true
    }
  },
  {
    name: 'create-article',
    path: '/article/create/:id',
    alias: '/article/edit/:id',
    component: () => import('../pages/article/create'),
    meta: {
      layout: 'BlankLayout'
    }
  },
  {
    name: 'category-manage',
    path: '/category',
    component: () => import('../pages/category/manage'),
    meta: {
      layout: 'CommonLayout',
      needLogin: true
    }
  },
  {
    name: 'create-category',
    path: '/category/create/:id',
    alias: '/category/edit/:id',
    component: () => import('../pages/category/create'),
    meta: {
      layout: 'CommonLayout',
      needLogin: true
    }
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('../pages/login'),
    meta: {
      layout: 'BlankLayout'
    }
  },
  {
    name: 'register',
    path: '/register',
    component: () => import('../pages/register'),
    meta: {
      layout: 'BlankLayout'
    }
  },
  {
    name: '403',
    path: '/403',
    component: () => import('../pages/403'),
    meta: {
      layout: 'BlankLayout'
    }
  },
  {
    name: 'not-fount',
    path: '*',
    component: () => import('../pages/404'),
    meta: {
      layout: 'BlankLayout'
    }
  }
];

export default routes;
