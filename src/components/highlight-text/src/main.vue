<template>
  <span
    class="highlight-text"
    :class="{
      'highlight-text--warn': type === 'warn',
      'highlight-text--danger': type === 'danger',
      'highlight-text--bold': bold,
      'highlight-text--underline': underline
    }"
  >
    {{ $slots.default[0].text }}
  </span>
</template>

<script>
export default {
  name: 'highlight-text',
  props: {
    bold: {
      type: Boolean,
      default: true
    },
    underline: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'danger'
    }
  }
}
</script>

<style lang="scss">
.highlight-text {
  &--warn {
    color: #e6a23c;
  }
  &--danger {
    color: #ff4d4f;
  }
  &--bold {
    font-weight: bold;
  }
  &--underline {
    text-decoration: underline;
  }
}
</style>