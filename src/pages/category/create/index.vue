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
              <a-input v-model="form.desc" type="textarea" :autosize="{ minRows: 2, maxRows: 6 }" />
            </a-form-model-item>
            <a-form-model-item :wrapper-col="buttonItemLayout">
              <a-space>
                <a-button type="primary" @click="handleCreateCategory">发布</a-button>
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
      loading: '',
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
  methods: {
    handleCreateCategory () {
      console.log('submit!', this.form);
    },
    handleResetForm () {
      this.$refs.categoryForm.resetFields();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
