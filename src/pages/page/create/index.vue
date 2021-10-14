<template>
  <div class="create-article">
    <a-row>
      <a-col :span="24">
        <a-page-header
          :title="`${isEdit ? '编辑' : '创建'}页面`"
          :ghost="false"
          sub-title="编辑后自动保存"
          @back="() => $router.back()"
        >
          <template slot="tags">
            <a-tag color="blue">
              已保存
            </a-tag>
          </template>
          <template slot="extra">
            <a-button key="2">保存</a-button>
            <a-button key="1" type="primary" @click="drawVisiable=true">发布</a-button>
          </template>
        </a-page-header>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="24">
        <rich-editor
          :title.sync="form.title"
          v-model="form.content"
        ></rich-editor>
      </a-col>
    </a-row>
    <a-drawer
      title="发布页面"
      placement="top"
      height="auto"
      :visible="drawVisiable"
      @close="handleDrawerClose"
    >
      <a-form-model
        ref="publishForm"
        :model="form"
        :rules="rules"
        v-bind="formItemLayout"
      >
        <a-form-model-item label="页面地址" prop="title">
          <a-input v-model="form.url" disabled>
            <a-icon slot="addonAfter" type="copy" />
          </a-input>
        </a-form-model-item>
        <a-form-model-item label="页面标题" prop="title">
          <a-input v-model="form.title" />
        </a-form-model-item>
        <a-form-model-item label="页面简介" prop="description">
          <a-input v-model="form.description" type="textarea" :autosize="{ minRows: 2, maxRows: 6 }" />
        </a-form-model-item>
        <a-form-model-item label="页面标签" prop="tags">
          <a-select v-model="form.tags" :allowClear="true" mode="tags">
            <a-select-option :value="tag.value" v-for="tag of defaultTags" :key="tag.name">{{ tag.name }}</a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="定时发布">
          <a-switch v-model="form.isTimedRelease" />
        </a-form-model-item>
        <a-form-model-item label="定时发布时间" v-if="form.isTimedRelease" required prop="timedReleaseDate">
          <a-date-picker
            v-model="form.timedReleaseDate"
            show-time
            type="date"
            style="width: 100%;"
          />
        </a-form-model-item>
        <a-form-model-item label="允许评论">
          <a-switch v-model="form.isAllowComment" />
        </a-form-model-item>
        <a-form-model-item :wrapper-col="buttonItemLayout">
          <a-space>
            <a-button type="primary" @click="handlePublish">发布</a-button>
            <a-button @click="handleResetForm">重置</a-button>
          </a-space>
        </a-form-model-item>
      </a-form-model>
    </a-drawer>
  </div>
</template>

<script>
import RichEditor from '@/components/rich-editor';
const formRules = {
  title: [
    { required: true, message: '请输入页面标题', trigger: 'blur' },
    { min: 1, max: 50, message: '页面标题长度为1-50', trigger: 'blur' }
  ],
  description: [
    { min: 0, max: 500, message: '页面描述长度最长为500', trigger: 'blur' }
  ],
  category: [{ required: true, message: '每篇页面必须有一个分类', trigger: 'blur' }],
  tags: [{ required: true, message: '每篇页面至少有一个标签', trigger: 'change' }],
  timedReleaseDate: [{ required: true, message: '定时发送时，定时发送的时间必选', trigger: 'change' }],
  originalAuthor: [{ required: true, message: '非原创页面，原创作者必填', trigger: 'change' }],
  originalLink: [{ required: true, message: '非原创页面，原创链接必填', trigger: 'change' }]
};
const DEFAULT_TAGS = [
  {
    name: 'HTML',
    value: 'html'
  },
  {
    name: 'CSS',
    value: 'css'
  },
  {
    name: 'JavaScript',
    value: 'javascript'
  }
];
export default {
  components: {
    RichEditor
  },
  computed: {
    isEdit () {
      return this.$route.path.includes('/article/edit');
    }
  },
  watch: {
    form: {
      handler ({ title, content }) {
        console.log(content);
        localStorage.setItem('content', content);
        localStorage.setItem('title', title);
      },
      deep: true
    }
  },
  data () {
    return {
      drawVisiable: false,
      defaultTags: DEFAULT_TAGS,
      userCategories: DEFAULT_TAGS,
      form: {
        url: `${location.origin}/page/${this.$route.params.id}`,
        title: localStorage.getItem('title') ?? '',
        content: localStorage.getItem('content') ?? '',
        description: '',
        category: '',
        tags: [],
        isTimedRelease: false,
        timedReleaseDate: '',
        isPrivate: false,
        isOriginal: true,
        originalAuthor: '',
        originalLink: '',
        isAllowComment: true
      },
      rules: formRules,
      formItemLayout: {
        labelCol: { span: 2 },
        wrapperCol: { span: 22 }
      },
      buttonItemLayout: {
        span: 22,
        offset: 2
      }
    };
  },
  title () {
    return '';
  },
  methods: {
    handleDrawerClose () {
      this.drawVisiable = false;
    },
    handlePublish () {
      this.$refs.publishForm.validate(valid => {
        if (valid) {
          console.log(this.form);
          // alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    handleResetForm () {
      this.$refs.publishForm.resetFields();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
