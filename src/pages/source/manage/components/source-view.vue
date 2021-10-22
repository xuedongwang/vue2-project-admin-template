<template>
  <div class="source-view">
    <div class="source-view-inner">source-view</div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.source-view {
  width: 100%;
  height: 0;
  padding: 50% 0;
  position: relative;
  border: 1px solid #dedede;
  &-inner {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
}
</style>