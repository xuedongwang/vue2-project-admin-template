<template>
  <div class="app">
    <a-config-provider :locale="locale">
      <component :is="$route.meta.layout">
        <router-view></router-view>
      </component>
    </a-config-provider>
  </div>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
import BlankLayout from './layouts/blank-layout.vue';
import CommonLayout from './layouts/common-layout.vue';
export default {
  name: 'App',
  data () {
    return {
      locale: zhCN
    };
  },
  components: {
    BlankLayout,
    CommonLayout
  },
  mounted () {
    console.log('store:', this.$store);
  }
};
</script>

<style lang="scss" scoped>

</style>
