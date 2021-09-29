<template>
  <div class="message" v-if="message">
    <a-row>
      <a-col>
        <a-card class="card">
          <div class="card-head">
            <div class="head-left head-inner">
              <div class="head-inner-item head-inner-item--active">
                <span style="margin-right:5px;">用户留言</span>
                <a-badge :count="message.total" /></div>
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
      replaying: false
    };
  },
  computed: {
    user() {
      return this.$store.state.user.info || {};
    }
  },
  mounted() {
    this.fetchComment();
  },
  methods: {
    handleSubmit() {
      this.replaying = true;
      setTimeout(() => {
        this.replaying = false;
        this.visible = false;
      }, 1000);
      console.log(this.replayContent);
    },
    fetchComment() {
      $http.get('/message/list')
        .then(res => {
          this.message = res.data;
        })
        .catch(err => {
          throw err;
        });
    },
    handleOk() {
      this.confirmLoading = true;
      setTimeout(() => {
        this.confirmLoading = false;
        this.visible = false;
      }, 1000);
    },
    handleCancel() {},
    handleReplay(user) {
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
