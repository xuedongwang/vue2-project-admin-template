<template>
  <div class="message">
    <a-row type="flex" justify="space-between">
      <a-col style="width:300px;">
        <tab-menu v-model="value" :tabs="tabs"></tab-menu>
      </a-col>
      <a-col style="width:calc(100% - 20px - 300px)">
        <a-card class="card">
          <div class="card-head">
            <div class="head-left head-inner">
              <div class="head-inner-item head-inner-item--active">
                <span style="margin-right:5px;">未读消息</span>
                <a-badge count="25" /></div>
              <div class="head-inner-item">已读消息</div>
            </div>
            <div class="head-right head-inner">
              <div class="head-inner-item">
                <a-icon type="setting" />
                <span style="margin-left:5px;">消息设置</span>
              </div>
              <div class="head-inner-item">全部删除</div>
            </div>
          </div>
          <div class="card-body">
            <a-list item-layout="horizontal" :data-source="data">
              <a-list-item slot="renderItem" slot-scope="item">
                <a-list-item-meta
                  description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                >
                  <a slot="title" href="https://www.antdv.com/">{{ item.title }}</a>
                  <a-avatar
                    slot="avatar"
                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  />
                </a-list-item-meta>
              </a-list-item>
              <div
                v-if="hasData"
                slot="loadMore"
                :style="{ textAlign: 'center', marginTop: '12px' }"
              >
                <template v-if="loadMoreLoading">
                  <a-skeleton avatar :paragraph="{ rows: 1 }" />
                  <a-skeleton avatar :paragraph="{ rows: 1 }" />
                  <a-skeleton avatar :paragraph="{ rows: 1 }" />
                </template>
                <a-button v-else @click="onLoadMore">加载更多</a-button>
              </div>
            </a-list>
          </div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
const data = [
  {
    title: 'Ant Design Title 1'
  },
  {
    title: 'Ant Design Title 2'
  },
  {
    title: 'Ant Design Title 3'
  },
  {
    title: 'Ant Design Title 4'
  }
];
export default {
  data () {
    return {
      hasData: true,
      loadMoreLoading: false,
      data,
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
    onLoadMore () {
      this.loadMoreLoading = true;
      setTimeout(() => {
        this.data.push(...data);
        this.loadMoreLoading = false;
      }, 2000);
    },
    onChange (e) {
      console.log(e.target.value);
    }
  }
};
</script>

<style lang="scss" scoped>
.message {
  .card {
    &-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 50px;
      margin-top: -24px;
      padding: 20px 0;
      color: #8c8c8c;
      border-bottom: 1px solid #e8e8e8;
    }
    .head-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      &-item {
        cursor: pointer;
        transition: color 2s;
        display: flex;
        align-items: center;
        &--active {
          font-weight: 500;
          color: #262626;
        }
        &:not(:last-child) {
          margin-right: 20px;
        }
      }
    }
  }
}
</style>
