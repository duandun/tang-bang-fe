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
                    <Form-item label="甲方名称:">
                        <Input v-model="query.company_name" @keyup.enter.native="search" placeholder="请输入..."></Input>
                    </Form-item>
                </Col>
                <Col span="6">
                    <Form-item label="合同状态:">
                        <Select v-model="query.status" @on-change="search">
                            <Option label="全部" value="">
                            </Option>
                            <Option v-for="item in statusList"
                              :key="item.value" :label="item.label" :value="item.value">
                            </Option>
                        </Select>
                    </Form-item>
                </Col>
            </Row>
            <Row>
              <Col span="6">
                    <Form-item label="委托事项:">
                        <Input v-model="query.commission" placeholder="请输入..." @keyup.enter.native="search"></Input>
                    </Form-item>
                </Col>
                <Col span="6">
                    <Form-item label="流程步骤:">
                      <Select v-model="query.processType" @on-change="search">
                        <Option label="全部" value=""></Option>
                        <Option v-for="(item, index) in MODAL" :key="index" :label="item.text" :value="index + 1" v-if="index > 0"></Option>
                      </Select>
                    </Form-item>
                </Col>
                <Col span="6">
                  <Form-item label="签单人:">
                    <Input v-model="query.nickname" @keyup.enter.native="search" placeholder="签单人姓名..."></Input>
                  </Form-item>
                </Col>
                <Col span="4" offset="1">
                    <Button type="primary" icon="search" @click="search">搜索</Button>
                    <Button icon="trash-b" @click="clearQuery">重置</Button>
                </Col>
            </Row>
            <Row style="margin-bottom: 10px;" v-if="userInfo.role === 'admin'">
              <Col span="12">
                <Button type="primary" :disabled="!Boolean(selRows.length)" v-if="userInfo.role === 'admin'" @click="batchAssignTo">批量指派</Button>
                <Button type="primary" :disabled="!Boolean(selRows.length)" v-if="userInfo.role === 'admin'" @click="batchDel">批量删除</Button>
                <Button type="primary" @click="downloadBatchUrl" v-if="userInfo.role === 'admin'" :disabled="!Boolean(selRows.length)">批量下载</Button>
                <Button type="primary" v-if="userInfo.role === 'admin'">
                  <a :href="downloadBatchAll()" target="_blank" style="color: #fff;">下载全部</a></Button>
                <Button type="default" @click="clearSelection" v-if="userInfo.role === 'admin'" :disabled="!Boolean(selRows.length)">清空选择</Button>
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
              @selection-change="handleSelectionChange"
              row-key="id"
              ref="mainList"
              style="width: 100%">
              <el-table-column
                v-if="userInfo.role === 'admin'"
                :reserve-selection="true"
                type="selection"
                width="55">
              </el-table-column>
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
                label="甲方名称">
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
                    :ref="`track_${scope.$index}`"
                    placement="top-end">
                        <el-steps :space="120" :active="getActiveStep(scope.$index)" style="z-index: 1;">
                          <el-step :title="item.text" v-for="(item, index) in MODAL" :key="index">
                              <div slot="description">
                                  <el-button
                                    size="small" v-if="getActiveStep(scope.$index) > index && showDetailBtn(scope.$index, index) && index !== 7"
                                    @click="showDialog(item, 'detail', scope.row, scope.$index)">{{item.text + '详情'}}</el-button>
                                  <el-button 
                                    v-if="getActiveStep(scope.$index) > index && showDetailBtn(scope.$index, index) && index !== 7 && item.name === 'LegalSubmitForm'" 
                                    size="small" style="margin-top: 5px;" @click="addLegalItem(item)">添加项目</el-button>
                              </div>
                          </el-step>
                      </el-steps>
                      <div slot="reference" style="display: inline-block;cursor: pointer;">
                        <el-tag>{{ scope.row.resultStatusTxt }}</el-tag>
                      </div>
                    </el-popover>
                  </template>
              </el-table-column>
              <el-table-column label="操作" width="180">
                  <template scope="scope">
                      <div>
                        <el-button v-for="(item, index) in MODAL" :key="index"
                          size="small"
                          type="text" v-if="getActiveStep(scope.$index) === index && curOp(index) && scope.row.status === '1'"
                          @click="showDialog(item, 'edit', scope.row, scope.$index)">{{item.text}}</el-button>
                        <el-button
                          size="small"
                          type="text"
                          v-if="scope.row.receipt === 0"
                          @click="showReceipt(scope.row)"
                        >填写票据</el-button>
                        <el-button
                          size="small"
                          type="text"
                          v-if="userInfo.role === 'admin' || (userInfo.permission && userInfo.permission.includes('9'))"
                          @click="assignTo(scope.row)"
                        >指派</el-button>
                        <el-button
                          v-if="userInfo.role === 'admin'"
                          size="small"
                          type="text"
                          @click="onDirectFinish(scope.row)"
                        >
                        直接完成
                        </el-button>
                        <el-button
                          size="small"
                          type="text"
                          v-if="!onlyContractAddAuth(userInfo.permission) && scope.row.status === '1'"
                          @click="processPause(scope.row)"
                        >终止</el-button>
                        <el-button
                          size="small"
                          type="text"
                          v-if="!onlyContractAddAuth(userInfo.permission) && scope.row.status === '1'"
                          @click="processDefer(scope.row)"
                        >暂缓</el-button>
                        <el-button
                          size="small"
                          type="text"
                          v-if="!onlyContractAddAuth(userInfo.permission) && (scope.row.status === '3' || scope.row.status === '4')"
                          @click="recovery(scope.row)"
                        >恢复</el-button>
                        <a
                          style="color: #20a0ff;font-size: 12px;padding: 0 7px;"
                          v-if="userInfo.role === 'admin'"
                          target="_blank"
                          :href="downloadUrl(scope.row)"
                        >下载</a>
                        <el-popover
                          placement="top"
                          trigger="click"
                          :ref="`popoverRef_${scope.$index}`">
                          <p>确定要删除吗？</p>
                           <div style="text-align: right; margin: 0;">
                            <el-button size="mini" type="text" @click="hideDelConfirm(scope.$index)">取消</el-button>
                            <el-button type="primary" size="mini" @click="delContract(scope.row)">确定</el-button>
                          </div>
                          <el-button
                            size="small"
                            type="text"
                            slot="reference"
                            :ref="`buttonRef_${scope.$index}`"
                            v-if="userInfo.role === 'admin'"
                          >删除</el-button>
                        </el-popover>
                      </div>
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

        <Modal v-model="batchDelModal" width="360">
          <p slot="header" style="color:#f60;text-align:center">
              <Icon type="ios-information-circle"></Icon>
              <span>删除确认</span>
          </p>
          <div style="text-align:center">
              <p>你确定要删除吗？</p>
          </div>
          <div slot="footer">
              <Button type="error" size="large" long @click="onBatchDelClick">删除</Button>
          </div>
        </Modal>

        <receipt @save-success="handleSuccess" :dialog="receiptDialog"></receipt>
        <assign-table :dialog="assignDialog" @confirm="assignSuccess"  v-if="userInfo.role === 'admin'"></assign-table>
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
import isEmpty from 'lodash/isEmpty';
import max from 'lodash/max'
import findLastIndex from 'lodash/findLastIndex'
import api from '@/api';
import { STEP, MODAL } from '@/constant'
import { mapGetters } from 'vuex'
import Receipt from './receipt.vue'
import { url } from '@/utils/api'

