<template>
  <div class="setting">
    <a-row type="flex" justify="space-between">
      <a-col style="width:300px;">
        <tab-menu @input="handleInput" :value="value" :tabs="tabs"></tab-menu>
      </a-col>
      <a-col style="width:calc(100% - 20px - 300px)">
        <person-info v-if="value==='profile'"></person-info>
        <account-manage v-if="value === 'account'"></account-manage>
        <site-setting v-if="value === 'site'"></site-setting>
        <notification-manage v-if="value === 'notification-manage'"></notification-manage>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import PersonInfo from './components/person-info.vue';
import SiteSetting from './components/site-setting.vue';
import AccountManage from './components/account-manage.vue';
import NotificationManage from './components/notification-manage.vue';
export default {
  components: {
    PersonInfo,
    SiteSetting,
    AccountManage,
    NotificationManage
  },
  data () {
    return {
      value: '',
      tabs: [
        {
          text: '个人信息',
          id: 'profile'
        },
        {
          text: '账户管理',
          id: 'account'
        },
        {
          text: '网站设置',
          id: 'site'
        },
        {
          text: '通知管理',
          id: 'notification-manage'
        }
      ]
    };
  },
  created () {
    this.value = this.$route.params.type;
  },
  methods: {
    handleInput (value) {
      if (this.value === value) {
        return;
      }
      this.$router.push({
        name: 'settings',
        params: {
          type: value
        }
      });
      this.value = value;
    }
  }
};
</script>

<style lang="scss" scoped>
.setting {
}
</style>
