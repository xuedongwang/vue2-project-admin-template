<template>
  <a-row type="flex" class="login" justify="space-around" align="middle">
    <a-col flex="500px" class="login-box">
      <a-card title="登录" :bordered="false" >
        <a-form-model ref="loginForm" :rules="rules" :layout="formLayout" :model="form" v-bind="formItemLayout">
          <a-form-model-item label="帐号" prop="account">
            <a-input v-model="form.account" placeholder="请输入帐号" />
          </a-form-model-item>
          <a-form-model-item label="密码" prop="password">
            <a-input-password v-model="form.password" placeholder="请输入密码" />
          </a-form-model-item>
          <a-form-model-item :wrapper-col="buttonItemLayout">
            <a-space>
              <a-button type="primary" @click="handleLogin" :loading="loginLoading">登录</a-button>
              <a-button @click="resetForm">重置</a-button>
            </a-space>
          </a-form-model-item>
          <a-form-model-item :wrapper-col="buttonItemLayout">
            登录遇到问题：
            <router-link to="register">注册帐号</router-link>
            <a-divider type="vertical" />
            <router-link to="password/reset">找回密码</router-link>
          </a-form-model-item>
        </a-form-model>
      </a-card>
    </a-col>
  </a-row>
</template>

<script>
import { titleMixin } from '@/mixins';
export default {
  name: 'Login',
  title: '用户登录',
  mixins: [titleMixin],
  data () {
    return {
      form: {
        account: 'root',
        password: 'root'
      },
      loginLoading: false,
      formLayout: 'horizontal',
      formItemLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 18 }
      },
      buttonItemLayout: {
        span: 14,
        offset: 4
      },
      rules: {
        account: [
          { required: true, message: '请输入帐号', trigger: 'blur' },
          { min: 4, max: 20, message: '帐号长度为4-20', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 4, max: 20, message: '密码长度为4-20', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    resetForm () {
      this.$refs.loginForm.resetFields();
    },
    login () {
      this.loginLoading = true;
      const data = {
        ...this.form
      };
      $http.post('/user/login', data, { loadingMsg: '登录中...' })
        .then(res => {
          this.$message.success({
            content: '登录成功',
            key: 'key'
          });
          this.loginLoading = false;
          localStorage.setItem('token', res.data.token);
        })
        .catch(err => {
          this.loginLoading = false;
          throw err;
        });
    },
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.login();
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  // ssd
  height: 100vh;
  &-box {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
}
</style>
