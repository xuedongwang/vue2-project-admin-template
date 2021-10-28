<template>
  <a-row type="flex" class="login" justify="space-around" align="middle">
    <a-col flex="800px">
      <a-card title="重置密码" :bordered="false" >
        <a-steps :current="current" style="margin-bottom: 50px;">
          <a-step title="验证帐号" />
          <a-step title="重置密码" />
          <a-step title="修改成功" />
        </a-steps>
        <a-form-model ref="loginForm" v-if="current===1" :rules="rules" :layout="formLayout" :model="form" v-bind="formItemLayout">
          <a-form-model-item label="安全邮箱" prop="email">
            <a-input v-model="form.email" placeholder="请输入帐号">
              <span slot="addonAfter" @click="getCaptcha">获取验证码</span>
            </a-input>
          </a-form-model-item>
          <a-form-model-item label="验证码" prop="captcha">
            <a-input v-model="form.captcha" placeholder="请输入密码" />
          </a-form-model-item>
          <a-form-model-item :wrapper-col="buttonItemLayout">
            <a-space>
              <a-button type="primary" @click="handleValidateEmail" :loading="loginLoading">验证帐号</a-button>
              <a-button @click="$router.push({name: 'login'})">返回登录</a-button>
            </a-space>
          </a-form-model-item>
        </a-form-model>
        <a-form-model ref="loginForm" v-if="current===2" :rules="rules" :layout="formLayout" :model="passwordform" v-bind="formItemLayout">
          <a-form-model-item label="新密码" prop="password">
            <a-input-password v-model="passwordform.password" placeholder="请输入密码" />
          </a-form-model-item>
          <a-form-model-item label="重复新密码" prop="password">
            <a-input-password v-model="passwordform.confirmPassword" placeholder="请输入密码" />
          </a-form-model-item>
          <a-form-model-item :wrapper-col="buttonItemLayout">
            <a-space>
              <a-button type="primary" @click="handleChangePassword" :loading="loginLoading">修改密码</a-button>
              <a-button @click="current = 1">上一步</a-button>
            </a-space>
          </a-form-model-item>
        </a-form-model>
        <a-result
          v-if="current===3"
          status="success"
          title="密码重置成功"
          sub-title="email@wangxuedong.com的密码已重置成功，你可以使用新密码登录帐号"
        >
          <template #extra>
            <a-button key="console" type="primary" @click="$router.replace({name: 'login'})">去登录</a-button>
            <a-button key="buy" @click="$router.back()">返回</a-button>
          </template>
        </a-result>
      </a-card>
    </a-col>
  </a-row>
</template>

<script>
export default {
  name: 'password-reset',
  data () {
    return {
      passwordform: {
        password: '',
        confirmPassword: ''
      },
      current: 1,
      form: {
        email: '',
        captcha: ''
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
        email: [
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
    getCaptcha() {
      const params = {
        email: this.form.email
      }
      $http.get('common/get_captcha', {
        params
      })
        .then(res => {
          this.$message.success('发送验证码成功')
        })
    },
    handleChangePassword() {
      const data = {
        password: this.passwordForm.password,
        confirmPassword: this.passwordForm.confirmPassword,
        oldCaptcha: this.form.captcha
      }
      $http.post('/common/change_password', data)
        .then(res => {
          this.step = 3;
        })
    },
   handleValidateEmail () {
      const data = {
        email: this.form.email,
        captcha: this.form.captcha
      };
      $http.post('/common/validate_email', data)
        .then(res => {
          this.step = 2;
        })
    },
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
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
.login {
  height: 100vh;
}
</style>
