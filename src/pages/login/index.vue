<template>
  <a-row type="flex" class="login" justify="space-around" align="middle">
    <a-col flex="500px">
      <a-card title="登录" :bordered="false" >
        <a-form-model ref="loginForm" :rules="rules" :layout="formLayout" :model="form" v-bind="formItemLayout">
          <a-form-model-item label="帐号" prop="account">
            <a-input v-model="form.account" placeholder="请输入帐号" />
          </a-form-model-item>
          <a-form-model-item label="密码" prop="password">
            <a-input-password v-model="form.password" placeholder="请输入密码" />
          </a-form-model-item>
          <a-form-model-item :wrapper-col="buttonItemLayout">
            <a-button type="primary" @click="handleLogin" :loading="loginLoading">登录</a-button>
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
export default {
  name: 'login',
  data () {
    return {
      form: {
        account: '',
        password: ''
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
    login() {
      const hide = this.$message.loading({
        content: '登录中...',
        duration: 0,
        key: 'key'
      });
      this.loginLoading = true;
      const data = {
        ...this.form
      }
      $http.post('/user/login', data)
        .then(res => {
          this.$message.success({
            content: '登录成功',
            key: 'key'
          });
          this.loginLoading = false;
          localStorage.setItem('token', res.data.token)
        })
        .catch(err => {
          this.loginLoading = false;
          this.$message.loading({
            content: '网络故障，请重试',
            key: 'key'
          });
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
  height: 100vh;
}
</style>
