
export default {
  theme: 'dark', // light|dark
  mode: 'inline',
  'default-selected-keys': ['1'],
  list: [
    {
      key: 'home',
      icon: 'home',
      title: '主页'
    },
    {
      key: 'dsad',
      icon: 'home',
      title: '主页',
      children: [
        {
          key: '主页',
          title: '主页'
        }
      ]
    }
  ]
};
