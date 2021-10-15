<template>
  <a-row type="flex" class="register" justify="space-around" align="middle">
    <a-col flex="500px" class="register-box">
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
          <a-form-model-item :wrapper-col="buttonItemLayout">
            注册遇到问题：
            <router-link to="login">已有帐号</router-link>
            <a-divider type="vertical" />
            <router-link to="password/reset">找回密码</router-link>
          </a-form-model-item>
        </a-form-model>
      </a-card>
    </a-col>
  </a-row>
</template>

<script>
import { formRules } from '@/config';
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
        account: formRules.account,
        password: formRules.password,
        confirmPassword: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { trigger: 'blur', validator: validator.bind(this) }
        ]
      }
    };
  },
  methods: {
    loginAccount (data) {
      $http.post('/user/register', data, { loadingMsg: '注册中...' })
        .then(() => {
          this.$message.success({
            content: '注册成功',
            key: 'key'
          });
        })
        .catch(err => {
          throw err;
        });
    },
    registerAccount (data) {
      this.registerLoading = true;
      $http.post('/user/register', data, { loadingMsg: '注册中...' })
        .then(() => {
          this.registerLoading = false;
          this.$message.success({
            content: '注册成功',
            key: 'key'
          });
        })
        .catch(err => {
          this.registerLoading = false;
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
  .register-box {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
}
</style>
