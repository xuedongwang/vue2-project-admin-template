<template>
  <div class="not-found">
    <a-result status="404" class="main" title="404" sub-title="页面没找到">
      <template #extra>
        <a-button type="primary" @click="handleBackHome">
          回到首页
        </a-button>
      </template>
    </a-result>
  </div>
</template>

<script>
export default {
  name: 'no-found',
  methods: {
    handleBackHome () {
      this.$router.replace({
        name: 'home'
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.not-found {
  width: 100%;
  height: 100vh;
  display: flex;
  .main {
    margin: auto;
  }
}
</style>
