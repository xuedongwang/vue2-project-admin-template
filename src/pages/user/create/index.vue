<template>
  <div class="category">
    <a-row>
      <a-col :span="24">
        <a-card title="创建用户" :bordered="false">
          <a-form-model ref="categoryForm" v-bind="formItemLayout" :rules="rules" :model="form">
            <a-form-model-item label="用户名" prop="username">
              <a-input v-model="form.username">
                <span slot="addonAfter">自动填充</span>
              </a-input>
              
            </a-form-model-item>
            <a-form-model-item label="邮箱" prop="email">
              <a-input v-model="form.email" />
            </a-form-model-item>
            <a-form-model-item label="初始密码" prop="password">
              <a-input v-model="form.password">
                <span slot="addonAfter">随机生成</span>
              </a-input>
              <!-- <a-progress
                slot="help"
                title="密码强度"
                :strokeWidth="10"
                :format="percent => {
                  if (percent < 50) {
                    return '弱';
                  } else if (percent < 100) {
                    return '中'
                  } else {
                    return '强'
                  }
                }"
                :stroke-color="{
                  '0%': '#f5222d',
                  '50%': '#1890ff',
                  '100%': '#52c41a',
                }"
                :percent="100"
              /> -->
            </a-form-model-item>
            <a-form-model-item label="发送用户通知">
              <a-switch v-model="form.sendNotify" />
            </a-form-model-item>
            <a-form-model-item label="语言">
              <a-select v-model="form.language">
                <a-select-option value="english">
                  English
                </a-select-option>
                <a-select-option value="chinese">
                  简体中文
                </a-select-option>
              </a-select>
            </a-form-model-item>
            <a-form-model-item label="权限">
              <!-- <a-select v-model="form.role">
                <a-select-option value="admin">
                  管理员
                </a-select-option>
                <a-select-option value="edit">
                  编辑
                </a-select-option>
                <a-select-option value="author">
                  作者
                </a-select-option>
              </a-select> -->
              <a-tree-select
                v-model="form.power"
                style="width: 100%"
                :tree-data="powerTreeData"
                tree-checkable
                :show-checked-strategy="SHOW_PARENT"
                search-placeholder="Please select"
              />
            </a-form-model-item>
            <a-form-model-item label="用户描述" prop="description">
              <a-input v-model="form.description" type="textarea" :autosize="{ minRows: 2, maxRows: 6 }" />
            </a-form-model-item>
            <a-form-model-item :wrapper-col="buttonItemLayout">
              <a-space>
                <a-button type="primary" :loading="loading" @click="handleSubmit">{{ isEdit ? '更新' : '创建' }}</a-button>
                <a-button @click="handleResetForm">重置</a-button>
              </a-space>
            </a-form-model-item>
          </a-form-model>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { TreeSelect } from 'ant-design-vue';
import { power } from '@/config'
const SHOW_PARENT = TreeSelect.SHOW_PARENT;

export default {
  data () {
    return {
      SHOW_PARENT,
      powerTreeData: power.powerTreeData,
      loading: false,
      form: {
        username: '',
        description: '',
        email: '',
        power: [],
        password: '',
        language: 'english',
        sendNotify: true
      },
      formItemLayout: {
        labelCol: { span: 2 },
        wrapperCol: { span: 22 }
      },
      buttonItemLayout: {
        span: 22,
        offset: 2
      },
      rules: {
        username: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { min: 1, max: 50, message: '文章标题长度为1-50', trigger: 'blur' }
        ],
        description: [
          { min: 0, max: 500, message: '文章描述长度最长为500', trigger: 'blur' }
        ]
      }
    };
  },
  computed: {
    isEdit() {
      return this.$route.path.startsWith('/category/edit/');
    }
  },
  mounted() {
    this.isEdit && this.fetchCategoryDetail();
  },
  methods: {
    fetchCategoryDetail() {
      const params = {
        id: this.$route.params.id
      };
      const hide = this.$message.loading({
        content: '加载中...',
        duration: 0,
        key: 'key'
      });
      $http.get('/category/detail', {
        params
      })
      .then(res => {
        hide();
        this.form.name = res.data.title;
        this.form.description = res.data.description;
      })
      .catch(err => {
        this.$message.error({
          content: '网络故障，请重试',
          key: 'key'
        });
        throw err;
      })
    },
    createCategory() {
      const data = {
        ...this.form
      };
      this.loading = true;
      $http.post('/category/create', data)
      .then(res => {
        this.loading = false;
        this.$message.success({
          content: '创建用户成功',
          key: 'key'
        });
        this.$router.back();
      })
      .catch(err => {
        this.loading = false;
        this.$message.error({
          content: '网络故障，请重试',
          key: 'key'
        });
        throw err;
      })
    },
    updateCategory() {
      const data = {
        id: this.$route.params.id,
        ...this.form
      };
      this.loading = true;
      $http.post('/category/update', data)
      .then(res => {
        this.loading = false;
        this.$message.success({
          content: '更新用户成功',
          key: 'key'
        });
        this.$router.back();
      })
      .catch(err => {
        this.loading = false;
        this.$message.error({
          content: '网络故障，请重试',
          key: 'key'
        });
        throw err;
      })
    },
    handleSubmit () {
      this.isEdit ? this.updateCategory() : this.createCategory();
    },
    handleResetForm () {
      this.$refs.categoryForm.resetFields();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
