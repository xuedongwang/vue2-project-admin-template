<template>
  <div class="category">
    <a-row>
      <a-col :span="24">
        <a-card title="分类管理" :bordered="false">
          <a-button
            type="primary"
            slot="extra"
            :loading="loading === 'create'"
            @click="handleCreateCategory"
          >
            创建分类
          </a-button>
          <a-table :columns="columns" :data-source="data" bordered>
            <template
              v-for="col in ['name', 'age', 'address']"
              :slot="col"
              slot-scope="text"
            >
              <div :key="col">
                {{ text }}
              </div>
            </template>
            <template slot="operation" slot-scope="text, record">
              <div class="row-operations">
                <a @click="() => handleEdit(record.key)">编辑</a>
                <a style="color:#f5222d" @click="() => handleEdit(record.key)">删除</a>
              </div>
            </template>
          </a-table>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
const columns = [
  {
    title: 'name',
    dataIndex: 'name',
    width: '25%',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: 'age',
    dataIndex: 'age',
    width: '15%',
    scopedSlots: { customRender: 'age' }
  },
  {
    title: 'address',
    dataIndex: 'address',
    scopedSlots: { customRender: 'address' }
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: '100px',
    scopedSlots: { customRender: 'operation' }
  }
];
const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`
  });
}
export default {
  breadcrumb: [
    {
      title: '主页',
      path: '/'
    }
  ],
  data () {
    return {
      name: '分类管理',
      data,
      columns,
      loading: ''
    };
  },
  title () {
    return this.name;
  },
  methods: {
    handleEdit (key) {
      console.log(key);
    },
    handleCreateCategory () {
      this.loading = 'create';
      setTimeout(() => {
        this.loading = '';
        this.$router.push({
          name: 'create-category',
          params: {
            id: Date.now()
          }
        });
      }, 1000);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
