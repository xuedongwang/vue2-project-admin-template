
export default {
  theme: 'light', // light|dark
  mode: 'inline',
  'default-selected-keys': ['1'],
  list: [
    {
      key: '/',
      icon: 'home',
      title: '主页'
    },
    {
      key: '/article',
      icon: 'file-text',
      title: '文章管理'
    },
    {
      key: '/category',
      icon: 'book',
      title: '分类管理'
    },
    {
      key: '/user',
      icon: 'user',
      title: '用户管理',
      disabled: true
    },
    {
      key: 'tags',
      icon: 'tags',
      title: '标签管理',
      disabled: true
    },
    {
      key: '/message',
      icon: 'message',
      title: '留言管理'
    },
    {
      key: '/source',
      icon: 'folder-open',
      title: '资源管理',
    },
    {
      key: '/settings/profile',
      icon: 'setting',
      title: '网站设置'
    },
    {
      key: 'pay-circle',
      icon: 'pay-circle',
      title: '广告管理',
      disabled: true
    },
    {
      key: 'delete',
      icon: 'delete',
      title: '回收站',
      disabled: true
    }
  ]
};
