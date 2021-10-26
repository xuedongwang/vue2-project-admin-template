<template>
  <div class="category">
    <a-row>
      <a-col :span="24">
        <a-card title="分类管理" :bordered="false">
          <a-button
            type="primary"
            slot="extra"
            @click="handleCreateCategory"
          >
            创建分类
          </a-button>
          <!-- 搜索 -->
          <a-form-model layout="inline" :model="filterForm" @submit="handleSearch" @submit.native.prevent>
            <a-form-model-item label="标题">
              <a-input allowClear v-model="filterForm.name"></a-input>
            </a-form-model-item>
            <a-form-model-item>
              <a-button
                type="primary"
                html-type="submit"
                icon="search"
              >
                搜索
              </a-button>
            </a-form-model-item>
          </a-form-model>
          <!-- 表格 -->
        </a-card>
      </a-col>
    </a-row>
    <a-row style="margin-top:10px;">
      <a-col :span="24">
        <a-card :bordered="false">
          <a-table @change="handleTableChange" :scroll="{ x: 1500}" :pagination="pagination" rowKey="id" :columns="columns" :data-source="categoryList" bordered>
            <template slot="categoryName" slot-scope="name">
              <a-tooltip placement="topLeft" :title="name">
                {{ name }}
              </a-tooltip>
            </template>
            <p slot="expandedRowRender" slot-scope="record" style="margin: 0">
              {{ record.description | formatString }}
            </p>
            <template slot="createdAt" slot-scope="createdAt">
              {{ createdAt | dayjs('YYYY年MM月DD日 hh:mm:ss') }}
            </template>
            <template slot="updatedAt" slot-scope="updatedAt">
              {{ updatedAt | dayjs('YYYY年MM月DD日 hh:mm:ss') }}
            </template>
            <template slot="operation" slot-scope="text,row">
              <div class="row-operations">
                <template v-if="row.isDefault">
                  <a-tooltip placement="topRight">
                    <template slot="title">
                      <span>默认分类不能编辑</span>
                    </template>
                    <text-button :disabled="true">编辑</text-button>
                  </a-tooltip>
                  <a-tooltip placement="topRight">
                    <template slot="title">
                      <span>默认分类不能删除</span>
                    </template>
                    <text-button :disabled="true" type="danger">删除</text-button>
                  </a-tooltip>
                  
                </template>
                <template v-else>
                  <text-button @click="() => handleEdit(row)">编辑</text-button>
                  <text-button type="danger" @click="[currentCategory=row, visible=true]" v-if="row.articleCount > 0">删除</text-button>
                  <a-popconfirm
                    v-else
                    ok-text="删除"
                    cancel-text="取消"
                    placement="topRight"
                    @confirm="handleDelete(row)"
                  >
                    <template slot="title">
                      <p>确定删除{{ row.name }}分类吗？</p>
                      <p>删除后不可恢复</p>
                    </template>
                    <text-button type="danger">删除</text-button>
                  </a-popconfirm>
                </template>
              </div>
            </template>
          </a-table>
        </a-card>
      </a-col>
    </a-row>
    <a-modal
      title="提示"
      :visible="visible"
      okText="移动文章并删除分类"
      :confirm-loading="confirmLoading"
      :destroyOnClose="true"
      :okButtonProps="{props: {disabled: !targetCategory}}"
      :afterClose="onModalClose"
      @ok="handleOk"
      @cancel="visible=false"
    >
      <p><a-tag color="blue">{{currentCategory.name}}</a-tag>下有
      <highlight-text>{{currentCategory.articleCount}}</highlight-text>
      篇文章,需要移动文章到其他分类后才能删除该分类.</p>
      移动该分类下的文章到：
      <a-select placeholder="请选择" allowClear showSearch v-model="targetCategory" style="width:178px;">
        <a-select-option v-for="item of allowMovedCategory" :key="item.id" :value="item.id">{{ item.name }}</a-select-option>
      </a-select>
    </a-modal>
  </div>
</template>

<script>
import { titleMixin } from '@/mixins';
const columns = [
  {
    title: '标题',
    dataIndex: 'name',
    scopedSlots: { customRender: 'categoryName' },
    ellipsis: true
  },
  {
    title: '作者',
    dataIndex: 'author',
    width: '200px'
  },
  {
    title: '文章数',
    width: '100px',
    dataIndex: 'articleCount'
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    width: '220px',
    scopedSlots: { customRender: 'createdAt' }
  },
  {
    title: '修改时间',
    dataIndex: 'updatedAt',
    width: '220px',
    scopedSlots: { customRender: 'updatedAt' }
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: '100px',
    fixed: 'right',
    scopedSlots: { customRender: 'operation' }
  }
];
export default {
  mixins: [titleMixin],
  data () {
    return {
      visible: false,
      confirmLoading: false,
      targetCategory: undefined,
      currentCategory: {},
      categoryList: [],
      filterForm: {
        name: ''
      },
      columns,
      pagination: {
        pageSizeOptions: ['10', '20', '30', '40', '50'],
        showSizeChanger: true,
        current: 1,
        pageSize: 10,
        total: 0,
        showTotal: (total) => `共${total}条`
      }
    };
  },
  title () {
    return '分类管理';
  },
  computed: {
    allowMovedCategory() {
      return this.categoryList.filter(item => item.id !== this.currentCategory.id);
    }
  },
  mounted () {
    this.fetchCategoryList();
  },
  methods: {
    handleTableChange ({ current, pageSize }) {
      this.pagination.current = current;
      this.pagination.pageSize = pageSize;
      this.fetchCategoryList();
    },
    onModalClose() {
      this.currentCategory = {};
      this.targetCategory = undefined;
    },
    moveArticles() {
      const params = {
        from: this.currentCategory.id,
        to: this.targetCategory,
      };
      return $http.get('/article/move_group', {
        params
      })
        .then(res => {
          console.log(res);
        })
        .finally(() => {
        })
    },
    deleteGroup(id) {
      const params = {
        id
      };
      $http.get('/category/delete', {
        params
      })
        .then(() => {
          this.resetCurrentPage();
          this.fetchCategoryList();
        });
    },
    async handleOk() {
      this.confirmLoading = true;
      await this.moveArticles()
      await this.deleteGroup(this.currentCategory.id);
      this.confirmLoading = false;
      this.visible = false;
    },
    handleSearch () {
      this.resetCurrentPage();
      this.fetchCategoryList();
    },
    fetchCategoryList () {
      const params = {
        name: this.filterForm.name,
        currentPage: this.pagination.current,
        pageSize: this.pagination.pageSize
      };
      $http.get('/category/list', {
        params,
        currentPage: this.pagination.current,
        pageSize: this.pagination.pageSize
      })
        .then(res => {
          this.categoryList = res.data.list;
          this.pagination.total = res.data.total;
        });
    },
    resetCurrentPage() {
      this.pagination.current = 1;
    },
    handleDelete (row) {
      const params = {
        id: row.id
      };
      $http.get('/category/delete', {
        params
      })
        .then(() => {
          this.resetCurrentPage();
          this.fetchCategoryList();
          this.$message.success({
            content: '删除分类成功',
            key: 'key'
          });
        });
    },
    handleEdit (row) {
      const path = `/category/edit/${row.id}`;
      this.$router.push(path);
    },
    handleCreateCategory () {
      this.$router.push({
        name: 'create-category'
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
