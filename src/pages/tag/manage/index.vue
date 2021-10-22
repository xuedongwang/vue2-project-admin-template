<template>
  <div class="tag">
    <a-row>
      <a-col :span="24">
        <a-card title="标签管理" :bordered="false">
          <a-button
            type="primary"
            slot="extra"
            @click="handleCreateTag"
          >
            创建标签
          </a-button>
          <!-- 搜索 -->
          <a-form-model layout="inline" :model="filterForm" @submit="handleSearch" @submit.native.prevent>
            <a-form-model-item label="标题">
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
          <a-table :pagination="pagination" rowKey="id" :columns="columns" :data-source="tag.list" bordered>
            <p slot="expandedRowRender" slot-scope="record" style="margin: 0">
              {{ record.description | formatString }}
            </p>
            <template slot="createdAt" slot-scope="createdAt">
              {{ createdAt | dayjs }}
            </template>
            <template slot="updatedAt" slot-scope="updatedAt">
              {{ updatedAt | dayjs }}
            </template>
            <template slot="operation" slot-scope="text,row">
              <div class="row-operations">
                <a @click="() => handleEdit(row)">编辑</a>
                <a-popconfirm
                  :title="`确定删除${currentTag.name}标签吗？删除后不可恢复`"
                  ok-text="删除"
                  cancel-text="取消"
                  placement="topRight"
                  @confirm="handleDelete(row)"
                >
                  <a style="color:#f5222d" @click="() => currentTag = row">删除</a>
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
    dataIndex: 'name'
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
  mixins: [titleMixin],
  data () {
    return {
      tag: {
        list: [],
        total: 0
      },
      filterForm: {
        name: ''
      },
      columns,
      pagination: {
        pageSizeOptions: ['10', '20', '30', '40', '50'],
        showSizeChanger: true,
        current: 1,
        pageSize: 10,
        total: 0
      },
      currentTag: {}
    };
  },
  title () {
    return '标签管理';
  },
  mounted () {
    this.fetchTagList();
  },
  methods: {
    handleSearch () {
      console.log(this.filterForm);
    },
    fetchTagList () {
      const params = {
        ...this.filterForm,
        currentPage: this.pagination.current,
        pageSize: this.pagination.pageSize
      };
      $http.get('/tag/list', {
        params,
        currentPage: this.pagination.current,
        pageSize: this.pagination.pageSize
      })
        .then(res => {
          this.tag.list = res.data.list;
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
      $http.get('/tag/delete', {
        params
      })
        .then(() => {
          this.resetCurrentPage();
          this.fetchTagList();
          this.$message.success({
            content: '删除标签成功',
            key: 'key'
          });
        });
    },
    handleEdit (row) {
      const path = `/tag/edit/${row.id}`;
      this.$router.push(path);
    },
    handleCreateTag () {
      this.$router.push({
        name: 'create-tag'
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
