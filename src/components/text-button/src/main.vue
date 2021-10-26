<template>
  <span
    class="text-button"
    :class="{
      'text-button--disabled': disabled,
      'text-button--primary': type === 'primary',
      'text-button--danger': type === 'danger'
    }"
    @click="handleClick"
    :disabled="disabled"
  >
    {{ $slots.default[0].text }}
  </span>
</template>

<script>
export default {
  name: 'text-button',
  props: {
    type: {
      type: String,
      default: 'primary'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClick(e) {
      if (this.disabled) return;
      this.$emit('click', e);
    }
  }
}
</script>

<style lang="scss">
.text-button {
  cursor: pointer;
  &--primary {
    color: #1890ff;
  }
  &--danger {
    color: #f5222d;
  }
  &--disabled {
    opacity: .5;
    cursor: no-drop;
  }
}
</style>