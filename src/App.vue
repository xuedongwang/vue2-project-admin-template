<template>
  <div class="app">
    <component :is="$route.meta.layout">
      <router-view></router-view>
    </component>
  </div>
</template>

<script>
import BlankLayout from './layouts/blank-layout.vue';
import CommonLayout from './layouts/common-layout.vue';
export default {
  name: 'App',
  components: {
    BlankLayout,
    CommonLayout
  },
  mounted () {
    console.log('store:', this.$store);
  }
};
</script>

<style>

</style>
