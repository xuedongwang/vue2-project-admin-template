<template>
  <div class="no-power">
    <a-result status="warning" class="main" title="无权限" subTitle="请联系管理员">
      <template #extra>
        <a-button key="console" @click="handleBack" type="primary">
          返回
        </a-button>
      </template>
    </a-result>
  </div>
</template>

<script>
export default {
  name: 'no-found',
  methods: {
    handleBack () {
      this.$router.back();
    }
  }
};
</script>

<style lang="scss" scoped>
.no-power {
  width: 100%;
  height: 100vh;
  display: flex;
  .main {
    margin: auto;
  }
}
</style>
