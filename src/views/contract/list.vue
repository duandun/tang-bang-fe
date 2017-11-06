<template lang="html">
    <div class="list-container">
        <Form ref="form" :label-width="100" onSubmit="return false;">
            <Row>
                <Col span="6">
                    <Form-item label="合同编号:">
                        <Input placeholder="请输入..." v-model="query.contract_id"></Input>
                    </Form-item>
                </Col>
                <Col span="6">
                    <Form-item label="公司名称:">
                        <Input v-model="query.company_name" @keyup.enter.native="search"></Input>
                    </Form-item>
                </Col>
                <Col span="6">
                    <Form-item label="合同状态:">
                        <Select v-model="query.status">
                            <Option label="全部" value="">
                            </Option>
                            <Option v-for="item in statusList"
                              :key="item.value" :label="item.label" :value="item.value">
                            </Option>
                        </Select>
                    </Form-item>
                </Col>
                <Col span="5" style="margin-left: 20px;">
                    <Button type="primary" icon="search" @click="search">搜索</Button>
                    <Button icon="trash-b" @click="clearQuery">重置</Button>
                    <Button type="primary" icon="ios-reload" @click="search">刷新</Button>
                </Col>
            </Row>
        </Form>
        <Row>
            <!-- <Spin fix style="border: 1px solid #ddd;top: 40%;width: 150px;height: 60px;margin: 0 auto;" v-if="loading">
                <Icon type="load-c" size="18" class="demo-spin-icon-load"></Icon>
                <div>Loading</div>
            </Spin> -->
            <el-table
              :data="tableList" v-loading.body="loading"
              style="width: 100%">
              <el-table-column
                type="index"
                width="60">
              </el-table-column>
              <el-table-column
                prop="contract_id"
                label="合同编号"
                >
              </el-table-column>
              <el-table-column
                prop="company_name"
                label="公司名称">
              </el-table-column>
              <el-table-column
                prop="commission"
                label="委托事项">
              </el-table-column>
              <el-table-column
                prop="createtime"
                label="提交时间"
                width="180">
              </el-table-column>
              <el-table-column
                prop="resultStatusTxt"
                label="进度">
                <template scope="scope">
                    <el-popover trigger="click"
                    placement="top-end">
                        <el-steps :space="120" :active="getActiveStep(scope.$index)" style="z-index: 1;">
                          <el-step :title="item.text" v-for="(item, index) in MODAL" :key="index">
                              <div class="" slot="description">
                                  <el-button
                                    size="small" v-if="getActiveStep(scope.$index) > index && curMaxPerm(scope.$index) > index"
                                    @click="showDialog(item, 'detail', scope.row)">{{item.text + '详情'}}</el-button>
                              </div>
                          </el-step>
                      </el-steps>
                      <div slot="reference" style="display: inline-block;">
                        <el-tag>{{ scope.row.resultStatusTxt }}</el-tag>
                      </div>
                    </el-popover>
                  </template>
              </el-table-column>
              <el-table-column label="操作" width="180">
                  <template scope="scope">
                        <el-button v-for="(item, index) in MODAL" :key="index"
                          size="small"
                           type="text" v-if="getActiveStep(scope.$index) === index && curOp(index) && scope.row.status === '1'"
                          @click="showDialog(item, 'edit', scope.row)">{{item.text}}</el-button>
                        <el-button
                          size="small"
                          type="text"
                          v-if="scope.row.receipt === 0"
                          @click="showReceipt(scope.row)"
                        >填写票据</el-button>
                        <el-button
                          size="small"
                          type="text"
                          v-if="userInfo.role === 'admin'"
                          @click="assignTo(scope.row)"
                        >指派</el-button>
                  </template>
                </el-table-column>
            </el-table>
            <Page
                :total="total"
                :page-size="query.pageSize"
                :current="query.pageStart"
                @on-change="handleCurrentChange"
                @on-page-size-change="handlePageSizeChange"
                show-sizer
                placement="top"
                class="page-container">
            </Page>
        </Row>
        <Modal v-model="dialog.visible" width="800" :mask-closable="false" :styles="{top: '30px'}" :transfer="true">
            <p slot="header">
                <span>{{ dialog.title }}</span>
            </p>
            <component :is="currentModal"
                v-if="dialog.visible"
                :dialog="dialog"
                @cancel="dialog.visible = false"
                @save-success="handleSuccess"></component>
            <div class="" slot="footer" style="display: none;">
            </div>
        </Modal>
        <receipt @save-success="handleSuccess" :dialog="receiptDialog"></receipt>
        <assign-table :dialog="assignDialog" @confirm="search"></assign-table>
    </div>
