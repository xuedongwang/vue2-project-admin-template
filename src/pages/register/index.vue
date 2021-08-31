<template>
  <a-row type="flex" class="register" justify="space-around" align="middle">
    <a-col flex="500px">
      <a-card title="注册帐号" :bordered="false" >
        <a-form-model ref="registerForm" :rules="rules" :layout="formLayout" :model="form" v-bind="formItemLayout">
          <a-form-model-item label="帐号" prop="account">
            <a-input v-model="form.account" placeholder="请输入帐号" />
          </a-form-model-item>
          <a-form-model-item label="密码" prop="password">
            <a-input-password v-model="form.password" placeholder="请输入密码" />
          </a-form-model-item>
          <a-form-model-item label="确认密码" prop="confirmPassword">
            <a-input-password v-model="form.confirmPassword" placeholder="请再次输入密码" />
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
    function validator (rule, value, callback) {
      if (value && value !== this.form.password) {
        const err = '两次输入的密码不一致';
        callback(err);
      } else {
        callback();
      }
    }
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
      },
      rules: {
        account: [
          { required: true, message: '请输入帐号', trigger: 'blur' },
          { min: 4, max: 20, message: '帐号长度为4-20', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 4, max: 20, message: '密码长度为4-20', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { trigger: 'blur', validator: validator.bind(this) }
        ]
      }
    };
  },
  methods: {
    handleRegister () {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          console.log(this.form);
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.register {
  height: 100vh;
}
</style>
