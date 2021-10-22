<template>
  <div class="article">
    <a-row>
      <a-col :span="24">
        <a-card title="文章管理" :bordered="false">
          <a-button
            type="primary"
            slot="extra"
            :loading="loading"
            @click="handleCreateArticle"
          >
            创建文章
          </a-button>
          <!-- 搜索 -->
          <a-form-model layout="inline" :model="filterForm" @submit="handleSearch" @submit.native.prevent>
            <a-form-model-item label="标题">
              <a-input allowClear v-model="filterForm.title"></a-input>
            </a-form-model-item>
            <a-form-model-item label="状态">
              <a-select allowClear v-model="filterForm.isPublish" style="width:178px;">
                <a-select-option :value="1">已发布</a-select-option>
                <a-select-option :value="0">草稿</a-select-option>
              </a-select>
            </a-form-model-item>
            <a-form-model-item label="分类">
              <a-select allowClear v-model="filterForm.category" style="width:178px;">
                <a-select-option v-for="item of userCategories" :key="item.id" :value="item.id">{{ item.name }}</a-select-option>
              </a-select>
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
          <a-table :scroll="{ x: 1500, y: 300 }" @change="handleTableChange" :pagination="pagination" rowKey="id" :columns="columns" :data-source="article.list" bordered>
            <p slot="expandedRowRender" slot-scope="record" style="margin: 0">
              {{ record.description | formatString }}
            </p>
            <template slot="articleTitle" slot-scope="title">
              <a-tooltip placement="topLeft" :title="title">
                {{ title }}
              </a-tooltip>
            </template>
            <template slot="author" slot-scope="author">
              <a-tooltip placement="topLeft" :title="author">
                {{ author }}
              </a-tooltip>
            </template>
            <template slot="category" slot-scope="category">
              {{ category }}
            </template>
            <template slot="status" slot-scope="isPublish">
              <a-tag color="green" v-if="isPublish">已发布</a-tag>
              <a-tag color="orange" v-else>草稿</a-tag>
            </template>
            <template slot="private" slot-scope="isPrivate">
              <a-tag color="green" v-if="isPrivate">隐私</a-tag>
              <a-tag color="orange" v-else>公开</a-tag>
            </template>
            <template slot="origin" slot-scope="isOriginal">
              <a-tag color="green" v-if="isOriginal">原创</a-tag>
              <a-tag color="orange" v-else>引用</a-tag>
            </template>
            <template slot="allowComment" slot-scope="isAllowComment">
              <a-tag color="green" v-if="isAllowComment">允许</a-tag>
              <a-tag color="orange" v-else>禁止</a-tag>
            </template>
            <template slot="createdAt" slot-scope="createdAt">
              {{ createdAt | dayjs('YYYY年MM月DD日 hh:mm:ss') }}
            </template>
            <template slot="updatedAt" slot-scope="updatedAt">
              {{ updatedAt | dayjs('YYYY年MM月DD日 hh:mm:ss') }}
            </template>
            <template slot="operation" slot-scope="text,row">
              <div class="row-operations">
                <a @click="() => handleEdit(row)">编辑</a>
                <a-popconfirm
                  ok-text="删除"
                  cancel-text="取消"
                  placement="topRight"
                  @confirm="handleDelete(row)"
                >
                  <template slot="title">
                    <p>确定删除{{ currentArticle.title }}文章吗？</p>
                    <p>删除后不可恢复</p>
                  </template>
                  <a style="color:#f5222d" @click="() => currentArticle=row">删除</a>
                </a-popconfirm>
              </div>
            </template>
          </a-table>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { titleMixin } from '@/mixins';
const columns = [
  {
    title: '标题',
    dataIndex: 'title',
    width: '200px',
    scopedSlots: { customRender: 'articleTitle' },
    ellipsis: true
  },
  {
    title: '分类',
    dataIndex: 'category',
    width: '100px',
    scopedSlots: { customRender: 'category' }
  },
  {
    title: '作者',
    dataIndex: 'author',
    ellipsis: true,
    width: '150px',
    scopedSlots: { customRender: 'author' },
  },
  {
    title: '阅读量',
    width: '100px',
    dataIndex: 'readCount'
  },
  {
    title: '状态',
    width: '70px',
    dataIndex: 'isPublish',
    scopedSlots: { customRender: 'status' }
  },
  {
    title: '隐私',
    width: '70px',
    dataIndex: 'isPrivate',
    scopedSlots: { customRender: 'private' }
  },
  
  {
    title: '评论',
    width: '70px',
    dataIndex: 'isAllowComment',
    scopedSlots: { customRender: 'allowComment' }
  },
  {
    title: '原创',
    width: '70px',
    dataIndex: 'isOriginal',
    scopedSlots: { customRender: 'origin' }
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
      article: {
        list: [],
        total: 0
      },
      filterForm: {
        title: '',
        isPublish: '',
        category: ''
      },
      columns,
      loading: false,
      pagination: {
        pageSizeOptions: ['10', '20', '30', '40', '50'],
        showSizeChanger: true,
        current: 1,
        pageSize: 10,
        total: 0,
        showTotal: (total) => `共${total}条`
      },
      currentArticle: {},
      userCategories: []
    };
  },
  title () {
    return '文章管理';
  },
  mounted () {
    this.fetchCategoryList();
    this.fetchArticleList();
  },
  methods: {
    handleTableChange ({ current, pageSize }) {
      this.pagination.current = current;
      this.pagination.pageSize = pageSize;
      this.fetchArticleList();
    },
    resetCurrentPage() {
      this.pagination.current = 1;
    },
    handleSearch () {
      this.resetCurrentPage();
      this.fetchArticleList();
    },
    fetchArticleList () {
      const params = {
        ...this.filterForm,
        currentPage: this.pagination.current,
        pageSize: this.pagination.pageSize
      };
      $http.get('/article/list', {
        params,
        currentPage: this.pagination.current,
        pageSize: this.pagination.pageSize
      })
        .then(res => {
          this.article.list = res.data.list;
          this.pagination.total = res.data.total;
        })
    },
    fetchCategoryList () {
      const params = {};
      $http.get('/category/list', {
        params
      })
        .then(res => {
          this.userCategories = res.data.list;
        });
    },
    handleEdit (row) {
      const path = `/article/edit/${row.id}`;
      this.$router.push(path)
    },
    handleDelete (row) {
      const params = {
        id: row.id
      }
      $http.get('/article/delete', {
        params
      })
        .then(() => {
          this.$message.success('删除成功');
        })
    },
    handleCreateArticle () {
      this.loading = true;
      $http.get('/article/create')
        .then(res => {
          this.$router.push({
            name: 'create-article',
            params: {
              id: res.data.id
            }
          });
        })
        .finally(() => {
          this.loading = false;
        })
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
