<template>
  <a-card class="card" title="账户管理">
    <div class="card-body">
      <a-form-model layout="vertical" :model="form">
        <a-form-model-item label="邮箱" help="绑定邮箱后能进行修改密码和接受通知">
          <template v-if="form.email">
            {{ form.email }}
            <a-button type="link" @click="visible=true">修改</a-button>
          </template>
          <template v-else>
            <text-button @click="visible1=true">绑定邮箱</text-button>
          </template>
        </a-form-model-item>
        <a-form-model-item disabled label="密码">
          **********
          <a-button type="link" v-if="form.email" @click="visible=true">修改</a-button>
          <a-tooltip placement="topLeft" v-else>
            <template slot="title">
              <span>绑定邮箱之后才可以修改密码</span>
            </template>
            <a-button type="link" disabled>修改</a-button>
          </a-tooltip>
        </a-form-model-item>
      </a-form-model>
    </div>
    <!-- change password -->
    <a-modal
      title="身份验证"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="visible=false"
    >
      <a-form-model layout="vertical" :model="form" v-if="step===1">
        <a-form-model-item :label="this.step === 1 ? '验证方式' : '修改密码'">
          <a-select default-value="jack" style="width: 100%;">
            {{ form.email }}
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="验证码">
          <a-input v-model="captcha">
            <span slot="addonAfter" @click="getCaptcha">获取验证码</span>
          </a-input>
        </a-form-model-item>
      </a-form-model>
      <a-form-model layout="vertical" :model="form" v-if="step===2">
        <a-form-model-item label="新密码">
          <a-input-password v-model="password"></a-input-password>
        </a-form-model-item>
        <a-form-model-item label="重复新密码">
          <a-input-password v-model="confirmPassword"></a-input-password>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
    <!-- bind email -->
    <a-modal
      title="身份验证"
      :visible="visible1"
      :confirm-loading="confirmLoading"
      :afterClose="onClose"
      @ok="bindEmailSuccess"
      @cancel="visible1=false"
    >
      <a-form-model layout="vertical">
        <a-form-model-item :label="this.step === 1 ? '邮箱地址' : '修改密码'">
          <a-input v-model="email"></a-input>
        </a-form-model-item>
        <a-form-model-item label="验证码">
          <a-input v-model="captcha">
            <span slot="addonAfter" @click="getCaptcha">获取验证码</span>
          </a-input>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </a-card>
</template>

<script>
// import { cloneDeep } from 'lodash-es';
import { titleMixin } from '@/mixins';
export default {
  mixins: [titleMixin],
  title() {
    return '账户管理'
  },
  data () {
    return {
      step: 1,
      visible: false,
      visible1: false,
      confirmLoading: false,
      email: 'email@wangxuedong.com',
      captcha: '',
      password: '',
      confirmPassword: '',
      form: {
        email: '',
        name: '',
        description: '',
        address: ''
      }
    };
  },
  created () {
    this.form.email = this.$store.state.user.info.email;
  },
  methods: {
    onClose() {
      this.email = '';
      this.captcha = '';
    },
    getCaptcha() {
      const params = {
        email: this.email
      }
      $http.get('common/get_captcha', {
        params
      })
        .then(res => {
          this.$message.success('发送验证码成功')
        })
    },
    bindEmailSuccess () {
      const data = {
        email: this.email,
        captcha: this.captcha
      }
      $http.post('/common/bind_email', data)
        .then(res => {
          this.visible1 = false;
          this.form.email = this.email;
          this.$notification.success({
            message: '绑定成功',
            description: '安全邮箱绑定成功，现在可以通过安全邮箱修改密码和接受通知'
          });
        })
    },
    handleOk () {
      this.step = 2;
    },
    handleChangePassword () {}
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
