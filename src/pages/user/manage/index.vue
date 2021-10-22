<template>
  <div class="user">
    <a-space direction="vertical" style="width:100%;">
      <a-row>
        <a-col :span="24">
          <a-card title="用户管理" :bordered="false">
            <a-button
              type="primary"
              slot="extra"
              :loading="loading"
              @click="handleCreateUser"
            >
              创建用户
            </a-button>
            <!-- 搜索 -->
            <a-form-model layout="inline" :model="filterForm" @submit="handleSearch" @submit.native.prevent>
              <a-form-model-item label="用户名">
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
              <template slot="name" slot-scope="name">
                <a-tooltip placement="topLeft" :title="name">
                  {{ name }}
                </a-tooltip>
              </template>
              <template slot="email" slot-scope="email">
                <a-tooltip placement="topLeft" :title="email">
                  {{ email | formatString }}
                </a-tooltip>
              </template>
              <template slot="role" slot-scope="role">
                <a-tag color="green" v-if="role === 'admin'">管理员</a-tag>
                <a-tag color="orange" v-else>成员</a-tag>
              </template>
              <template slot="status" slot-scope="status">
                <a-tag color="green" v-if="status === 1">正常</a-tag>
                <a-tag color="orange" v-else>冻结</a-tag>
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
                    placement="topRight"
                    okType="danger"
                    :title="`确定要删除用户${row.name}?删除后不可恢复`"
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
    title: '用户名',
    dataIndex: 'name',
    ellipsis: true,
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '电子邮箱',
    width: '200px',
    ellipsis: true,
    dataIndex: 'email',
    scopedSlots: { customRender: 'email' }
  },
  {
    title: '身份',
    width: '100px',
    dataIndex: 'role',
    scopedSlots: { customRender: 'role' }
  },
  {
    title: '文章数',
    width: '100px',
    dataIndex: 'articleCount'
  },
  {
    title: '分类数',
    width: '100px',
    dataIndex: 'categoryCount'
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
    this.fetchUserList();
  },
  methods: {
    handleTableChange (args) {
      console.log(args);
    },
    handleSearch () {
      console.log(this.filterForm);
    },
    fetchUserList () {
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
      $http.get('/user/list', {
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
    handleDelete (row) {
      const params = {
        id: row.id
      };
      $http.get('/user/delete', {
        params
      })
        .then(res => {
          this.$message.success({
            content: `删除用户${row.name}成功`,
            key: 'key'
          });
          this.fetchUserList();
        })
    },
    handleEdit (row) {
      const path = `/user/edit/${row.id}`;
      this.$router.push(path);
    },
    handleCreateUser () {
      this.$router.push({
        name: 'create-user'
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
