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
        <!-- <a-form-model-item label="友情链接">
          <a-input v-model="profileForm.address"/>
        </a-form-model-item> -->
        <a-form-model-item
          v-if="profileForm.domains.length===0"
          label="友情链接"
        >
          <a-button block type="dashed" @click="addDomain">
            <a-icon type="plus" />添加
          </a-button>
        </a-form-model-item>
        <template v-else>
          <a-form-model-item
            v-for="(domain, index) in profileForm.domains"
            :key="domain.key"
            :label="index === 0 ? '友情链接' : ''"
            :prop="'domains.' + index + '.value'"
            :rules="{
              required: true,
              message: 'domain can not be null',
              trigger: 'blur',
            }"
          >
            <a-input
              v-model="domain.value"
              style="width:calc(100% - 30px);margin-right: 6px;"
            />
            <a-icon
              v-if="profileForm.domains.length > 0"
              class="dynamic-delete-button"
              type="minus-circle-o"
              @click="removeDomain(domain)"
            />
          </a-form-model-item>

          <a-form-model-item>
            <a-button block type="dashed" @click="addDomain">
              <a-icon type="plus" />添加
            </a-button>
          </a-form-model-item>
        </template>
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
  data () {
    return {
      profileForm: {
        domains: [],
        name: '',
        description: '',
        address: ''
      }
    };
  },
  created () {
  },
  methods: {
    removeDomain(item) {
      let index = this.profileForm.domains.indexOf(item);
      if (index !== -1) {
        this.profileForm.domains.splice(index, 1);
      }
    },
    addDomain() {
      this.profileForm.domains.push({
        value: '',
        key: Date.now(),
      });
    },
    handleUpdateSetting () {
    }
  }
};
</script>

<style lang="scss" scoped>
.dynamic-delete-button {
  cursor: pointer;
  position: relative;
  top: 4px;
  font-size: 24px;
  color: #999;
  transition: all 0.3s;
}
.dynamic-delete-button:hover {
  color: #777;
}
</style>
