<template>
  <div class="setting">
    <a-row type="flex" justify="space-between">
      <a-col style="width:300px;">
        <tab-menu @input="handleInput" :value="value" :tabs="tabs"></tab-menu>
      </a-col>
      <a-col style="width:calc(100% - 20px - 300px)">
        <a-card class="card" title="个人信息" v-if="value === 'profile'">
          <div class="card-body">
            <a-form-model layout="vertical" :model="profileForm">
              <a-form-model-item label="昵称">
                <a-input v-model="profileForm.nickname"/>
              </a-form-model-item>
              <a-form-model-item label="简介">
                <a-input type="textarea" :autosize="{ minRows: 3, maxRows: 6 }" v-model="profileForm.description"/>
              </a-form-model-item>
              <a-form-model-item label="地址">
                <a-input v-model="profileForm.address"/>
              </a-form-model-item>
              <a-form-model-item>
                <a-button type="primary">更新信息</a-button>
              </a-form-model-item>
            </a-form-model>
          </div>
        </a-card>
        <a-card class="card" title="账户管理" v-else-if="value === 'account'">
          <div class="card-body">
           account
          </div>
        </a-card>
        <a-card class="card" title="网站设置" v-if="value === 'site'">
          <div class="card-body">
           site
          </div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
const data = [
  {
    title: 'Ant Design Title 1'
  },
  {
    title: 'Ant Design Title 2'
  },
  {
    title: 'Ant Design Title 3'
  },
  {
    title: 'Ant Design Title 4'
  }
];
export default {
  data () {
    return {
      profileForm: {
        nickname: '',
        description: '',
        address: ''
      },
      hasData: true,
      loadMoreLoading: false,
      data,
      value: '',
      tabs: [
        {
          text: '个人信息',
          id: 'profile'
        },
        {
          text: '账户管理',
          id: 'account'
        },
        {
          text: '网站设置',
          id: 'site'
        }
      ]
    };
  },
  created () {
    this.value = this.$route.params.type;
  },
  methods: {
    handleInput (value) {
      if (this.value === value) {
        return;
      }
      this.$router.push({
        name: 'settings',
        params: {
          type: value
        }
      });
      this.value = value;
    },
    onLoadMore () {
      this.loadMoreLoading = true;
      setTimeout(() => {
        this.data.push(...data);
        this.loadMoreLoading = false;
      }, 2000);
    },
    onChange (e) {
      console.log(e.target.value);
    }
  }
};
</script>

<style lang="scss" scoped>
.setting {
}
</style>
