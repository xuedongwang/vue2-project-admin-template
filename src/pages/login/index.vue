<template>
  <a-row type="flex" class="login" justify="space-around" align="middle">
    <a-col flex="500px">
      <a-card title="登录" :bordered="false" >
        <a-form-model class="form" :layout="formLayout" :model="form" v-bind="formItemLayout">
          <a-form-model-item label="帐号">
            <a-input v-model="form.account" placeholder="请输入帐号" />
          </a-form-model-item>
          <a-form-model-item label="密码">
            <a-input v-model="form.password" placeholder="请输入密码" />
          </a-form-model-item>
          <a-form-model-item :wrapper-col="buttonItemLayout">
            <a-button type="primary" @click="handleLogin" :loading="loginLoading">登录</a-button>
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
      }
    };
  },
  methods: {
    handleLogin () {
      // this.loginLoading = {}
      console.log(this.form);
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
}
</style>