</template>

<script>
import List from '@/components/list';
import ContractForm from '@/components/contract/contract-form/form.vue';
import ContractConfirm from '@/components/contract/contract-confirm.vue';
import MaterialForm from '@/components/material/material-form/form.vue';
import MaterialConfirm from '@/components/material/material-confirm.vue';
import LegalAcceptForm from '@/components/legal/legal-accept.vue';
import LegalSubmitForm from '@/components/legal/legal-form/form.vue';
import MaterialSubAgainForm from '@/components/material/material-subagain-form.vue';
import FinalResultsForm from '@/components/final-results/final-results-form.vue';
import AssignTable from './assign-table/assign-table.vue';
import cloneDeep from 'lodash/cloneDeep';
import max from 'lodash/max'
import findLastIndex from 'lodash/findLastIndex'
import api from '@/api';
import { STEP, MODAL } from '@/constant'
import { mapGetters } from 'vuex'
import Receipt from './receipt.vue'

const statusText = {
  1: '处理中',
  2: '已完成',
  3: '已终止'
}

export default {
  extends: List,
  components: {
    ContractForm,
    ContractConfirm,
    MaterialForm,
    MaterialConfirm,
    LegalAcceptForm,
    LegalSubmitForm,
    MaterialSubAgainForm,
    FinalResultsForm,
    Receipt,
    AssignTable
  },
  data() {
    const statusList = []
    Object.keys(statusText).forEach(i => {
      statusList.push({
        value: i,
        label: statusText[i]
      })
    })
    return {
      statusList,
      popVis: false,
      currentModal: '',
      MODAL: MODAL,
      queryAssist: {
        dIds: [],
        doing: 1,
        done: 2
      },
      query: {
        contract_id: '',
        company_name: '',
        pageStart: 1,
        pageSize: 10
      },
      dialog: {
        title: '',
        visible: false,
        detail: false,
        id: '',
        contract_id: ''
      },
      constStep: [],
      receiptDialog: {
        visible: false,
        id: ''
      },
      assignDialog: {
        visible: false
      }
    };
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  created() {
    this._original_dialog = cloneDeep(this.$data.dialog);
  },
  methods: {
    curOp (index) {
      const operates = this.userInfo.permission
      if (operates.indexOf(`${index + 1}`) > -1) {
        return true
      }
      return false
    },
    curMaxPerm (index) {
      const operates = this.userInfo.permission
      const operatesNum = operates.map(i => Number(i))
      return max(operatesNum)
    },
    handleSuccess () {
      this.search()
      this.dialog.visible = false
    },
    getActiveStep (index) {
      const item = this.constStep[index]
      let stepIndex = 1
      const keys = Object.keys(item)
      stepIndex = findLastIndex(keys, i => item[i])
      return stepIndex + 1
    },
    fetchApi: api.contract.list,

    showReceipt (row) {
      this.receiptDialog.id = row.contract_id
      this.receiptDialog.visible = true
    },

    assignTo (row) {
      const { assignDialog } = this
      assignDialog.id = row.id
      this.$router.push({
        query: {
          id: row.id
        }
      })
      assignDialog.visible = true
    },

    showDialog (item, type, row) {
      this.currentModal = item.name
      this.dialog.detail = type === 'detail'
      this.dialog.title = type === 'detail' ? `${item.text}详情` : `${item.text}`
      this.dialog.contract_id = row.contract_id
      this.dialog.id = row.id
      let id = row.id
      if (item.name !== 'ContractForm' && item.name !== 'ContractConfirm') {
        id = row.contract_id
      }
      this.$router.push({
        query: {
          id
        }
      })
      if (item.name === 'FinalResultsForm') {
        this.$Modal.confirm({
          title: '结果',
          content: '是否结束流程？',
          okText: '是',
          cancelText: '否',
          onOk: () => {
            api.result.end(id).then(results => {
              this.search()
            })
          }
        })
      } else {
        this.dialog.visible = true
      }
    },

    formatData(results) {
      this.constStep = []
      const arr = []
      results.forEach(item => {
        item.resultStatusTxt = statusText[item.status]
        arr.push(STEP(item))
      });
      this.constStep = arr
      return results;
    },

    resetDialog() {
      this.dialog = {
        title: '',
        visible: false,
        confirm: false,
        confirmDetail: false,
        detail: false
      }
    }
  }
}
</script>
