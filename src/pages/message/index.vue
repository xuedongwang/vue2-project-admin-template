<template>
  <div class="message">
    <a-row>
      <a-col style="width:300px;">
        <tab-menu v-model="value" :tabs="tabs"></tab-menu>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: '1',
      tabs: [
        {
          text: '全部消息',
          id: '1'
        },
        {
          text: '评论',
          id: '2'
        },
        {
          text: '系统通知',
          id: '3'
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
