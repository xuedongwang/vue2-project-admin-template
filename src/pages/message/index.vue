<template>
  <div class="message" v-if="message">
    <a-space direction="vertical" style="width:100%;">
      <a-row>
        <a-col :span="24">
          <a-card title="留言管理" :bordered="false">
            <!-- 搜索 -->
            <a-radio-group :value="value" @change="handleMsgTypeChange">
              <a-radio-button value="all">全部 (12)</a-radio-button>
              <a-radio-button value="my">我的 (2)</a-radio-button>
              <a-radio-button value="moderated">待审 (3)</a-radio-button>
              <a-radio-button value="approved">已批准 (45)</a-radio-button>
              <a-radio-button value="spam">垃圾 (45)</a-radio-button>
              <a-radio-button value="trash">回收站 (34)</a-radio-button>
            </a-radio-group>
            <!-- 搜索 -->
            <a-form-model slot="extra" layout="inline" :model="searchForm" @submit="handleSearch" @submit.native.prevent>
              <a-form-model-item>
                <a-input v-model="searchForm.user" placeholder=""></a-input>
              </a-form-model-item>
              <a-form-model-item>
                <a-button
                  type="primary"
                  html-type="submit"
                  icon="search"
                >
                  搜索
                </a-button>
              </a-form-model-item>
            </a-form-model>
          </a-card>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <a-card class="card">
            <div class="card-head">
              <div class="head-left head-inner">
                <div class="head-inner-item head-inner-item--active">
                  <span style="margin-right:5px;">用户留言</span>
                </div>
              </div>
            </div>
            <div class="card-body">
              <a-comment v-for="message of message.list" :key="message.id">
                <template slot="actions">
                  <span key="comment-basic-like">
                    <a-tooltip title="Like">
                      <a-icon type="like" :theme="action === 'liked' ? 'filled' : 'outlined'" />
                    </a-tooltip>
                    <span style="padding-left: '8px';cursor: 'auto'">
                      {{ message.likes }}
                    </span>
                  </span>
                  <span key="comment-basic-dislike">
                    <a-tooltip title="Dislike">
                      <a-icon
                        type="dislike"
                        :theme="action === 'disliked' ? 'filled' : 'outlined'"
                      />
                    </a-tooltip>
                    <span style="padding-left: '8px';cursor: 'auto'">
                      {{ message.dislikes }}
                    </span>
                  </span>
                  <span key="comment-basic-reply-to" @click="handleReplay(message)">回复</span>
                </template>
                <a slot="author">{{ message.name }}</a>
                <a-avatar
                  slot="avatar"
                  :src="message.avatar"
                  alt="Han Solo"
                />
                <p slot="content">{{ message.message }}</p>
                <a-tooltip slot="datetime" :title="message.createdAt">
                  <span>{{ message.createdAt }}</span>
                </a-tooltip>
              </a-comment>
            </div>
          </a-card>
        </a-col>

      </a-row>
    </a-space>
    <a-modal
      wrapClassName="replay-message-dialog"
      :width="700"
      title="回复评论"
      :visible="visible"
      v-if="currentMessage"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="visible=false"
    >
    <div class="user-comment">{{ currentMessage.name }}在《{{ currentMessage.from }}》评论说：{{ currentMessage.message }}</div>
      <a-comment>
        <a-avatar
          slot="avatar"
          :src="user.avatar"
          :alt="user.name"
        />
        <div slot="content">
          <a-form-item>
            <a-textarea :rows="4" v-model="replayContent" />
          </a-form-item>
          <a-form-item>
            <a-button html-type="submit" :loading="replaying" type="primary" @click="handleSubmit">
              回复
            </a-button>
          </a-form-item>
        </div>
      </a-comment>
    </a-modal>
  </div>
</template>

<script>
export default {
  data () {
    return {
      hasData: true,
      loadMoreLoading: false,
      confirmLoading: false,
      visible: false,
      currentMessage: null,
      data: [],
      ModalText: 'dasdasd',
      message: null,
      action: null,
      replayContent: '',
      replaying: false,
      searchForm: {
        user: ''
      }
    };
  },
  computed: {
    user () {
      return this.$store.state.user.info || {};
    },
    value () {
      return this.$route.params.type;
    }
  },
  mounted () {
    this.fetchComment();
  },
  methods: {
    handleSearch () {},
    handleMsgTypeChange (e) {
      const path = `/message/${e.target.value}`;
      this.$router.push(path);
    },
    handleSubmit () {
      this.replaying = true;
      setTimeout(() => {
        this.replaying = false;
        this.visible = false;
      }, 1000);
      console.log(this.replayContent);
    },
    fetchComment () {
      const hide = this.$message.loading({
        content: '加载中...',
        duration: 0,
        key: 'key'
      });
      $http.get('/message/list')
        .then(res => {
          hide();
          this.message = res.data;
        })
        .catch(err => {
          this.$message.error({
            content: '网络故障，请重试',
            key: 'key'
          });
          throw err;
        });
    },
    handleOk () {
      this.confirmLoading = true;
      setTimeout(() => {
        this.confirmLoading = false;
        this.visible = false;
      }, 1000);
    },
    handleCancel () {},
    handleReplay (user) {
      this.currentMessage = user;
      this.visible = true;
    },
    onLoadMore () {
      this.loadMoreLoading = true;
      setTimeout(() => {
        this.message.list.push(...this.message.list);
        this.loadMoreLoading = false;
      }, 2000);
    }
  }
};
</script>
<style lang="scss">
.replay-message-dialog {
  .ant-modal-footer {
    display: none;
  }
}
</style>
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
