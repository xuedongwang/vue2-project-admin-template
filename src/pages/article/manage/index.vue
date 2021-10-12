<template>
  <div class="article">
    <a-space direction="vertical" style="width:100%;">
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
                <a-input v-model="filterForm.title"></a-input>
              </a-form-model-item>
              <a-form-model-item label="状态">
                <a-select v-model="filterForm.isPublish" style="width:178px;">
                  <a-select-option :value="1">已发布</a-select-option>
                  <a-select-option :value="2">草稿</a-select-option>
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
      <a-row>
        <a-col :span="24">
          <a-card :bordered="false">
            <a-table @change="handleTableChange" :pagination="pagination" rowKey="id" :columns="columns" :data-source="article.list" bordered>
              <p slot="expandedRowRender" slot-scope="record" style="margin: 0">
                {{ record.description }}
              </p>
              <template slot="status" slot-scope="isPublish">
                <a-tag color="green" v-if="isPublish">已发布</a-tag>
                <a-tag color="orange" v-else>草稿</a-tag>
              </template>
              <template slot="createdAt" slot-scope="createdAt">
                {{ createdAt | dayjs }}
              </template>
              <template slot="updatedAt" slot-scope="updatedAt">
                {{ updatedAt | dayjs }}
              </template>
              <template slot="operation" slot-scope="text,row">
                <div class="row-operations">
                  <a @click="() => handleEdit(row)">编辑</a>
                  <a style="color:#f5222d" @click="() => handleEdit(row)">删除</a>
                </div>
              </template>
            </a-table>
          </a-card>
        </a-col>
      </a-row>
    </a-space>
  </div>
</template>

<script>
const columns = [
  {
    title: '标题',
    dataIndex: 'title'
  },
  {
    title: '作者',
    dataIndex: 'author',
    width: '100px'
  },
  {
    title: '阅读量',
    width: '100px',
    dataIndex: 'readCount'
  },
  {
    title: '状态',
    width: '100px',
    dataIndex: 'isPublish',
    scopedSlots: { customRender: 'status' }
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    width: '180px',
    scopedSlots: { customRender: 'createdAt' }
  },
  {
    title: '修改时间',
    dataIndex: 'updatedAt',
    width: '180px',
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
  data () {
    return {
      name: '文章管理',
      article: {
        list: [],
        total: 0
      },
      filterForm: {
        title: '',
        isPublish: ''
      },
      columns,
      loading: false,
      pagination: {
        pageSizeOptions: ['10', '20', '30', '40', '50'],
        showSizeChanger: true,
        current: 1,
        pageSize: 10,
        total: 0
      }
    };
  },
  title () {
    return this.name;
  },
  mounted () {
    this.fetchArticleList();
  },
  methods: {
    handleTableChange (args) {
      console.log(args);
    },
    handleSearch () {
      console.log(this.filterForm);
    },
    fetchArticleList () {
      const hide = this.$message.loading({
        content: '加载中...',
        duration: 0,
        key: 'key'
      });
      const params = {
        ...this.filterForm
      };
      $http.get('/article/list', {
        params,
        currentPage: this.pagination.current,
        pageSize: this.pagination.pageSize
      })
        .then(res => {
          hide();
          this.article.list = res.data.list;
          this.pagination.total = res.data.total;
        })
        .catch(err => {
          this.$message.error({
            content: '网络故障，请重试',
            key: 'key'
          });
          throw err;
        });
    },
    handleEdit (row) {
      const path = `/article/edit/${row.id}`;
      this.$router.push(path);
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
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
          this.$message.error({
            content: '网络故障，请重试',
            key: 'key'
          });
          throw err;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
