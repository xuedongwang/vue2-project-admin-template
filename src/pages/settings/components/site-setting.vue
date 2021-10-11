<template>
  <a-card class="card" title="网站设置">
    <div class="card-body">
      <a-form-model layout="vertical" :model="profileForm">
        <a-form-model-item label="站点标题">
          <a-input v-model="profileForm.name"/>
        </a-form-model-item>
        <a-form-model-item label="副标题">
          <a-input v-model="profileForm.name"/>
        </a-form-model-item>
        <a-form-model-item label="站点描述" help="用简洁的文字描述本站点">
          <a-input type="textarea" :autosize="{ minRows: 3, maxRows: 6 }" v-model="profileForm.description"/>
        </a-form-model-item>
        <a-form-model-item label="备案号">
          <a-input v-model="profileForm.address"/>
        </a-form-model-item>
        <a-form-model-item label="友情链接">
          <a-input v-model="profileForm.address"/>
        </a-form-model-item>
        <a-form-model-item label="站点语言">
          <a-select v-model="profileForm.region">
            <a-select-option value="shanghai">
              中文
            </a-select-option>
            <a-select-option value="beijing">
              EngLish
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="关闭站点" help="关闭网站后，站点将不能被访问">
          <a-switch v-model="profileForm.delivery" />
        </a-form-model-item>
        <a-form-model-item label="禁止搜索隐藏爬取网站" help="搜索引擎将本着自觉自愿的原则对待该设置，并不是所有搜索引擎都会遵守这类设置">
          <a-switch v-model="profileForm.delivery" />
        </a-form-model-item>
        <a-form-model-item>
          <a-button type="primary" @click="handleUpdateSetting">更新设置</a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
  </a-card>
</template>

<script>
import { cloneDeep } from 'lodash-es';
export default {
  data() {
    return {
      profileForm: {
        name: '',
        description: '',
        address: ''
      },
    }
  },
  created () {
  },
  methods: {
    handleUpdateSetting() {
    }
  }
}
</script>

<style>

</style>