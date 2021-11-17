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
      <a-col :span="20" :offset="2">
        <!-- <rich-editor
          :title.sync="form.title"
          v-model="form.content"
          ref="richEditorRef"
          v-if="!loading"
        ></rich-editor> -->
        <!-- :initial-value="initValue" -->
        <input type="text" class="article-title" v-model="form.title">
        <editor
          api-key="0x9tmeopl6593uu56383wgbw274w9lbgs9eikd52upkq8yhj"
          :init="config"
          v-model="form.content"
          @input="handleInput"
        >
        </editor>
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
import Editor from "@tinymce/tinymce-vue";
import {
  plugins,
  toolbar,
  fontsizeFormats,
  fontFormats,
  language,
  contextmenu,
  templates,
} from "./config";
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
    RichEditor,
    editor: Editor,
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
      },
      config: {
        // skin:'oxide-dark',
        language,
        plugins,
        toolbar: toolbar.join(" "),
        height: 650, //编辑器高度
        min_height: 400,
        //可设置编辑区内容展示的css，谨慎使用
        content_css: [],
        branding: false,
        contextmenu,
        templates,
        fontsize_formats: fontsizeFormats.join(" "),
        font_formats: fontFormats.join(";"),
        placeholder: "请再次输入内容",
        link_list: [
          { title: "预置链接1", value: "http://www.tinymce.com" },
          { title: "预置链接2", value: "http://tinymce.ax-z.cn" },
        ],
        image_list: [
          {
            title: "预置图片1",
            value: "https://www.tiny.cloud/images/glyph-tinymce@2x.png",
          },
          {
            title: "预置图片2",
            value: "https://www.baidu.com/img/bd_logo1.png",
          },
        ],
        image_class_list: [
          { title: "None", value: "" },
          { title: "Some class", value: "class-name" },
        ],
        importcss_append: true,
        file_picker_callback: function (callback, value, meta) {
          console.log('file_picker_callback', callback, value, meta)
          if (meta.filetype === "file") {
            callback("https://www.baidu.com/img/bd_logo1.png", {
              text: "My text",
            });
          }
          if (meta.filetype === "image") {
            callback("https://www.baidu.com/img/bd_logo1.png", {
              alt: "My alt text",
            });
          }
          if (meta.filetype === "media") {
            callback("movie.mp4", {
              source2: "alt.ogg",
              poster: "https://www.baidu.com/img/bd_logo1.png",
            });
          }
        },
        toolbar_sticky: true,
        autosave_ask_before_unload: false
      },
    };
  },
  mounted() {
    this.fetchCategoryList();
    this.fetchTagList();
    this.fetchArticleDetail();
  },
  methods: {
    handleInput(html) {
      console.log(html)
    },
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
          this.form.originalLink = res.data.originalLink;
          this.form.originalAuthor = res.data.originalAuthor;
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
.article-title {
  color: #000;
  border: 1px solid #ccc;
  outline: 0;
  font-size: 36px;
  font-weight: bold;
  display: block;
  padding: 0;
  width: 100%;
  caret-color: #1890ff;
  margin: 20px 0 10px 0;
  &::placeholder {
    color: #ccc
  }
}
</style>
