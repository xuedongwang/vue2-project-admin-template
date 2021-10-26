const routes = [
  {
    name: 'home',
    path: '/',
    component: () => import('../pages/home'),
    meta: {
      layout: 'CommonLayout',
      needLogin: true
    }
  },
  {
    name: 'article-manage',
    path: '/article/manage',
    component: () => import('../pages/article/manage'),
    meta: {
      layout: 'CommonLayout',
      needLogin: true
    }
  },
  {
    name: 'message',
    path: '/message/:type',
    component: () => import('../pages/message'),
    meta: {
      layout: 'CommonLayout',
      needLogin: true,
      activeMenu: '/message/moderated'
    }
  },
  {
    name: 'source',
    path: '/source/:type',
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
      needLogin: true,
      activeMenu: '/settings/profile'
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
    path: '/category/manage',
    component: () => import('../pages/category/manage'),
    meta: {
      layout: 'CommonLayout',
      needLogin: true
    }
  },
  {
    name: 'create-category',
    path: '/category/create/:id?',
    alias: '/category/edit/:id',
    component: () => import('../pages/category/create'),
    meta: {
      layout: 'CommonLayout',
      needLogin: true,
      activeMenu: '/category/manage'
    }
  },
  {
    name: 'tag-manage',
    path: '/tag/manage',
    component: () => import('../pages/tag/manage'),
    meta: {
      layout: 'CommonLayout',
      needLogin: true
    }
  },
  {
    name: 'create-tag',
    path: '/tag/create/:id?',
    alias: '/tag/edit/:id',
    component: () => import('../pages/tag/create'),
    meta: {
      layout: 'CommonLayout',
      needLogin: true
    }
  },
  {
    name: 'user-manage',
    path: '/user/manage',
    component: () => import('../pages/user/manage'),
    meta: {
      layout: 'CommonLayout',
      needLogin: true
    }
  },
  {
    name: 'create-user',
    path: '/user/create/:id?',
    alias: '/user/edit/:id',
    component: () => import('../pages/user/create'),
    meta: {
      layout: 'CommonLayout',
      needLogin: true,
      activeMenu: '/user/manage'
    }
  },
  {
    name: 'page-manage',
    path: '/page/manage',
    component: () => import('../pages/page/manage'),
    meta: {
      layout: 'CommonLayout',
      needLogin: true
    }
  },
  {
    name: 'page-view',
    path: '/page/:id',
    component: () => import('../pages/page/view'),
    meta: {
      layout: 'BlankLayout'
    }
  },
  {
    name: 'create-page',
    path: '/page/create/:id',
    alias: '/page/edit/:id',
    component: () => import('../pages/page/create'),
    meta: {
      layout: 'BlankLayout',
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
  { // 找回密码
    name: 'password-reset',
    path: '/password/reset',
    component: () => import('../pages/password/reset'),
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
    name: '500',
    path: '/500',
    component: () => import('../pages/500'),
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
