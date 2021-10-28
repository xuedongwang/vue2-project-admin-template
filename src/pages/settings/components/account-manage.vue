<template>
  <a-card class="card" title="账户管理">
    <div class="card-body">
      <a-form-model layout="vertical">
        <a-form-model-item label="邮箱" help="绑定邮箱后能进行修改密码和接受通知">
          <template v-if="email">
            {{ email }}
            <a-button type="link" @click="changeEmailModalVisiable=true">修改</a-button>
          </template>
          <template v-else>
            <text-button @click="bindEmailModalVisiable=true">绑定邮箱</text-button>
          </template>
        </a-form-model-item>
        <a-form-model-item disabled label="密码">
          **********
          <a-button type="link" v-if="email" @click="changePasswordModalVisiable=true">修改</a-button>
          <a-tooltip placement="topLeft" v-else>
            <template slot="title">
              <span>绑定邮箱之后才可以修改密码</span>
            </template>
            <a-button type="link" disabled>修改</a-button>
          </a-tooltip>
        </a-form-model-item>
      </a-form-model>
    </div>
    <!-- 修改密码 -->
    <a-modal
      title="身份验证"
      :visible="changePasswordModalVisiable"
      :confirm-loading="confirmLoading"
      :afterClose="onChangePasswordModalClose"
      @ok="() => step===1?handleValidateEmail():changePassword()"
      @cancel="changePasswordModalVisiable=false"
    >
      <a-form-model layout="vertical" v-if="step===1">
        <a-form-model-item :label="this.step === 1 ? '验证方式' : '修改密码'">
          {{ email }}
        </a-form-model-item>
        <a-form-model-item label="验证码">
          <a-input v-model="validateCaptcha">
            <span slot="addonAfter" @click="getCaptcha(email)">获取验证码</span>
          </a-input>
        </a-form-model-item>
      </a-form-model>
      <a-form-model layout="vertical" v-if="step===2">
        <a-form-model-item label="新密码">
          <a-input-password v-model="password"></a-input-password>
        </a-form-model-item>
        <a-form-model-item label="重复新密码">
          <a-input-password v-model="confirmPassword"></a-input-password>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
    <!-- 修改邮箱 -->
    <a-modal
      :title="step === 1 ? '邮箱验证': '绑定新邮箱'"
      :visible="changeEmailModalVisiable"
      :confirm-loading="confirmLoading"
      :afterClose="onChanegEmailModalClose"
      :okText="step === 1?'验证邮箱':'绑定新邮箱'"
      :cancelText="step === 1?'取消':'上一步'"
      @cancel="changeEmailModalVisiable=false"
      @ok="handleChangeEmail"
    >
      <a-form-model layout="vertical" v-if="step===1">
        <a-form-model-item :label="this.step === 1 ? '邮箱验证' : '修改邮箱'">
          {{ email }}
        </a-form-model-item>
        <a-form-model-item label="验证码">
          <a-input v-model="validateCaptcha">
            <span slot="addonAfter" @click="getCaptcha(email)">获取验证码</span>
          </a-input>
        </a-form-model-item>
      </a-form-model>
      <a-form-model layout="vertical" v-if="step===2">
        <a-form-model-item label="新邮箱">
          <a-input v-model="bindEmail"></a-input>
        </a-form-model-item>
        <a-form-model-item label="验证码">
          <a-input v-model="bindEmailCaptcha">
            <span slot="addonAfter" @click="getCaptcha(bindEmail)">获取验证码</span>
          </a-input>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
    <!-- 绑定邮箱 -->
    <a-modal
      title="身份验证"
      :visible="bindEmailModalVisiable"
      :confirm-loading="confirmLoading"
      :afterClose="onBindEmailModalClose"
      @ok="handlBindEmail"
      @cancel="bindEmailModalVisiable=false"
    >
      <a-form-model layout="vertical">
        <a-form-model-item label="邮箱地址">
          <a-input v-model="bindEmail"></a-input>
        </a-form-model-item>
        <a-form-model-item label="验证码">
          <a-input v-model="bindEmailCaptcha">
            <span slot="addonAfter" @click="getCaptcha(bindEmail)">获取验证码</span>
          </a-input>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </a-card>
</template>

<script>
import { titleMixin } from '@/mixins';
export default {
  mixins: [titleMixin],
  title() {
    return '账户管理'
  },
  data () {
    return {
      step: 1,
      changePasswordModalVisiable: false,
      changeEmailModalVisiable: false,
      bindEmailModalVisiable: false,
      confirmLoading: false,
      bindEmail: '',
      bindEmailCaptcha: '',
      validateCaptcha: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
  },
  created () {
    this.email = this.$store.state.user.info.email;
  },
  methods: {
    onBindEmailModalClose() {
      this.bindEmail = '';
      this.bindEmailCaptcha = '';
    },
    onChanegEmailModalClose() {
      this.step = 1;
      this.bindEmail = '';
      this.validateCaptcha = '';
      this.bindEmailCaptcha = '';
    },
    onChangePasswordModalClose() {
      this.step = 1;
      this.validateCaptcha = '';
      this.password = '';
      this.confirmPassword = '';
    },
    handleChangeEmail() {
      if (this.step === 1) {
        this.handleValidateEmail();
      } else {
        this.bindNewEmail();
      }
    },
    getCaptcha(email) {
      const params = {
        email
      }
      $http.get('common/get_captcha', {
        params
      })
        .then(res => {
          this.$message.success('发送验证码成功')
        })
    },
    handlBindEmail () {
      const data = {
        email: this.email,
        captcha: this.bindEmailCaptcha
      }
      $http.post('/common/bind_email', data)
        .then(res => {
          this.email = this.bindEmail;
          this.bindEmailModalVisiable = false;
          this.$notification.success({
            message: '绑定成功',
            description: '安全邮箱绑定成功，现在可以通过安全邮箱修改密码和接受通知'
          });
        })
    },
    bindNewEmail () {
      const data = {
        email: this.bindEmail,
        captcha: this.bindEmailCaptcha,
        oldCaptcha: this.validateCaptcha
      }
      $http.post('/common/change_email', data)
        .then(res => {
          this.email = this.bindEmail;
          this.changeEmailModalVisiable = false;
          this.$notification.success({
            message: '绑定成功',
            description: '安全邮箱绑定成功，现在可以通过安全邮箱修改密码和接受通知'
          });
        })
    },
    changePassword () {
      const data = {
        password: this.password,
        confirmPassword: this.confirmPassword,
        oldCaptcha: this.validateCaptcha
      }
      $http.post('/common/change_password', data)
        .then(res => {
          this.changePasswordModalVisiable = false;
          this.$notification.success({
            message: '密码修改成功',
            description: '密码修改成功，下次登录时请使用新密码'
          });
        })
    },
    handleValidateEmail () {
      const data = {
        email: this.email,
        captcha: this.validateCaptcha
      };
      $http.post('/common/validate_email', data)
        .then(res => {
          this.step = 2;
        })
    },
  }
};
</script>

<style lang="scss" scoped>
/deep/ {
  .ant-input-group-addon {
    cursor: pointer;
  }
}
</style>
