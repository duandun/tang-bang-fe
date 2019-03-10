<template>
  <div class="assign-table-container">
    <Modal v-model="dialog.visible" title="用户列表" width="850" :mask-closable="false" :styles="{top: '30px'}" :transfer="true">
      <Form ref="form" :label-width="100" onSubmit="return false;" :model="query">
        <Row>
            <Col span="8">
                <Form-item label="账号/姓名：" prop="userName">
                    <Input placeholder="请输入..." v-model="query.userName"></Input>
                </Form-item>
            </Col>
            <Col span="8">
                <Form-item label="角色：" prop="permission">
                    <Select v-model="query.permission">
                        <Option value="">全部</Option>
                        <Option v-for="(item,index) in actorList" :value="item.value" :key="index">{{ item.label }}</Option>
                    </Select>
                </Form-item>
            </Col>
            <Col span="6" offset="1">
              <Button type="primary" icon="search" @click="search">搜索</Button>
            </Col>
        </Row>
      </Form>
      <Row class="table-container">
        <Table :columns="tableColumns" :data="tableList" :loading="loading" highlight-row ref="table" @on-current-change="handleCurrentSelChange"/>
        <Page
          class="page-container"
          :total="total"
          :page-size="query.pageSize"
          :current="query.pageStart"
          @on-change="handleCurrentChange"
          @on-page-size-change="handlePageSizeChange"
          show-sizer>
        </Page>
      </Row>
      <div slot="footer">
        <Button type="primary" @click.stop="confirmDialog" :disabled="!selectedRow.id">确认</Button>
        <Button @click.stop="cancelDialog">取消</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import List from '@/components/list'
  import * as Config from './list.config.js'
  import { ACTOR } from '@/constant'
  import api from '@/api'
  export default {
    extends: List,
    props: {
      dialog: Object
    },
    data () {
      return {
        cacheQuery: false,
        query: {
          permission: void 0,
          userName: '',
          pageStart: 1,
          pageSize: 10
        },
        actorList: ACTOR,
        selectedRow: {},
        tableColumns: Config.getTableColumns(this)
      }
    },
    watch: {
      'dialog.visible' (val) {
        if (!val) {
          this.selectedRow = {}
          this.$refs.form.resetFields()
          return
        }
        this.search()
      }
    },
    methods: {
      fetchApi: api.auth.list,
      confirmDialog () {
        const id = this.dialog.id || this.dialog.batchIds;
        const params = {
          id,
          username: this.selectedRow.username
        }
        api.contract.assignUser(params).then(results => {
          if (results.flag) {
            this.dialog.visible = false
            this.$Message.success('指派成功');
            this.$emit('confirm', this.selectedRow)
          }
        })
      },
      cancelDialog () {
        this.dialog.visible = false
        this.$emit('cancel')
      },
      handleCurrentSelChange (curRow, oldRow) {
        this.selectedRow = curRow
      }
    }
  }
</script>
