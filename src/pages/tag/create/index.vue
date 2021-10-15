<template>
  <div class="category">
    <a-row>
      <a-col :span="24">
        <a-card title="创建标签" :bordered="false">
          <a-form-model ref="categoryForm" v-bind="formItemLayout" :rules="rules" :model="form">
            <a-form-model-item label="标签名" prop="name">
              <a-input v-model="form.name" />
            </a-form-model-item>
            <a-form-model-item label="标签描述" prop="description">
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
export default {
  data () {
    return {
      loading: false,
      form: {
        name: '',
        description: ''
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
        name: [
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
    isEdit () {
      return this.$route.path.startsWith('/category/edit/');
    }
  },
  mounted () {
    this.isEdit && this.fetchCategoryDetail();
  },
  methods: {
    fetchCategoryDetail () {
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
        });
    },
    createCategory () {
      const data = {
        ...this.form
      };
      this.loading = true;
      $http.post('/category/create', data)
        .then(res => {
          this.loading = false;
          this.$message.success({
            content: '创建标签成功',
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
        });
    },
    updateCategory () {
      const data = {
        id: this.$route.params.id,
        ...this.form
      };
      this.loading = true;
      $http.post('/category/update', data)
        .then(res => {
          this.loading = false;
          this.$message.success({
            content: '更新标签成功',
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
        });
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
