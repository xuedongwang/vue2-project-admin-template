<template>
  <div class="home">
    <a-row :gutter="16">
      <a-col :span="8">
        <a-card  :bordered="false">
          <a-statistic
            title="文章"
            :value="112893"
            suffix="篇"
          >
          </a-statistic>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card  :bordered="false">
          <a-statistic
            title="分类"
            :value="112893"
            suffix="个"
          >
          </a-statistic>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card  :bordered="false">
          <a-statistic
            title="留言"
            :value="112893"
            suffix="条"
          >
          </a-statistic>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: '主页'
    };
  },
  breadcrumb () {
    return [
      {
        title: '主页',
        path: '/'
      },
      {
        title: '创建文章1',
        path: ''
      }
    ];
  },
  title () {
    return this.name;
  }
};
</script>

<style lang="scss" scoped>
</style>