const statusText = {
  1: '处理中',
  2: '已完成',
  3: '已终止',
  4: '暂缓'
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
      MODAL,
      queryAssist: {
        dIds: [],
        doing: 1,
        done: 2
      },
      query: {
        contract_id: '',
        company_name: '',
        commission: '',
        nickname: '',
        pageStart: 1,
        pageSize: 10
      },
      dialog: {
        title: '',
        visible: false,
        detail: false,
        id: '',
        contract_id: '',
        itemContent: {}
      },
      constStep: [],
      receiptDialog: {
        visible: false,
        id: ''
      },
      assignDialog: {
        id: '',
        visible: false
      },
      delConfirm: false,
      batchDelModal: false,
      selRows: []
    };
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  created() {
    this._original_dialog = cloneDeep(this.$data.dialog);
  },
  methods: {
    onlyContractAddAuth(perm) {
      if (perm && perm.length === 1) {
        if (perm[0] === '1') {
          return true;
        }
      }
      return false;
    },
    // 直接完成
    onDirectFinish(row) {
      api.result.finishProcess(row.contract_id).then(result => {
        this.$Message.success('操作成功');
        this.fetchByPage()
      }).catch(error => {
        console.log(error)
        this.$Message.error('操作失败')
      });
    },
    handleSelectionChange (val) {
      this.selRows = val
    },
    clearSelection () {
      this.$refs.mainList.clearSelection()
    },
    // 添加法务项目
    addLegalItem(item) {

    },
    showDetailBtn ($index, index) {
      if (this.userInfo.permission.indexOf('1') > -1) {
        return true
      } else {
        return this.curMaxPerm($index) > index
      }
    },
    downloadBatchAll () {
      return url(`/process/download_all`)
    },
    downloadBatchUrl () {
      if (!isEmpty(this.selRows)) {
        const batch = []
        this.selRows.forEach(item => {
          batch.push({id: item.id, contract_id: item.contract_id})
        })
        let serializeBatch = ''
        try {
          serializeBatch = JSON.stringify(batch)
        } catch (e) {
          console.log(e)
        }
        let elemIF = document.createElement('iframe')
        elemIF.src = url(`/process/download_batch?batch=${serializeBatch}`)
        elemIF.style.display = 'none'
        document.body.appendChild(elemIF)
        elemIF.addEventListener('load', () => {
          console.log('ok')
        })
        // elemIF.onload = () => {
        //   setTimeout(() => {
        //     document.body.removeChild(elemIF)
        //     elemIF = null
        //   }, 500)
        // }
      }
    },
    downloadUrl (row) {
      const { id = '', contract_id = '' } = row
      if (id && contract_id) {
        return url(`/process/download?id=${id}&contract_id=${contract_id}`)
      } else {
        this.$Message.warning('无法下载')
        return 'javascript:;'
      }
    },
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
      this.fetchByPage()
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
      assignDialog.id = JSON.stringify([{id: row.id}])
      this.$router.push({
        query: {
          id: row.id
        }
      })
      assignDialog.visible = true
    },
    recovery (row) {
      const { contract_id } = row
      api.contract.processRecovery(contract_id).then(rs => {
        this.$Message.success('已恢复')
        this.fetchByPage()
      }).catch(error => {
        console.log(error)
        this.$Message.error('操作失败')
      })
    },
    processPause (row) {
      const { contract_id } = row
      api.contract.processPause(contract_id).then(rs => {
        this.$Message.success('已终止')
        this.fetchByPage()
      }).catch(error => {
        console.log(error)
        this.$Message.error('操作失败')
      })
    },
    processDefer (row) {
      const { contract_id } = row
      api.contract.processDefer(contract_id).then(rs => {
        this.$Message.success('已暂缓')
        this.fetchByPage()
      }).catch(error => {
        console.log(error)
        this.$Message.error('操作失败')
      })
    },
    showDialog (item, type, row, index) {
      this.currentModal = item.name
      this.dialog.detail = type === 'detail'
      this.dialog.title = type === 'detail' ? `${item.text}详情` : `${item.text}`
      this.dialog.contract_id = row.contract_id
      this.dialog.id = row.id
      this.dialog.itemContent = row
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

      const pop = `track_${index}`
      this.$refs[pop].$data.showPopper = false
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

    delContract (row) {
      api.contract.remove(row.id).then(results => {
        this.search()
      })
    },

    assignSuccess () {
      this.search();
      this.clearSelection();
    },

    batchDel () {
      this.batchDelModal = true;
    },
    onBatchDelClick () {
      const { selRows } = this;
      if (isEmpty(selRows)) {
        return;
      }
      const params = selRows.map(row => ({id: row.id}));
      api.contract.remove(params).then(rs => {
        this.batchDelModal = false;
        this.$Message.success('删除成功');
        this.search();
      }).catch(e => {
        console.log(e);
        this.batchDelModal = false;
        this.$Message.error('删除失败');
      })
    },

    batchAssignTo () {
      const { assignDialog, selRows } = this
      if (isEmpty(selRows)) {
        return;
      }
      const ids = selRows.map(row => ({ id: row.id }));
      assignDialog.id = JSON.stringify(ids);
      assignDialog.visible = true
    },

    hideDelConfirm (index) {
      const pop = `popoverRef_${index}`
      this.$refs[pop].$data.showPopper = false
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
