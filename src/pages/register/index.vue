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
        account: 'root',
        password: 'root',
        confirmPassword: 'root'
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
    loginAccount (data) {
      const hide = this.$message.loading({
        content: '正在登录...',
        duration: 0,
        key: 'key'
      });
      $http.post('/user/login', data)
        .then(() => {
          hide();
          this.$message.success({
            content: '登录成功',
            key: 'key'
          });
        })
        .catch(err => {
          hide();
          this.$message.error({
            content: '登录失败',
            key: 'key'
          });
          throw err;
        });
    },
    registerAccount (data) {
      this.registerLoading = true;
      const hide = this.$message.loading({
        content: '正在注册...',
        duration: 0,
        key: 'key'
      });
      $http.post('/user/register', data)
        .then(() => {
          this.registerLoading = false;
          hide();
          this.$message.success({
            content: '注册成功',
            key: 'key'
          });
          this.loginAccount(data);
        })
        .catch(err => {
          this.$message.error({
            content: '注册失败',
            key: 'key'
          });
          this.registerLoading = false;
          hide();
          throw err;
        });
    },
    handleRegister () {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          this.registerAccount(this.form);
        } else {
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
