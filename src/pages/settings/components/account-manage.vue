<template>
  <a-card class="card" title="账户管理">
    <div class="card-body">
      <a-form-model layout="vertical" :model="form">
        <a-form-model-item label="邮箱" help="绑定邮箱后能进行修改密码和接受通知">
          email@wangxuedong.com
          <a-button type="link">修改</a-button>
          <a-button type="link" @click="visible1=true">绑定邮箱</a-button>
        </a-form-model-item>
        <a-form-model-item label="密码">
          **********
          <a-button type="link" @click="visible=true">修改</a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
    <!-- change password -->
    <a-modal
      title="身份验证"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-form-model layout="vertical" :model="form" v-if="step===1">
        <a-form-model-item :label="this.step === 1 ? '验证方式' : '修改密码'">
          <a-select default-value="jack" style="width: 100%;">
            <a-select-option value="jack">
              email@wangxuedong.com
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="验证码">
          <a-input v-model="captcha">
            <span slot="addonAfter">获取验证码</span>
          </a-input>
        </a-form-model-item>
      </a-form-model>
      <a-form-model layout="vertical" :model="form" v-if="step===2">
        <a-form-model-item label="新密码">
          <a-input-password v-model="password"></a-input-password>
        </a-form-model-item>
        <a-form-model-item label="重复新密码">
          <a-input-password v-model="password"></a-input-password>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
    <!-- bind email -->
    <a-modal
      title="身份验证"
      :visible="visible1"
      :confirm-loading="confirmLoading"
      @ok="bindEmailSuccess"
      @cancel="handleCancel"
    >
      <a-form-model layout="vertical">
        <a-form-model-item :label="this.step === 1 ? '验证方式' : '修改密码'">
          <a-input v-model="captcha"></a-input>
        </a-form-model-item>
        <a-form-model-item label="验证码">
          <a-input v-model="captcha">
            <span slot="addonAfter">获取验证码</span>
          </a-input>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </a-card>
</template>

<script>
// import { cloneDeep } from 'lodash-es';
export default {
  data () {
    return {
      step: 1,
      visible: false,
      visible1: false,
      confirmLoading: false,
      captcha: '',
      password: '',
      form: {
        name: '',
        description: '',
        address: ''
      }
    };
  },
  created () {
  },
  methods: {
    bindEmailSuccess () {
      this.$notification.success({
        message: '绑定成功',
        description: '安全邮箱绑定成功，现在可以通过安全邮箱修改密码和接受通知'
      });
    },
    handleOk () {
      this.step = 2;
    },
    handleCancel () {
      this.visible = false;
    },
    handleChangePassword () {}
  }
};
</script>

<style>

</style>
