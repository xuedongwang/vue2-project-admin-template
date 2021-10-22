<template>
  <div class="category">
    <a-row>
      <a-col :span="24">
        <a-card title="创建分类" :bordered="false">
          <a-form-model ref="categoryForm" v-bind="formItemLayout" :rules="rules" :model="form">
            <a-form-model-item label="分类名" prop="name">
              <a-input v-model="form.name" />
            </a-form-model-item>
            <a-form-model-item label="分类描述" prop="description">
              <a-input v-model="form.description" type="textarea" :autosize="{ minRows: 2, maxRows: 6 }" />
            </a-form-model-item>
            <a-form-model-item :wrapper-col="buttonItemLayout">
              <a-space>
                <a-button :disabled="isEdit && !isModify" type="primary" :loading="loading" @click="handleSubmit">{{ isEdit ? '更新' : '创建' }}</a-button>
                <a-button :disabled="isEdit && !isModify" @click="handleResetForm">重置</a-button>
              </a-space>
            </a-form-model-item>
          </a-form-model>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { cloneDeep, isEqual } from 'lodash-es';
export default {
  data () {
    return {
      loading: false,
      form: {
        name: '',
        description: ''
      },
      bakForm: {
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
          { required: true, message: '请输入分类名', trigger: 'blur' },
          { min: 1, max: 50, message: '分类名长度为1-50', trigger: 'blur' }
        ],
        description: [
          { min: 0, max: 500, message: '分类描述长度最长为500', trigger: 'blur' }
        ]
      }
    };
  },
  computed: {
    isModify() {
      return !isEqual(this.form, this.bakForm);
    },
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
      $http.get('/category/detail', {
        params
      })
        .then(res => {
          this.form.name = res.data.name;
          this.form.description = res.data.description;
          this.bakForm = cloneDeep(this.form);
        });
    },
    createCategory () {
      const data = {
        ...this.form
      };
      this.loading = true;
      $http.post('/category/create', data)
        .then(res => {
          this.$message.success({
            content: '创建分类成功',
            key: 'key'
          });
          this.$router.back();
        })
        .finally(() => {
          this.loading = false;
        });
    },
    updateCategory () {
      const data = {
        id: this.$route.params.id,
        ...this.form
      };
      this.loading = true;
      $http.post('/category/update', data)
        .then(() => {
          this.$message.success({
            content: '更新分类成功',
            key: 'key'
          });
          this.bakForm = cloneDeep(this.form)
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleSubmit () {
      this.isEdit ? this.updateCategory() : this.createCategory();
    },
    handleResetForm () {
      this.form = cloneDeep(this.bakForm);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
