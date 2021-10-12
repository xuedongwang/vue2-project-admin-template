<template>
  <a-card class="card" title="通知管理">
    <div class="card-body">
      <a-form-model layout="vertical" :model="profileForm">
        <a-form-model-item label="发布文章后接受通知" help="有人发布文章时，邮件将接收到通知">
          <a-switch v-model="profileForm.delivery" />
        </a-form-model-item>
        <a-form-model-item label="异地登录时接受通知" help="异地登录帐号后，邮件将接收到通知">
          <a-switch v-model="profileForm.delivery" />
        </a-form-model-item>
        <a-form-model-item label="有人评论时候接受通知" help="有人评论时候接受通知，邮件将接收到通知">
          <a-switch v-model="profileForm.delivery" />
        </a-form-model-item>
        <a-form-model-item label="添加新成员时接受通知" help="添加新成员时接受通知，邮件将接收到通知">
          <a-switch v-model="profileForm.delivery" />
        </a-form-model-item>
        <a-form-model-item label="成员的权限发生改变时" help="成员的权限发生改变时，邮件将接收到通知">
          <a-switch v-model="profileForm.delivery" />
        </a-form-model-item>
        <a-form-model-item label="删除文章时接受通知" help="删除文章时接受通知，邮件将接收到通知">
          <a-switch v-model="profileForm.delivery" />
        </a-form-model-item>
        <a-form-model-item label="有人创建分类时接受通知" help="有人创建分类时接受通知，邮件将接收到通知">
          <a-switch v-model="profileForm.delivery" />
        </a-form-model-item>
        <a-form-model-item label="有人创建标签时接受通知" help="有人创建标签时接受通知，邮件将接收到通知">
          <a-switch v-model="profileForm.delivery" />
        </a-form-model-item>
        <a-form-model-item label="有人留言时接受通知" help="有人留言时接受通知，邮件将接收到通知">
          <a-switch v-model="profileForm.delivery" />
        </a-form-model-item>
      </a-form-model>
    </div>
  </a-card>
</template>

<script>
import { cloneDeep } from 'lodash-es';
export default {
  data () {
    return {
      profileForm: {
        name: '',
        description: '',
        address: ''
      }
    };
  },
  created () {
    this.profileForm = cloneDeep(this.$store.state.user.info || {});
  },
  methods: {
    handleUpdateUserinfo () {
      this.$store.dispatch('user/fetchUserinfo');
    }
  }
};
</script>

<style>

</style>
