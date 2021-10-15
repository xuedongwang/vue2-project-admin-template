<template>
  <div class="error">
    <a-result status="500" class="main" title="500" sub-title="系统故障，请重试">
      <template #extra>
        <a-button type="primary" @click="handleRetry">
          重试
        </a-button>
      </template>
    </a-result>
  </div>
</template>

<script>
export default {
  name: 'server-error',
  methods: {
    handleRetry () {
      this.$router.replace({
        name: 'home'
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.error {
  width: 100%;
  height: 100vh;
  display: flex;
  .main {
    margin: auto;
  }
}
</style>

