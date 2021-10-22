<template>
  <div class="source">
    <a-row>
      <a-col :span="24">
        <a-card title="资源管理" :bordered="false">
          <!-- 筛选 -->
          <a-radio-group :value="sourceType" @change="handleSourceTypeChange">
            <a-radio-button
              v-for="source of sourceTypes"
              :key="source.type"
              :value="source.type"
            >
              {{ source.name }} ({{ sourceCountMaps[source.type] }})
            </a-radio-button>
          </a-radio-group>
          <!-- 搜索 -->
          <a-form-model slot="extra" layout="inline" :model="searchForm" @submit="handleSearch" @submit.native.prevent>
            <a-form-model-item>
              <a-input v-model="searchForm.keyword" placeholder=""></a-input>
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
    <a-row style="margin-top:10px;">
      <a-col :span="24">
        <a-card class="card" title="资源列表">
          <template slot="extra">
            <input
              type="file"
              ref="uploadFileInputRef"
              :multiple="true"
              v-show="false"
              :accept="accept"
              @change="handleFileChange"
            >
            <a-button
              type="primary"
              @click="handleUpload"
              v-if="sourceType==='trash'"
            >
              恢复
            </a-button>
            <a-button
              type="primary"
              icon="upload"
              @click="handleUpload"
              v-else
            >
              上传
            </a-button>
          </template>
          <div class="card-body">
            <a-row :gutter="16">
              <a-col :xs="8" :sm="6" :md="4" :lg="3" :xl="2" style="margin-top: 10px;" v-for="item of source.list" :key="item.id">
                <div class="source-item-wrapper" @click="handleClickSource(item)" v-if="type(item.type) === 'picture'">
                  <img class="source-item" :src="item.src" :alt="item.description || item.name">
                </div>
                <div class="source-item-wrapper" @click="handleClickSource(item)" v-if="type(item.type) === 'zip'">
                  <a-icon class="source-item icon" type="file-zip" />
                  <div class="source-name">{{ item.name }}</div>
                </div>
                <div class="source-item-wrapper" @click="handleClickSource(item)" v-if="type(item.type) === 'pdf'">
                  <a-icon class="source-item icon" type="file-pdf" />
                  <div class="source-name">{{ item.name }}</div>
                </div>
                <div class="source-item-wrapper" @click="handleClickSource(item)" v-if="type(item.type) === 'video'">
                  <a-icon class="source-item icon" type="video-camera" />
                  <div class="source-name">{{ item.name }}</div>
                </div>
                <div class="source-item-wrapper" @click="handleClickSource(item)" v-if="type(item.type) === 'audio'">
                  <a-icon class="source-item icon" type="audio" />
                  <div class="source-name">{{ item.name }}</div>
                </div>
                <div class="source-item-wrapper" @click="handleClickSource(item)" v-if="type(item.type) === 'unknown'">
                  <a-icon class="source-item icon" type="file-unknown" />
                  <div class="source-name">{{ item.name }}</div>
                </div>
              </a-col>
            </a-row>
          </div>
        </a-card>
      </a-col>
    </a-row>
    <a-drawer
      height="auto"
      title="文件详情"
      placement="top"
      :visible="visible"
      @close="visible=false"
    >
      <a-row :gutter="10">
        <a-col :span="16">
          <source-view></source-view>
        </a-col>
        <a-col :span="8">
          <a-descriptions :column="1" title="附件信息" size="small">
            <a-descriptions-item label="文件名">{{ currentSource.name }}</a-descriptions-item>
            <a-descriptions-item label="上传于">{{ currentSource.createdAt | dayjs('YYYY年MM月DD日 hh:mm:ss') }}</a-descriptions-item>
            <a-descriptions-item label="上传者">{{ currentSource.author }}</a-descriptions-item>
            <a-descriptions-item label="文件类型">{{ currentSource.type }}</a-descriptions-item>
            <a-descriptions-item label="文件大小">{{ currentSource.size }}</a-descriptions-item>
            <a-descriptions-item label="文件地址">
              <span style="word-break: break-all;display:inline-block;vertical-align: top;width:400px;">
                {{ currentSource.url | autoPrefix }}
                <a-button
                  type="link"
                  size="small"
                  icon="copy"
                  @click="handleCopySourceUrl(currentSource.url)"
                ></a-button>
              </span>
            </a-descriptions-item>
          </a-descriptions>
          <a-divider />
          <a-form-model layout="horizontal" :model="form" v-bind="formItemLayout">
            <a-form-model-item labelAlign="left" label="文件标题">
              <a-input v-model="form.title"/>
            </a-form-model-item>
            <a-form-model-item labelAlign="left" label="文件标签">
              <a-select v-model="form.tags" mode="tags" style="width: 100%">
                <a-select-option v-for="tag of defaultSelectOptions" :key="tag">{{ tag }}</a-select-option>
              </a-select>
            </a-form-model-item>
            <a-form-model-item labelAlign="left" label="文件描述">
              <a-input v-model="form.description" type="textarea" />
            </a-form-model-item>
            <a-form-model-item :wrapper-col="buttonItemLayout.wrapperCol">
              <a-space>
                <a-button type="primary" @click="handleUpdateSourceInfo" :disabled="!isModify">保存</a-button>
                <a-button @click="handleResetForm" :disabled="!isModify">重置</a-button>
              </a-space>
            </a-form-model-item>
          </a-form-model>
        </a-col>
      </a-row>
    </a-drawer>
  </div>
</template>

