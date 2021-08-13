<template>
  <div class="create-article">
    <a-row v-if="false">
      <a-col :span="24">
        <a-page-header
          title="创建文章"
          :ghost="false"
          sub-title="编辑后自动保存"
          @back="() => $router.back()"
        >
          <template slot="tags">
            <a-tag color="blue">
              已保存
            </a-tag>
          </template>
          <template slot="extra">
            <a-button key="2">
              保存
            </a-button>
            <a-button key="1" type="primary">
              发布
            </a-button>
          </template>
        </a-page-header>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="24">
        <rich-editor></rich-editor>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import RichEditor from '@/components/rich-editor';
export default {
  components: {
    RichEditor
  },
  data () {
    return {};
  },
  title: 'admin',
  methods: {}
};
</script>

<style lang="scss" scoped>
</style>
