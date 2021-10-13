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
          <span class="username">{{ user.name }}</span>
          <a-tag color="blue">管理员</a-tag>
          <a-dropdown :trigger="['click']">
            <a-avatar size="large" :src="user.avatar" icon="user" class="pointer" />
            <a-menu slot="overlay">
              <template v-for="(item, index) of avatarDropDownMenuList">
                <a-menu-item :key="index" v-if="item.type === 'link'">
                  <a v-bind="item.props">{{ item.title }}</a>
                </a-menu-item>
                <a-menu-divider :key="index" v-else-if="item.type === 'divider'" />
                <a-menu-item @click="item.handler(item.name)" :key="index" v-else-if="item.type === 'text'">
                  {{ item.title }}
                </a-menu-item>
              </template>
            </a-menu>
          </a-dropdown>
        </div>
      </a-layout-header>
      <a-layout-content class="content" :class="{'has-breadcumb': hasBreadcrumb}">
        <a-breadcrumb class="breadcrumb" v-if="hasBreadcrumb">
          <template v-for="item of breadcrumb">
            <a-breadcrumb-item v-if="item.path" :key="item.title">
              <a :href="item.path">{{ item.title }}</a>
            </a-breadcrumb-item>
            <a-breadcrumb-item :key="item.title" v-else>{{ item.title }}</a-breadcrumb-item>
          </template>
        </a-breadcrumb>
        <slot></slot>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import { menu } from '@/config';
export default {
  data () {
    return {
      collapsed: false,
      menu,
      currentMenu: [],
      avatarDropDownMenuList: [
        {
          title: '个人资料',
          type: 'text',
          handler: () => {
            this.$router.push('/settings/profile');
          }
        },
        {
          type: 'divider'
        },
        {
          title: '退出',
          type: 'text',
          handler: () => {
            this.$store.dispatch('loginOut');
          }
        }
      ]
    };
  },
  computed: {
    user () {
      return this.$store.state.user.info || {};
    },
    breadcrumb () {
      return this.$store.state.breadcrumb;
    },
    hasBreadcrumb () {
      return this.breadcrumb.length > 0;
    }
  },
  methods: {
    handleMenuSelect ({ key: path }) {
      this.$router.push(path);
    },
    setPathFromRoute (route) {
      this.currentMenu = [route.path];
    }
  },
  created () {
    this.setPathFromRoute(this.$route);
  },
  beforeRouteUpdate (to, from, next) {
    this.setPathFromRoute(to);
    next();
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
    min-height: 280px;
    flex: none;
    &.has-breadcumb {
      margin-top: 0;
    }
    .breadcrumb {
      padding: 10px 0;
    }
  }

}
</style>
