<template>
  <div class="message" v-if="source">
    <a-space direction="vertical" style="width:100%;">
      <a-row>
        <a-col :span="24">
          <a-card title="资源管理" :bordered="false">
            <!-- 筛选 -->
            <a-radio-group :value="value" @change="handleMsgTypeChange">
              <a-radio-button value="all">全部 (12)</a-radio-button>
              <a-radio-button value="picture">图片 (2)</a-radio-button>
              <a-radio-button value="video">视频 (3)</a-radio-button>
              <a-radio-button value="pdf">PDF (45)</a-radio-button>
              <a-radio-button value="audio">语音 (45)</a-radio-button>
              <a-radio-button value="zip">压缩包 (34)</a-radio-button>
              <a-radio-button value="other">其他 (34)</a-radio-button>
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
                  <span style="margin-right:5px;">资源列表</span>
                </div>
              </div>
            </div>
            <div class="card-body">
              <a-row :gutter="16">
                <a-col :xs="8" :sm="6" :md="4" :lg="3" :xl="2" style="margin-top: 10px;" v-for="item of source.list" :key="item.id">
                  <div class="source-item-wrapper" v-if="item.type === 'image/png'">
                    <img class="source-item" :src="item.src" :alt="item.description">
                  </div>
                  <div class="source-item-wrapper" v-if="item.type === 'application/zip'">
                    <a-icon class="source-item icon" type="file-zip" />
                    <div class="source-name">{{ item.name }}</div>
                  </div>
                  <div class="source-item-wrapper" v-if="item.type === 'application/pdf'">
                    <a-icon class="source-item icon" type="file-pdf" />
                    <div class="source-name">{{ item.name }}</div>
                  </div>
                  <div class="source-item-wrapper" v-if="item.type === 'video/mp4'">
                    <a-icon class="source-item icon" type="video-camera" />
                    <div class="source-name">{{ item.name }}</div>
                  </div>
                  <div class="source-item-wrapper" v-if="item.type === 'audio/wav'">
                    <a-icon class="source-item icon" type="audio" />
                    <div class="source-name">{{ item.name }}</div>
                  </div>
                  <div class="source-item-wrapper" v-if="item.type === 'unknown'">
                    <a-icon class="source-item icon" type="file-unknown" />
                    <div class="source-name">{{ item.name }}</div>
                  </div>
                  <!-- <div class="source-item-wrapper" v-if="item.type === 'application/zip'">
                    <img class="source-item" :src="item.src" :alt="item.description">
                  </div> -->
                </a-col>
              </a-row>
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
      searchForm: {
        user: ''
      },
      hasData: true,
      loadMoreLoading: false,
      confirmLoading: false,
      visible: false,
      currentMessage: null,
      data: [],
      ModalText: 'dasdasd',
      source: null,
      action: null,
      replayContent: '',
      replaying: false
    };
  },
  computed: {
    user() {
      return this.$store.state.user.info || {};
    },
    value() {
      return this.$route.params.type;
    }
  },
  mounted() {
    this.fetchSource();
  },
  methods: {
    handleSearch() {},
    handleMsgTypeChange(e) {
      const path = `/source/${e.target.value}`;
      this.$router.push(path);
    },
    handleSubmit() {
      this.replaying = true;
      setTimeout(() => {
        this.replaying = false;
        this.visible = false;
      }, 1000);
      console.log(this.replayContent);
    },
    fetchSource() {
      const hide = this.$message.loading({
        content: '加载中...',
        duration: 0,
        key: 'key'
      });
      $http.get('/source/list')
        .then(res => {
          hide();
          this.source = res.data;
        })
        .catch(err => {
          this.$message.error({
            content: '网络故障，请重试',
            key: 'key'
          });
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
    .source-item-wrapper {
      width: 100%;
      height: 0;
      padding: 50% 0;
      position: relative;
      box-shadow: inset 0 0 15px rgba(0,0,0,0.1), inset 0 0 0 1px rgba(0,0,0,0.05);
      overflow: hidden;
      cursor: pointer;
      .source-item {
        position: absolute;
        width: 100%;
        top: 50%;
        transform: translateY(-50%);
        &.icon {
          font-size: 40px;
        }
      }
      .source-name {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        line-height: 26px;
        text-align: center;
        font-weight: 600;
        background: #fff;
        font-size: 12px;
        box-shadow: inset 0 0 0 1px rgba(0, 0,0,.15);
      }
    }
  }
}
</style>
