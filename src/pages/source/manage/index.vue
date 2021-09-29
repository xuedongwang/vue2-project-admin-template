<template>
  <div class="source">
    <a-card>
      <a-tabs v-model="sourceType" default-active-key="2" size="small">
        <a-tab-pane v-for="tab of tabs" :key="tab.key" :tab="tab.name">
          <a-row>
            <a-button type="primary">
              上传<a-icon type="cloud-upload" />
            </a-button>
          </a-row>
          Content of tab 1
        </a-tab-pane>
      </a-tabs>
    </a-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sourceType: 'img',
      tabs: [
        {
          name: '图片',
          key: 'img'
        },
        {
          name: '视频',
          key: 'video'
        },
        {
          name: '语音',
          key: 'aduio'
        }
      ]
    }
  }
}
</script>

<style>

</style>