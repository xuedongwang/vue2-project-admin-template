import TabMenu from './src/main';

TabMenu.install = Vue => {
  Vue.component(TabMenu.name, TabMenu);
};

export default TabMenu;
