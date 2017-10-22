<template lang="html">
  <div class="auth-list-container">
    <!-- 搜索条件 -->
    <Form ref="form" :label-width="100" onSubmit="return false;">
        <Row>
            <Col span="7">
                <Form-item label="账号/姓名：">
                    <Input placeholder="请输入..." v-model="query.userName"></Input>
                </Form-item>
            </Col>
            <Col span="7">
                <Form-item label="角色：">
                    <Select v-model="query.permission">
                        <Option value="">全部</Option>
                        <Option v-for="(item,index) in actorList" :value="item.value" :key="index">{{ item.label }}</Option>
                    </Select>
                </Form-item>
            </Col>
            <Col span="4" style="margin-left: 20px;">
              <Button type="primary" icon="search" @click="search">搜索</Button>
              <Button icon="trash-b" @click="clearQuery">重置</Button>
            </Col>
        </Row>
    </Form>
    <!-- 搜索条件 -->

    <Row class="table-container">
      <Table :columns="tableColumns" :data="tableList" :loading="loading"/>
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
    <Modal v-model="dialog.visible" :mask-closable="false" title="选择权限" :transfer="true">
      <select-form ref="selectForm" v-if="dialog.visible" @close-dialog="afterConfirm" :userId="userId" :userRoles="userRoles"></select-form>
      <div slot="footer">
        <Button type="primary" @click.stop="confirmActor">确认</Button>
        <Button @click.stop="cancelActor">取消</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import List from '@/components/list'
import * as Config from './list.config.js'
import SelectForm from './components/select-form.vue'
import { ACTOR } from '@/constant'
import api from '@/api'

export default {
  extends: List,
  components: {
    SelectForm
  },
  data () {
    return {
      cacheQuery: true,
      query: {
        permission: void 0,
        userName: '',
        pageStart: 1,
        pageSize: 10
      },
      userRoles: [],
      actorList: ACTOR,
      dialog: {
        visible: false
      },
      userId: '',
      tableColumns: Config.getTableColumns(this)
    }
  },
  methods: {
    fetchApi: api.auth.list,
    confirmActor () {
      this.$refs.selectForm.handleSubmit()
    },
    cancelActor () {
      this.dialog.visible = false
    },
    afterConfirm (formdata) {
      this.dialog.visible = false
      this.search()
    }
  }
}
</script>

<style lang="less">
.table-container {
  padding: 10px 0;
}
.spin-loading {
  border: 1px solid #ddd;
  top: 40%;
  margin: 0 auto;
  width: 150px;
  height: 60px;
}
</style>
