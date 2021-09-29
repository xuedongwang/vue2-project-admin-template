<template>
  <div class="setting">
    <a-row type="flex" justify="space-between">
      <a-col style="width:300px;">
        <tab-menu @input="handleInput" :value="value" :tabs="tabs"></tab-menu>
      </a-col>
      <a-col style="width:calc(100% - 20px - 300px)">
        <person-info v-if="value==='profile'"></person-info>
        <a-card class="card" title="账户管理" v-else-if="value === 'account'">
          <div class="card-body">
           account
          </div>
        </a-card>
        <a-card class="card" title="网站设置" v-if="value === 'site'">
          <div class="card-body">
           site
          </div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import PersonInfo from './components/person-info.vue';
export default {
  components: {
    PersonInfo
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
