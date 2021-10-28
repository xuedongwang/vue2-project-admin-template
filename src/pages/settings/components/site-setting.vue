<template>
  <a-card class="card" title="网站设置">
    <div class="card-body">
      <a-form-model ref="form" layout="vertical" :model="form">
        <a-form-model-item label="站点标题">
          <a-input v-model="form.title"/>
        </a-form-model-item>
        <a-form-model-item label="副标题">
          <a-input v-model="form.subTitle"/>
        </a-form-model-item>
        <a-form-model-item label="站点描述" help="用简洁的文字描述本站点">
          <a-input type="textarea" :autoSize="{ minRows: 3, maxRows: 6 }" v-model="form.description"/>
        </a-form-model-item>
        <a-form-model-item label="备案号">
          <a-input v-model="form.recordNumber"/>
        </a-form-model-item>
        <a-form-model-item
          v-if="form.friendLinks.length===0"
          label="友情链接"
        >
          <a-button block type="dashed" @click="addDomain">
            <a-icon type="plus" />添加
          </a-button>
        </a-form-model-item>
        <template v-else>
          <a-form-model-item
            v-for="(domain, index) in form.friendLinks"
            :key="index"
            :label="index === 0 ? '友情链接' : ''"
            :prop="'friendLinks.' + index"
            :rules="{
              required: true,
              message: '友情链接不能为空',
              trigger: 'blur',
            }"
          >
            <a-input
              v-model="form.friendLinks[index]"
              style="width:calc(100% - 30px);margin-right: 6px;"
            />
            <a-icon
              v-if="form.friendLinks.length > 0"
              class="dynamic-delete-button"
              type="minus-circle-o"
              @click="removeDomain(index)"
            />
          </a-form-model-item>

          <a-form-model-item>
            <a-button block type="dashed" @click="addDomain">
              <a-icon type="plus" />添加
            </a-button>
          </a-form-model-item>
        </template>
        <a-form-model-item label="站点语言">
          <a-select v-model="form.language">
            <a-select-option value="Chinese">
              中文
            </a-select-option>
            <a-select-option value="EngLish">
              EngLish
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="关闭站点" help="关闭网站后，站点将不能被访问">
          <a-switch v-model="form.isClose" />
        </a-form-model-item>
        <a-form-model-item label="禁止搜索隐藏爬取网站" help="搜索引擎将本着自觉自愿的原则对待该设置，并不是所有搜索引擎都会遵守这类设置">
          <a-switch v-model="form.isPrivate" />
        </a-form-model-item>
        <a-form-model-item>
          <a-button type="primary" @click="handleUpdateSetting">更新设置</a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
  </a-card>
</template>

<script>
// import { cloneDeep } from 'lodash-es';
import { titleMixin } from '@/mixins';
export default {
  mixins: [titleMixin],
  title() {
    return '网站设置'
  },
  data () {
    return {
      form: {
        friendLinks: [],
        title: '',
        language: '',
        isClose: false,
        isPrivate: false,
        subTitle: '',
        description: '',
        recordNumber: ''
      }
    };
  },
  created () {
    this.fetchSiteSetting();
  },
  methods: {
    fetchSiteSetting() {
      $http.get('/common/site_setting')
        .then(res => {
          this.form.friendLinks = res.data.friendLinks;
          this.form.title = res.data.title;
          this.form.language = res.data.language;
          this.form.isClose = res.data.isClose;
          this.form.isPrivate = res.data.isPrivate;
          this.form.subTitle = res.data.subTitle;
          this.form.description = res.data.description;
          this.form.recordNumber = res.data.recordNumber;
        })
    },
    removeDomain (index) {
      this.form.friendLinks.splice(index, 1);
    },
    addDomain () {
      this.form.friendLinks.push('');
    },
    handleUpdateSetting () {
      this.$refs.form.validate(valid => {
        if (valid) {
          const data = {
            ...this.form
          }
          $http.post('/common/update_site_setting', data)
            .then(res => {
              console.log(res);
            })
          console.log(this.form);
        }
      })
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
