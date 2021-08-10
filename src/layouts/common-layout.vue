<template>
  <a-layout class="common-layout">
    <a-layout-sider v-model="collapsed" :theme="menu.theme" :trigger="null" collapsible>
      <a-menu @select="handleMenuSelect" v-model="currentMenu" :theme="menu.theme" mode="inline">
        <template v-for="menuItem of menu.list" >
          <a-sub-menu :key="menuItem.key" v-if="menuItem.children && menuItem.children.length > 0">
            <span slot="title"><a-icon v-if="menuItem.icon" :type="menuItem.icon" /><span>{{ menuItem.title }}</span></span>
            <a-menu-item :disabled="menuItemChild.disabled" v-for="menuItemChild of menuItem.children" :key="menuItemChild.key">
              {{ menuItemChild.title }}
            </a-menu-item>
          </a-sub-menu>
          <a-menu-item :disabled="menuItem.disabled" :key="menuItem.key" v-else>
            <a-icon v-if="menuItem.icon" :type="menuItem.icon" />
            <span v-if="menuItem.icon" style="margin-left: -5px;">{{ menuItem.title }}</span>
            <span v-else>{{ menuItem.title }}</span>
          </a-menu-item>
        </template>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="header">
        <div class="header-left">
          <a-icon
            class="toggle-fold-btn"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="() => (collapsed = !collapsed)"
          />
        </div>
        <div class="header-right">
          <span class="username">我是xxx</span>
          <a-tag color="red">超级管理员</a-tag>
          <!-- <a-tag color="green">管理员</a-tag>
          <a-tag color="blue">普通用户</a-tag> -->
          <a-avatar size="large" icon="user" />
        </div>
      </a-layout-header>
      <a-layout-content class="content">
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
      menu: this.$store.state.config.menu,
      currentMenu: []
    };
  },
  methods: {
    handleMenuSelect({ key: name }) {
      console.log(name);
      this.$router.push({
        name
      });
    },
    setPathFromRoute(route) {
      this.currentMenu = [route.path];
    }
  },
  created() {
    this.setPathFromRoute(this.$route);
  },
  beforeRouteUpdate(to) {
    this.setPathFromRoute(to);
  }
};
</script>
<style lang="scss" scoped>
.common-layout {
  height: 100vh;
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    background: #fff;
    &-left {
      .toggle-fold-btn {
        font-size: 18px;
        cursor: pointer;
        transition: color 0.3s;
        padding: 5px;
        &:hover {
          color: #1890ff;
        }
      }
    }
    &-right {}
  }
  .content {
    margin: 16px;
    padding: 20px;
    background: #fff;
    min-height: 280px;
    flex: none;
  }
  
}
</style>
