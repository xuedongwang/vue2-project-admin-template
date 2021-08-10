<template>
  <a-layout class="common-layout">
    <a-layout-sider v-model="collapsed" :theme="menu.theme" :trigger="null" collapsible>
      <a-menu :theme="menu.theme" mode="inline" :default-selected-keys="['1']">
        <template v-for="menuItem of menu.list" >
          <a-sub-menu :key="menuItem.key" v-if="menuItem.children && menuItem.children.length > 0">
            <span slot="title"><a-icon v-if="menuItem.icon" :type="menuItem.icon" /><span>{{ menuItem.title }}</span></span>
            <a-menu-item v-for="menuItemChild of menuItem.children" :key="menuItemChild.key">
              {{ menuItemChild.title }}
            </a-menu-item>
          </a-sub-menu>
          <a-menu-item :key="menuItem.key" v-else>
            <a-icon v-if="menuItem.icon" :type="menuItem.icon" />
            <span v-if="menuItem.icon" style="margin-left: -5px;">{{ menuItem.title }}</span>
            <span v-else>{{ menuItem.title }}</span>
          </a-menu-item>
        </template>

      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="() => (collapsed = !collapsed)"
        />
      </a-layout-header>
      <a-layout-content
        :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
      >
        <slot></slot>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
export default {
  data () {
    return {
      collapsed: false,
      menu: this.$store.state.config.menu
    };
  }
};
</script>
<style lang="scss" scoped>
.common-layout {
  height: 100vh;
  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
    &:hover {
      color: #1890ff;
    }
  }
}
</style>
