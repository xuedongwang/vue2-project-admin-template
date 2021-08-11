import * as config from '@/config';
import router from '@/router';
const state = {
  config,
  router,
  breadcrumb: [
    {
      title: '主页',
      path: '/'
    },
    {
      title: '创建文章',
      path: ''
    }
  ]
};

export default state;
