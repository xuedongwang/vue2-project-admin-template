<template>
  <a-card class="card" title="个人信息">
    <div class="card-body">
      <a-form-model layout="vertical" :model="profileForm">
        <a-form-model-item label="头像">
          <a-avatar class="avatar" :size="64" :src="profileForm.avatar | autoPrefix" @click="$refs.uploadAvatarInputRef.click()" icon="user" />
          <input
            type="file"
            ref="uploadAvatarInputRef"
            :multiple="false"
            v-show="false"
            :accept="accept"
            @change="handleFileChange"
          >
        </a-form-model-item>
        <a-form-model-item label="昵称">
          <a-input v-model="profileForm.name"/>
        </a-form-model-item>
        <a-form-model-item label="简介">
          <a-input type="textarea" :autoSize="{ minRows: 3, maxRows: 6 }" v-model="profileForm.description"/>
        </a-form-model-item>
        <a-form-model-item label="语言">
          <a-select v-model="profileForm.language">
            <a-select-option value="English">
              English
            </a-select-option>
            <a-select-option value="Chinese">
              简体中文
            </a-select-option>
          </a-select>
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
import { titleMixin } from '@/mixins';
const typeMap = {
  pdf: ['application/pdf'],
  picture: ['image/gif', 'image/png', 'image/jpeg', 'image/bmp', 'image/webp', 'image/x-icon', 'image/vnd.microsoft.icon'],
  audio: ['audio/midi', 'audio/mpeg', 'audio/webm', 'audio/ogg', 'audio/wav'],
  video: ['video/webm', 'video/ogg'],
  zip: ['application/zip']
};
export default {
  mixins: [titleMixin],
  title() {
    return '个人信息'
  },
  data () {
    return {
      profileForm: {
        avatar: '',
        name: '',
        description: '',
        language: ''
      },
      headers: {},
      accept: typeMap.picture
    };
  },
  created () {
    this.profileForm = cloneDeep(this.$store.state.user.info || {});
  },
  methods: {
    handleFileChange(e) {
      const { files } = e.target;
      const hide = this.$message.loading({
        content: `正在上传头像`,
        duration: 0,
      })
      $upload({ file: files[0], userConfig: {showLoadingMsg: false}})
        .then(res => {
          this.profileForm.avatar = res.data.url;
        })
        .finally(() => {
          e.target.value = '';
          hide();
        })
    },
    handleUpdateUserinfo () {
      const data = {
        name: this.profileForm.name,
        avatar: this.profileForm.avatar,
        language: this.profileForm.language,
        description: this.profileForm.description,
        id: this.$store.state.user.info.id
      };
      $http.post('/user/update_info', data)
        .then(res => {
          this.$store.dispatch('user/fetchUserinfo');
        })
    }
  }
};
</script>

<style lang="scss">
.avatar {
  cursor: pointer;
}
</style>