<script>
import { titleMixin } from '@/mixins';
import SourceView from './components/source-view.vue';
import { cloneDeep, isEqual } from 'lodash-es';
const typeMap = {
  pdf: ['application/pdf'],
  picture: ['image/gif', 'image/png', 'image/jpeg', 'image/bmp', 'image/webp', 'image/x-icon', 'image/vnd.microsoft.icon'],
  audio: ['audio/midi', 'audio/mpeg', 'audio/webm', 'audio/ogg', 'audio/wav'],
  video: ['video/webm', 'video/ogg'],
  zip: ['application/zip']
};
export default {
  mixins: [titleMixin],
  title: '资源管理',
  components: {
    SourceView
  },
  data () {
    return {
      searchForm: {
        keyword: ''
      },
      sourceTypes: [
        {
          name: '全部',
          type: 'all'
        },
        {
          name: '图片',
          type: 'picture'
        },
        {
          name: '视频',
          type: 'video'
        },
        {
          name: 'PDF',
          type: 'pdf'
        },
        {
          name: '压缩包',
          type: 'zip'
        },
        {
          name: '其他',
          type: 'unknown'
        },
        {
          name: '回收站',
          type: 'trash'
        }
      ],
      sourceCountMaps: {
        all: 0,
        picture: 0,
        video: 0,
        pdf: 0,
        audio: 0,
        zip: 0,
        unknown: 0,
        trash: 0
      },
      pagination: {
        currentPage: 1,
        pageSize: 30
      },
      accept: '',
      editLoading: false,
      editText: '',
      visible: false,
      currentSource: {},
      source: {
        list: []
      },
      formItemLayout: {
         labelCol: { span: 4 },
          wrapperCol: { span: 14 },
      },
      buttonItemLayout: {
        wrapperCol: { span: 14, offset: 4 },
      },
      form: {
        title: '',
        tags: [],
        description: ''
      },
      bakForm: {
        title: '',
        tags: [],
        description: ''
      },
      defaultSelectOptions: [
        '风景',
        '狗狗'
      ]
    };
  },
  computed: {
    user () {
      return this.$store.state.user.info || {};
    },
    sourceType() {
      return this.$route.params.type ?? 'all'
    },
    isModify() {
      return !isEqual(this.form, this.bakForm);
    }
  },
  mounted () {
    this.fetchSource(this.sourceType);
  },
  beforeRouteUpdate(to, from, next) {
    this.fetchSource(to.params.type);
    next()
  },
  methods: {
    handleUpdateSourceInfo() {
      const data = {
        id: this.currentSource.id,
        ...this.form
      };
      this.editLoading = true;
      $http.post(API.SOURCE.UPDATE_FILE_INFO, data)
        .then(res => {
          console.log(res);
          this.editLoading = false;
          this.bakForm = cloneDeep(this.form)
        })
        .catch(err => {
          this.editLoading = false;
          throw err;
        });
    },
    handleResetForm() {
      this.form = cloneDeep(this.bakForm);
    },
    handleCopySourceUrl(text) {
      this.$copyText(this.$filters.autoPrefix(text))
        .then(() => {
          this.$message.success('复制成功');
        })
        .catch(() => {
          this.$message.error('复制失败,请重试');
        })
    },
    handleClickSource(source) {
      console.log(source);
      this.visible = true;
      this.currentSource = source;
      this.form = {
        title: source.title ?? '',
        description: source.description,
        tags: source.tags ?? []
      }
      this.bakForm = cloneDeep(this.form);
    },
    handleDelete(source) {
      const params = {
        id: source.id
      }
      $http.get(API.SOURCE.DELETE, {
        params
      })
        .then(res => {
          const index = this.source.list.findIndex(item => item.id === source.id);
          this.source.list.splice(index, 1);
        })
        .catch(err => {
          throw err;
        });
    },
    type(mime) {
      if (mime.startsWith('image/')) {
        return 'picture';
      } else if (mime.startsWith('video/')) {
        return 'video';
      } else if (mime.startsWith('audio/')) {
        return 'audio';
      } else if (mime.startsWith('application/pdf')) {
        return 'pdf';
      } else if (mime.startsWith('application/zip')) {
        return 'zip';
      } else {
        return 'unknown';
      }
    },
    handleFileChange(e) {
      const { files } = e.target;
      const uploadHandlers = Array.from(files).map(file => {
        return $upload({ file, userConfig: {
          showLoadingMsg: false
        } })
      });
      const hide = this.$message.loading({
        content: `正在上传${files.length}个文件...`,
        duration: 0,
      })
      Promise.allSettled(uploadHandlers)
        .then(res => {
          console.log(res)
          const targets = res.filter(item => item.status ===  'fulfilled').map(item => item.value.data)
          this.source.list.push(...targets);
          hide();
          e.target.value = '';
        })
    },
    handleUpload() {
      const type = this.sourceType;
      this.accept = typeMap[type] ? typeMap[type].join(',') : '';
      this.$nextTick(() => {
        this.$refs.uploadFileInputRef.click();
      })
    },
    handleSearch () {},
    handleSourceTypeChange (e) {
      const path = `/source/${e.target.value}`;
      this.$router.push(path);
    },
    fetchSource (type) {
      const params = {
        type,
        ...this.pagination
      }
      $http.get(API.SOURCE.LIST, {
        params
      })
        .then(res => {
          this.source = res.data;
          this.sourceCountMaps = {
            all: res.data.all,
            picture: res.data.picture,
            video: res.data.video,
            pdf: res.data.pdf,
            audio: res.data.audio,
            zip: res.data.zip,
            unknown: res.data.unknown,
            trash: res.data.trash
          }
        })
        .catch(err => {
          throw err;
        });
    },
  }
};
</script>
<style lang="scss" scoped>
.source {
  .card {
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
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: center;
        font-weight: 600;
        padding: 0 4px;
        background: #fff;
        font-size: 12px;
        box-shadow: inset 0 0 0 1px rgba(0, 0,0,.15);
      }
    }
  }
}
</style>
