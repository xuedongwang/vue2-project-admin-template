<template>
  <div class="tab-menu">
    <div class="tab-menu-content">
      <div
        class="tab-menu-content-item"
        v-for="tab of tabs"
        :key="tab.id"
        :class="{'tab-menu-content-item--active': tab.id === value}"
        @click="$emit('input', tab.id)"
      >
        <span class="text">{{ tab.text }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabMenu',
  props: {
    value: {
      type: [String, Number],
      required: true
    },
    tabs: {
      type: Array,
      default () {
        return [];
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.tab-menu {
  background: #fff;
  &-content {
    &-item {
      height: 48px;
      line-height: 48px;
      color: #595959;
      padding-left: 24px;
      padding-right: 16px;
      border: 1px solid #e8e8e8;
      cursor: pointer;
      transition: color .3s, border-color .3s;
      box-sizing: border-box;
      &--active {
        border-left-color: #25b864;
        border-left-width: 2px;
        padding-left: 23px;
        font-weight: 500;
        color: #262626;
      }
      &:not(:last-child) {
        border-bottom: 0;
      }
      &:not(&--active):hover {
        color: #8c8c8c;
      }
      .text {}
    }
  }
}
</style>
