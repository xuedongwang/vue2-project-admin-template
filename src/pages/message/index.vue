<template>
  <div class="message" v-if="message">
    <a-row>
      <a-col :span="24">
        <a-card title="留言管理" :bordered="false">
          <!-- 搜索 -->
          <a-radio-group :value="type" @change="handleMsgTypeChange">
            <a-radio-button
              v-for="item of messageTypeList"
              :key="item.type"
              :value="item.type"
            >
              {{ item.name }} ({{messageTypeMap[item.type]}})
            </a-radio-button>
          </a-radio-group>
          <!-- 搜索 -->
          <!-- <a-form-model slot="extra" layout="inline" :model="searchForm" @submit="handleSearch" @submit.native.prevent>
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
              <a-button @click="handleCreate">创建测试留言</a-button>
            </a-form-model-item>
          </a-form-model> -->
        </a-card>
      </a-col>
    </a-row>
    <a-row style="margin-top:10px">
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
            <div style="margin-top:10px;" v-if="message.list.length === 0">
              暂无评论
            </div>
            <a-comment v-for="message of message.list" :key="message.id">
              <template slot="actions">
                <!-- <span key="comment-basic-like">
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
                </span> -->
                <span v-if="!message.isDelete" key="comment-basic-reply-to" @click="handleReplay(message)">回复</span>
                <span key="comment-delete" @click="handleDelete(message)">删除</span>
                <span v-if="!message.isDelete && message.type === 'moderated'" key="comment-approved" @click="handleApproved(message)">审核通过</span>
              </template>
              <a slot="author">{{ message.name }}</a>
              <a-avatar
                slot="avatar"
                :src="message.avatar"
                alt="Han Solo"
              />
              <p slot="content">{{ message.message }}</p>
              <template v-if="message.children && message.children.length > 0">
                <a-comment v-for="item of message.children" :key="item.id">
                  <a slot="author">{{ item.name }}</a>
                  <a-avatar
                    slot="avatar"
                    :src="item.avatar"
                    :alt="item.name"
                  />
                  <p slot="content">{{ item.message }}</p>
                </a-comment>
              </template>
              <a-tooltip slot="datetime" :title="message.createdAt">
                <span>{{ message.createdAt | dayjs }}</span>
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
      messageTypeList: [{
        type: 'moderated',
        name: '待审'
      }, {
        type: 'approved',
        name: '已批准'
      }, {
        type: 'trash',
        name: '回收站'
      }],
      messageTypeMap: {
        moderated: 0,
        approved: 0,
        trash: 0
      },
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
      },
      pagination: {
        currentPage: 1,
        pageSize: 10
      }
    };
  },
  computed: {
    user () {
      return this.$store.state.user.info || {};
    },
    type () {
      return this.$route.params.type;
    }
  },
  mounted () {
    this.fetchComment();
  },
  beforeRouteUpdate (to, from, next) {
    this.fetchComment(to.params.type);
    next();
  },
  methods: {
    handleSearch () {},
    handleMsgTypeChange (e) {
      const path = `/message/${e.target.value}`;
      this.$router.push(path);
    },
    handleSubmit () {
      this.replaying = true;
      const data = {
        messageId: this.currentMessage.id,
        message: this.replayContent
      };
      $http.post('/message/create', data)
        .then(res => {
          this.replayContent = '';
          this.visible = false;
          this.$message.success('回复留言成功')
          this.fetchComment();
        })
        .finally(() => {
          this.replaying = false;
        })
    },
    handleCreate() {
      const data = {};
      $http.post('/message/create', data)
        .then(res => {
          this.$message.success('创建留言成功')
          this.fetchComment();
        })
    },
    fetchComment (type) {
      const params = {
        type: type || this.type,
        ...this.pagination
      };
      $http.get('/message/list', {
        params
      })
        .then(res => {
          this.message = res.data;
          this.messageTypeMap.moderated = res.data.moderated;
          this.messageTypeMap.approved = res.data.approved;
          this.messageTypeMap.trash = res.data.trash;
        })
    },
    handleApproved({id}) {
      const params = {
        id
      };
      $http.get('/message/approved', {
        params
      })
        .then(res => {
          this.$message.success('审核留言成功')
          this.fetchComment();
        })
    },
    handleDelete({ id }) {
      const params = {
        id,
        type: this.type
      }
      $http.get('/message/delete', {
        params
      })
      .then(res => {
        this.$message.success('删除成功')
        this.fetchComment();
      })
    },
    handleOk () {
      this.confirmLoading = true;
      setTimeout(() => {
        this.confirmLoading = false;
        this.visible = false;
      }, 1000);
    },
    handleReplay (message) {
      this.currentMessage = message;
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
