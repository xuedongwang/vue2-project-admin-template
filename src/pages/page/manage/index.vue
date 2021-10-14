<template>
  <div class="user">
    <a-space direction="vertical" style="width:100%;">
      <a-row>
        <a-col :span="24">
          <a-card title="页面管理" :bordered="false">
            <a-button
              type="primary"
              slot="extra"
              :loading="loading"
              @click="handleCreatePage"
            >
              创建页面
            </a-button>
            <!-- 搜索 -->
            <a-form-model layout="inline" :model="filterForm" @submit="handleSearch" @submit.native.prevent>
              <a-form-model-item label="页面标题">
                <a-input v-model="filterForm.title"></a-input>
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
            <a-table @change="handleTableChange" :pagination="pagination" rowKey="id" :columns="columns" :data-source="user.list" bordered>
              <p slot="expandedRowRender" slot-scope="record" style="margin: 0">
                {{ record.description }}
              </p>
              <template slot="username" slot-scope="username">
                <a-tooltip placement="topLeft" :title="username">
                  {{ username }}
                </a-tooltip>
              </template>
              <template slot="id" slot-scope="id">
                <a-icon slot="addonAfter" type="copy" />
                <a-tooltip placement="topLeft" :title="id">
                  {{ pageUrl(id) }}
                </a-tooltip>
              </template>
              <template slot="status" slot-scope="status">
                <a-tag color="green" v-if="status === 1">正常</a-tag>
                <a-tag color="orange" v-else>冻结</a-tag>
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
                  <a @click="() => handleEdit(row)">访问</a>
                  <a @click="() => handleEdit(row)">复制</a>
                  <a-popconfirm
                    placement="topRight"
                    okType="danger"
                    :title="`确定要删除页面${row.username}?删除后不可恢复`"
                    ok-text="删除"
                    cancel-text="取消"
                    @confirm="handleDelete(row)"
                  >
                    <a style="color:#f5222d">删除</a>
                  </a-popconfirm>
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
    title: '页面标题',
    dataIndex: 'username',
    ellipsis: true,
    scopedSlots: { customRender: 'username' }
  },
  {
    title: '页面地址',
    width: '500px',
    ellipsis: true,
    dataIndex: 'id',
    scopedSlots: { customRender: 'id' }
  },
  {
    title: '创建者',
    width: '100px',
    dataIndex: 'createUser'
  },
  {
    title: '访问次数',
    width: '100px',
    dataIndex: 'tagCount'
  },
  {
    title: '状态',
    width: '100px',
    dataIndex: 'status',
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
    width: '180px',
    fixed: 'right',
    scopedSlots: { customRender: 'operation' }
  }
];
export default {
  data () {
    return {
      name: '文章管理',
      user: {
        list: [],
        total: 0
      },
      filterForm: {
        title: '',
        status: ''
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
    this.fetchPageList();
  },
  methods: {
    pageUrl(id) {
      return `${location.origin}/page/${id}`;
    },
    handleTableChange (args) {
      console.log(args);
    },
    handleSearch () {
      console.log(this.filterForm);
    },
    fetchPageList () {
      const hide = this.$message.loading({
        content: '加载中...',
        duration: 0,
        key: 'key'
      });
      const params = {
        ...this.filterForm,
        currentPage: this.pagination.current,
        pageSize: this.pagination.pageSize
      };
      $http.get('/page/list', {
        params
      })
        .then(res => {
          hide();
          this.user.list = res.data.list;
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
    handleDelete(row) {
      console.log(row);
      const hide = this.$message.loading({
        content: `正在删除页面${row.username}...`,
        duration: 0,
        key: 'key'
      });
      const params = {
        id: row.id
      };
      $http.get('/user/delete', {
        params
      })
        .then(res => {
          this.$message.success({
            content: `删除页面${row.username}成功`,
            key: 'key'
          });
          this.fetchPageList();
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
      const path = `/page/edit/${row.id}`;
      this.$router.push(path);
    },
    handleCreatePage () {
      const path = `/page/create/${Date.now()}`;
      this.$router.push({
        path
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
