<template>
  <a-card class="card" title="通知管理">
    <div class="card-body">
      <a-form-model layout="vertical" :model="form">
        <a-form-model-item label="发布文章后接受通知" help="有人发布文章时，邮件将接收到通知">
          <a-switch @change="handleChange('publishArticle')" v-model="form.publishArticle" />
        </a-form-model-item>
        <a-form-model-item label="删除文章时接受通知" help="删除文章时接受通知，邮件将接收到通知">
          <a-switch @change="handleChange('deleteArticle')" v-model="form.deleteArticle" />
        </a-form-model-item>
        <a-form-model-item label="创建分类时接受通知" help="有人创建分类时接受通知，邮件将接收到通知">
          <a-switch @change="handleChange('createCategory')" v-model="form.createCategory" />
        </a-form-model-item>
        <a-form-model-item label="删除分类时接受通知" help="有人删除分类时接受通知，邮件将接收到通知">
          <a-switch @change="handleChange('deleteCategory')" v-model="form.deleteCategory" />
        </a-form-model-item>
        <a-form-model-item label="修改密码时接受通知" help="有人修改密码时接受通知，邮件将接收到通知">
          <a-switch @change="handleChange('changePassword')" v-model="form.changePassword" />
        </a-form-model-item>
        <a-form-model-item label="修改安全邮箱时" help="有人修改安全邮箱时，邮件将接收到通知">
          <a-switch @change="handleChange('changeEmail')" v-model="form.changeEmail" />
        </a-form-model-item>
      </a-form-model>
    </div>
  </a-card>
</template>

<script>
import { titleMixin } from '@/mixins';
export default {
  mixins: [titleMixin],
  title() {
    return '通知管理'
  },
  data () {
    return {
      form: {
        publishArticle: false,
        deleteArticle: false,
        createCategory: false,
        deleteCategory: false,
        changePassword: false,
        changeEmail: false
      }
    };
  },
  created () {
    this.fetchSetting()
  },
  methods: {
    fetchSetting(args) {
      $http.get('/common/notify_setting')
        .then(res => {
          this.form = res.data;
        })
    },
    handleChange(args) {
      const data = {
        [args]: this.form[args]
      };
      $http.post('/common/toggle_notify', data)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          this.form[args] = !this.form[args];
          throw err;
        })
    }
  }
};
</script>

<style>

</style>
