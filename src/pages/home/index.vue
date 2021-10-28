<template>
  <div class="home" v-if="statistics">
    <a-row :gutter="16">
      <a-col :span="12">
        <a-card  :bordered="false">
          <a-statistic
            title="文章"
            suffix="篇"
          >
            <count-to slot="formatter" :startVal="0" :endVal="statistics.articleCount" :duration="1000"></count-to>
          </a-statistic>
        </a-card>
      </a-col>
      <a-col :span="12">
        <a-card  :bordered="false">
          <a-statistic
            title="分类"
            suffix="个"
          >
            <count-to slot="formatter" :startVal="0" :endVal="statistics.categoryCount" :duration="1000"></count-to>
          </a-statistic>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { titleMixin } from '@/mixins';
export default {
  mixins: [titleMixin],
  title: '主页',
  name: 'home',
  data () {
    return {
      statistics: {
        articleCount: 0,
        categoryCount: 0,
        commentCount: 0,
        userCount: 0
      }
    };
  },
  
  mounted () {
    this.fetchStatistics();
  },
  methods: {
    fetchStatistics () {
      $http.get('/common/statistics')
        .then(res => {
          this.statistics = res.data;
        })
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
