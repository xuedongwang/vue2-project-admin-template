<template>
  <div class="create-article">
    <a-row>
      <a-col :span="24">
        <a-page-header
          :title="`${isEdit ? '编辑' : '创建'}文章`"
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
            <a-button key="2" @click="handleSave">保存</a-button>
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
          ref="richEditorRef"
          v-if="!loading"
        ></rich-editor>
      </a-col>
    </a-row>
    <a-drawer
      title="发布文章"
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
        <a-form-model-item label="文章标题" prop="title">
          <a-input v-model="form.title" />
        </a-form-model-item>
        <a-form-model-item label="文章简介" prop="description">
          <a-input v-model="form.description" type="textarea" :autosize="{ minRows: 2, maxRows: 6 }" />
        </a-form-model-item>
        <a-form-model-item label="文章分类" prop="category">
          <a-select v-model="form.category">
            <a-select-option :value="category.id" v-for="category of userCategories" :key="category.id">{{ category.name }}</a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="文章标签" prop="tags">
          <a-select v-model="form.tags" :allowClear="true" mode="tags">
            <a-select-option :value="tag.name" v-for="tag of defaultTags" :key="tag.id">{{ tag.name }}</a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="定时发布">
          <a-switch v-model="form.isTimedSend" />
        </a-form-model-item>
        <a-form-model-item label="定时发布时间" v-if="form.isTimedSend" required prop="timedSendDate">
          <a-date-picker
            v-model="form.timedSendDate"
            show-time
            type="date"
            style="width: 100%;"
          />
        </a-form-model-item>
        <a-form-model-item label="是否隐私">
          <a-switch v-model="form.isPrivate" />
        </a-form-model-item>
        <a-form-model-item label="是否原创">
          <a-switch v-model="form.isOriginal" />
        </a-form-model-item>
        <template v-if="!form.isOriginal">
          <a-form-model-item label="原创作者" prop="originalAuthor">
            <a-input v-model="form.originalAuthor"/>
          </a-form-model-item>
          <a-form-model-item label="原创链接" prop="originalLink">
            <a-input v-model="form.originalLink"/>
          </a-form-model-item>
        </template>
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
import { titleMixin } from '@/mixins';
import RichEditor from '@/components/rich-editor';
const formRules = {
  title: [
    { required: true, message: '请输入文章标题', trigger: 'blur' },
    { min: 1, max: 50, message: '文章标题长度为1-50', trigger: 'blur' }
  ],
  description: [
    { min: 0, max: 500, message: '文章描述长度最长为500', trigger: 'blur' }
  ],
  category: [{ required: true, message: '每篇文章必须有一个分类', trigger: 'blur' }],
  tags: [{ required: true, message: '每篇文章至少有一个标签', trigger: 'change' }],
  timedSendDate: [{ required: true, message: '定时发送时，定时发送的时间必选', trigger: 'change' }],
  originalAuthor: [{ required: true, message: '非原创文章，原创作者必填', trigger: 'change' }],
  originalLink: [{ required: true, message: '非原创文章，原创链接必填', trigger: 'change' }]
};
export default {
  mixins: [titleMixin],
  title () {
    return this.isEdit ? '编辑文章' : '创建文章';
  },
  components: {
    RichEditor
  },
  computed: {
    isEdit () {
      return this.$route.path.includes('/article/edit');
    },
    articleId() {
      return this.$route.params.id
    }
  },
  watch: {
    form: {
      handler ({ title, content }) {
        console.log(content);
      },
      deep: true
    }
  },
  data () {
    return {
      loading: false,
      drawVisiable: false,
      defaultTags: [],
      userCategories: [],
      form: {
        title: '',
        content: '',
        description: '',
        category: '',
        tags: [],
        isTimedSend: false,
        timedSendDate: '',
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
  mounted() {
    this.fetchCategoryList();
    this.fetchTagList();
    this.fetchArticleDetail();
  },
  methods: {
    fetchArticleDetail() {
      this.loading = true;
      const params = {
        id: this.articleId
      };
      $http.get('/article/detail', {
        params
      })
        .then(res => {
          this.form.title = res.data.title;
          this.form.description = res.data.description;
          this.form.content = res.data.content;
          this.form.category = res.data.category;
          this.form.tags = res.data.tags;
          this.form.isAllowComment = res.data.isAllowComment;
          this.form.isOriginal = res.data.isOriginal;
          this.form.isPrivate = res.data.isPrivate;
          this.form.isTimedSend = res.data.isTimedSend;
          this.form.timedSendDate = res.data.timedSendDate;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleDrawerClose () {
      this.drawVisiable = false;
    },
    fetchTagList () {
      const params = {};
      $http.get('/tag/list', {
        params
      })
        .then(res => {
          this.defaultTags = res.data.list;
        });
    },
    fetchCategoryList () {
      const params = {};
      $http.get('/category/list', {
        params
      })
        .then(res => {
          this.userCategories = res.data.list;
        });
    },
    saveArticle(isPublish) {
      const data = {
        ...this.form,
        id: this.articleId,
        isPublish
      }
      $http.post('/article/save', data)
        .then(res => {
          this.$message.success(this.isPublish ? '发布成功' : '保存成功')
            .then(() => {
              this.$router.back();
            })
          
        });
    },
    handleSave() {
      this.saveArticle(false);
    },
    handlePublish () {
      this.$refs.publishForm.validate(valid => {
        if (valid) {
          this.saveArticle(true);
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
