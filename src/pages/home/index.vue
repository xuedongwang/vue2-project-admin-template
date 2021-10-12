<template>
  <div class="home" v-if="statistics">
    <a-row :gutter="16">
      <a-col :span="8">
        <a-card  :bordered="false">
          <a-statistic
            title="文章"
            :value="statistics.articleCount"
            suffix="篇"
          >
          </a-statistic>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card  :bordered="false">
          <a-statistic
            title="分类"
            :value="statistics.categoryCount"
            suffix="个"
          >
          </a-statistic>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card  :bordered="false">
          <a-statistic
            title="留言"
            :value="statistics.commentCount"
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
      name: '主页',
      statistics: null
    };
  },
  title () {
    return this.name;
  },
  mounted () {
    this.fetchStatistics();
  },
  methods: {
    fetchStatistics () {
      const hide = this.$message.loading({
        content: '加载中...',
        duration: 0,
        key: 'key'
      });
      $http.get('/common/statistics')
        .then(res => {
          hide();
          this.statistics = res.data;
        })
        .catch(err => {
          this.$message.loading({
            content: '网络故障，请重试',
            key: 'key'
          });
          throw err;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
