<template>
  <div class="rich-editor">
    <rich-editor-menu></rich-editor-menu>
    <rich-editor></rich-editor>
  </div>
</template>

<script>
import RichEditor from './rich-editor';
import RichEditorMenu from './rich-editor-menu';
export default {
  components: {
    RichEditor,
    RichEditorMenu
  }
};
</script>

<style>

</style>
