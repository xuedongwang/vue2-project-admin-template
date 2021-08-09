<template>
  <a-row type="flex" class="register" justify="space-around" align="middle">
    <a-col flex="500px">
      <a-card title="注册帐号" :bordered="false" >
        <a-form-model class="form" :layout="formLayout" :model="form" v-bind="formItemLayout">
          <a-form-model-item label="帐号">
            <a-input v-model="form.account" placeholder="请输入帐号" />
          </a-form-model-item>
          <a-form-model-item label="密码">
            <a-input v-model="form.password" placeholder="请输入密码" />
          </a-form-model-item>
          <a-form-model-item label="确认密码">
            <a-input v-model="form.confirmPassword" placeholder="请再次输入密码" />
          </a-form-model-item>
          <a-form-model-item :wrapper-col="buttonItemLayout">
            <a-button type="primary" @click="handleRegister" :loading="registerLoading">注册</a-button>
          </a-form-model-item>
        </a-form-model>
      </a-card>
    </a-col>
  </a-row>
</template>

<script>
export default {
  name: 'register',
  data () {
    return {
      form: {
        account: '',
        password: '',
        confirmPassword: ''
      },
      registerLoading: false,
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
    handleRegister () {
      // this.registerLoading = {}
      console.log(this.form);
    }
  }
};
</script>

<style lang="scss" scoped>
.register {
  height: 100vh;
  background: #ececec;
}
</style>
