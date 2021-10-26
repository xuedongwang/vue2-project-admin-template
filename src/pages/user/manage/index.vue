<template>
  <div class="user">
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
              <a-input v-model="filterForm.name"></a-input>
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
          <a-table :scroll="{ x: 1500}" @change="handleTableChange" :pagination="pagination" rowKey="id" :columns="columns" :data-source="userList" bordered>
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
            <template slot="isBan" slot-scope="isBan">
              <a-tag color="orange" v-if="isBan">停用</a-tag>
              <a-tag color="green" v-else>正常</a-tag>
            </template>
            <template slot="createdAt" slot-scope="createdAt">
              {{ createdAt | dayjs('YYYY年MM月DD日 hh:mm:ss') }}
            </template>
            <template slot="updatedAt" slot-scope="updatedAt">
              {{ updatedAt | dayjs('YYYY年MM月DD日 hh:mm:ss') }}
            </template>
            <template slot="operation" slot-scope="text,row">
              <div class="row-operations">
                <template v-if="row.role === 'admin'">
                  <a-tooltip placement="topRight">
                    <template slot="title">
                      <span>管理员不能被停用</span>
                    </template>
                    <text-button :disabled="true" @click="() => handleToggleBanUser(row)">停用</text-button>
                  </a-tooltip>
                  <a-tooltip placement="topRight">
                    <template slot="title">
                      <span>管理员不能被删除</span>
                    </template>
                    <text-button :disabled="true" type="danger">删除</text-button>
                  </a-tooltip>
                </template>
                <template
                  v-else
                >
                  <a-popconfirm
                    placement="topRight"
                    okType="danger"
                    ok-text="停用"
                    cancel-text="取消"
                    @confirm="handleToggleBanUser(row)"
                  >
                    <template slot="title">
                      <template v-if="row.isBan">
                        <div>确定要启用用户<a-tag color="green">{{row.name}}</a-tag>?</div>
                        <div>启用后该用户可以正常登录</div>
                      </template>
                      <template v-else>
                        <div>确定要停用用户<a-tag color="orange">{{row.name}}</a-tag>?</div>
                        <div>停用后后该用户不能登录</div>
                      </template>
                    </template>
                    <text-button>{{ row.isBan ? '启用' : '停用' }}</text-button>
                  </a-popconfirm>
                  <a-popconfirm
                    placement="topRight"
                    okType="danger"
                    ok-text="删除"
                    cancel-text="取消"
                    @confirm="handleDelete(row)"
                  >
                    <template slot="title">
                      <div>确定要删除用户<a-tag color="red">{{row.name}}</a-tag>?</div>
                      <div>删除后不可恢复</div>
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
  </div>
</template>

<script>
import { titleMixin } from '@/mixins';
const columns = [
  {
    title: '用户名',
    dataIndex: 'name',
    ellipsis: true,
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '账号',
    dataIndex: 'account',
    ellipsis: true,
    scopedSlots: { customRender: 'account' }
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
    title: '状态',
    width: '100px',
    dataIndex: 'isBan',
    scopedSlots: { customRender: 'isBan' }
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
  title: '用户管理',
  data () {
    return {
      userList: [],
      filterForm: {
        name: '',
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
  mounted () {
    this.fetchUserList();
  },
  methods: {
    handleTableChange ({ current, pageSize }) {
      this.pagination.current = current;
      this.pagination.pageSize = pageSize;
      this.fetchUserList();
    },
    resetCurrentPage() {
      this.pagination.current = 1;
    },
    handleSearch () {
      this.resetCurrentPage();
      this.fetchUserList();
    },
    fetchUserList () {
      const params = {
        ...this.filterForm,
        currentPage: this.pagination.current,
        pageSize: this.pagination.pageSize
      };
      $http.get('/user/list', {
        params
      })
        .then(res => {
          this.userList = res.data.list;
          this.pagination.total = res.data.total;
        })
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
    handleToggleBanUser (row) {
      const params = {
        id: row.id,
        isBan: row.isBan ? 0 : 1
      };
      $http.get('/user/toggle_ban', {
        params
      })
        .then(() => {
          this.$message.success({
            content: `${row.isBan ? '启用' : '停用'}用户${row.name}成功`,
            key: 'key'
          });
          this.fetchUserList();
        })
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
