<template>
  <div class="rich-editor-paper">
    <div class="rich-editor-paper-inner">
      <div class="rich-editor-paper-inner-head">
        <input v-model="title" type="text" class="title-input" ref="titleInputRef" placeholder="请输入标题">
      </div>
      <div class="rich-editor-paper-inner-body">
        <editor-content
          class="rich-editor-paper-main"
          :editor="editor"
        >
        </editor-content>
      </div>
    </div>
  </div>
</template>

<script>
import { EditorContent } from '@tiptap/vue-2';
export default {
  props: {
    editor: {
      type: Object,
      default: null
    }
  },
  components: {
    EditorContent
  },
  data () {
    return {
      title: ''
    };
  },

  mounted () {
    this.$refs.titleInputRef && this.$refs.titleInputRef.focus();
    console.log(this.editor);
  },
  methods: {
    handleFocus () {
      if (this.editor.isFocused) return;
      this.editor && this.editor.commands.focus('end');
    }
  },

  beforeDestroy () {
    this.editor.destroy();
  }
};
</script>

<style lang="scss" scoped>
.rich-editor-paper {
  &-inner {
    width: 790px;
    height: 1120px;
    margin: 20px auto;
    background: #fff;
    box-shadow: 0 0 8px rgba(0, 0, 0, .1);
    &-head {
      padding: 100px 90px 10px;
    }
    &-body {
      height: calc(100% - 164px);
    }
    .title-input {
      border: 0;
      outline: 0;
      font-size: 36px;
      font-weight: bold;
      display: block;
      padding: 0;
      width: 100%;
      caret-color: #1890ff;
      &::placeholder {
        color: #ccc
      }
    }
  }
  &-main {
    height: 100%;
    /deep/ {
      .ProseMirror {
        caret-color: #1890ff;
        padding: 0 90px 20px;
        height: 100%;
        &.ProseMirror-focused {
          outline: none;
        }
      }
    }
  }
}
</style>
