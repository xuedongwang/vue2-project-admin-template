<template>
  <div class="message">
    <a-card :bordered="false">
      <a-tabs default-active-key="1" tab-position="left">
        <a-tab-pane :tab="tab.title" v-for="tab of tabs" :key="tab.key">
          <a-card title="Card title" :bordered="false">
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </a-card>
        </a-tab-pane>
      </a-tabs>
    </a-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: 'a',
      tabs: [
        {
          title: '全部消息',
          key: '1'
        },
        {
          title: '评论',
          key: '2'
        },
        {
          title: '系统通知',
          key: '3'
        }
      ]
    };
  },
  methods: {
    onChange (e) {
      console.log(e.target.value);
    }
  }
};
</script>

<style>

</style>
