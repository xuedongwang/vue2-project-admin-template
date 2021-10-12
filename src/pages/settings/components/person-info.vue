<template>
  <a-card class="card" title="个人信息">
    <div class="card-body">
      <a-form-model layout="vertical" :model="profileForm">
        <a-form-model-item label="头像">
          <a-upload
            name="file"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            :headers="headers"
            @change="handleChange"
          >
            <a-avatar :size="64" :src="profileForm.avatar" icon="user" />
          </a-upload>
        </a-form-model-item>
        <a-form-model-item label="昵称">
          <a-input v-model="profileForm.name"/>
        </a-form-model-item>
        <a-form-model-item label="简介">
          <a-input type="textarea" :autosize="{ minRows: 3, maxRows: 6 }" v-model="profileForm.description"/>
        </a-form-model-item>
        <a-form-model-item label="地址">
          <a-input v-model="profileForm.address"/>
        </a-form-model-item>
        <a-form-model-item>
          <a-button type="primary" @click="handleUpdateUserinfo">更新信息</a-button>
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
      },
      headers: {}
    };
  },
  created () {
    this.profileForm = cloneDeep(this.$store.state.user.info || {});
  },
  methods: {
    handleChange () {},
    handleUpdateUserinfo () {
      this.$store.dispatch('user/fetchUserinfo');
    }
  }
};
</script>

<style>

</style>
