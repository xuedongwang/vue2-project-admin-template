<template>
  <div class="user">
    <a-row>
      <a-col :span="24">
        <a-card title="创建用户" :bordered="false">
          <a-form-model ref="userForm" v-bind="formItemLayout" :rules="rules" :model="form">
            <a-form-model-item label="昵称" prop="name">
              <a-input v-model="form.name">
                <span slot="addonAfter" @click="handleGenerateUserName">随机生成</span>
              </a-input>
            </a-form-model-item>
            <a-form-model-item label="帐号" prop="account">
              <a-input v-model="form.account">
                <span slot="addonAfter" @click="handleGenerateUserAccount">随机生成</span>
              </a-input>
            </a-form-model-item>
            <a-form-model-item label="初始密码" prop="password">
              <a-input-password v-model="form.password">
                <span slot="addonAfter" @click="handleGeneratePassword">随机生成</span>
              </a-input-password>
            </a-form-model-item>
            <a-form-model-item label="发送用户通知" help="发送帐号信息到用户的邮箱">
              <a-switch v-model="form.sendNotify" />
            </a-form-model-item>
            <a-form-model-item v-if="form.sendNotify" label="邮箱" prop="email">
              <a-input v-model="form.email" />
            </a-form-model-item>
            <a-form-model-item label="语言">
              <a-select v-model="form.language">
                <a-select-option value="English">
                  English
                </a-select-option>
                <a-select-option value="Chinese">
                  简体中文
                </a-select-option>
              </a-select>
            </a-form-model-item>
            <a-form-model-item label="用户描述" prop="description">
              <a-input v-model="form.description" type="textarea" :autoSize="{ minRows: 2, maxRows: 6 }" />
            </a-form-model-item>
            <a-form-model-item :wrapper-col="buttonItemLayout">
              <a-space>
                <a-button type="primary" :loading="loading" @click="handleSubmit">创建</a-button>
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
import { power } from '@/config';
import { nanoid } from 'nanoid'
import { breadcrumbMixin, titleMixin } from '@/mixins';
const SHOW_PARENT = TreeSelect.SHOW_PARENT;

export default {
  mixins: [breadcrumbMixin, titleMixin],
  title() {
    return '创建用户'
  },
  breadcrumb() {
    return [{
      title: '用户管理',
      path: '/category/manage'
    }, {
      title: '创建用户'
    }]
  },
  data () {
    return {
      SHOW_PARENT,
      powerTreeData: power.powerTreeData,
      loading: false,
      form: {
        name: '',
        account: '',
        description: '',
        email: '',
        power: [],
        password: '',
        language: 'Chinese',
        sendNotify: false
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
        account: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 1, max: 50, message: '用户名称长度为1-50', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: '邮箱格式不正确', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入用户密码', trigger: 'blur' },
          { min: 1, max: 50, message: '用户密码长度为1-50', trigger: 'blur' }
        ],
        description: [
          { min: 0, max: 500, message: '用户描述长度最长为500', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    handleGenerateUserName() {
      this.form.name = `用户｜${nanoid()}`
    },
    handleGenerateUserAccount() {
      this.form.account = nanoid();
    },
    handleGeneratePassword() {
      this.form.password = nanoid();
    },
    createUser () {
      const data = {
        ...this.form
      };
      console.log(data);
      this.loading = true;
      $http.post('/user/create', data)
        .then(res => {
          this.$message.success('创建用户成功');
          this.$router.back();
        })
        .finally(() => {
          this.loading = false;
        })
    },
    handleSubmit () {
      this.$refs.userForm.validate(valid => {
        if (valid) {
          this.createUser();
        } else {
          console.log('err');
        }
      })
    },
    handleResetForm () {
      this.$refs.userForm.resetFields();
    }
  }
};
</script>

<style lang="scss" scoped>
.user {
  /deep/ {
    .ant-input-group-addon {
      cursor: pointer;
    }
  }
}
</style>
