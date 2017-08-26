<template lang="html">
    <div class="list-container">
        <Form ref="form" :label-width="135">
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
                            <Option label="全部" value="all">
                            </Option>
                            <Option label="处理中" :value="queryAssist.doing">
                            </Option>
                            <Option label="已完成" :value="queryAssist.done">
                            </Option>
                        </Select>
                    </Form-item>
                </Col>
                <Col span="4" offset="1">
                    <Button type="primary" icon="search" @click="search">搜索</Button>
                    <Button icon="trash-b" @click="clearQuery">重置</Button>
                </Col>
            </Row>
        </Form>
        <Row>
            <!-- <Spin fix style="border: 1px solid #ddd;top: 40%;width: 150px;height: 60px;margin: 0 auto;" v-if="loading">
                <Icon type="load-c" size="18" class="demo-spin-icon-load"></Icon>
                <div>Loading</div>
            </Spin> -->
            <el-table
              :data="tableList"
              style="width: 100%">
              <el-table-column
                type="index"
                width="60">
              </el-table-column>
              <el-table-column
                prop="contract_id"
                label="合同编号"
                width="180">
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
                prop="status"
                label="进度">
                <template scope="scope">
                    <el-popover trigger="click"
                    placement="top-end">
                        <el-steps :space="120" :active="1">
                        <el-step title="签单录入">
                            <div class="" slot="description">
                                <el-button
                                  size="small"
                                  @click="contractDetail(scope.$index, scope.row)">签单详情</el-button>
                            </div>
                        </el-step>
                        <el-step title="签单确认">
                            <div class="" slot="description">
                                <el-button
                                  size="small"
                                  @click="contractConfirm(scope.$index, scope.row)">签单确认详情</el-button>
                            </div>
                        </el-step>
                        <el-step title="材料录入">
                            <div class="" slot="description">
                                <el-button
                                  size="small"
                                  @click="meterialDetail(scope.$index, scope.row)">材料详情</el-button>
                            </div>
                        </el-step>
                        <el-step title="材料确认">
                            <div class="" slot="description">
                                <el-button
                                  size="small"
                                  @click="materialConfirm(scope.$index, scope.row)">材料确认详情</el-button>
                            </div>
                        </el-step>
                        <el-step title="法务提交">
                            <div class="" slot="description">
                                <el-button
                                  size="small"
                                  @click="legalSubmitDetail(scope.$index, scope.row)">法务提交详情</el-button>
                            </div>
                        </el-step>
                        <el-step title="法务受理">
                            <div class="" slot="description">
                                <el-button
                                  size="small"
                                  @click="legalHandleDetail(scope.$index, scope.row)">受理详情</el-button>
                            </div>
                        </el-step>
                        <el-step title="二次材料提交">
                            <div class="" slot="description">
                                <el-button
                                  size="small"
                                  @click="legalHandleDetail(scope.$index, scope.row)">二次材料提交详情</el-button>
                            </div>
                        </el-step>
                        <el-step title="完成">
                            <div class="" slot="description">
                                <el-button
                                  size="small"
                                  @click="legalHandleDetail(scope.$index, scope.row)">结果详情</el-button>
                            </div>
                        </el-step>
                      </el-steps>
                      <div slot="reference" style="display: inline-block;">
                        <el-tag>{{ scope.row.status }}</el-tag>
                      </div>
                    </el-popover>
                  </template>
              </el-table-column>
              <el-table-column label="操作" width="350">
                  <template scope="scope">
                    <el-button
                      size="small"
                      type="text"
                      @click="contractEdit(scope.$index, scope.row)">签单编辑</el-button>
                        <el-button
                          size="small"
                           type="text"
                          @click="contractConfirm(scope.$index, scope.row)">签单确认</el-button>
                        <el-button
                          size="small"
                           type="text"
                          @click="materialEdit(scope.$index, scope.row)">材料录入</el-button>
                        <el-button
                         size="small"
                          type="text"
                         @click="materialConfirm(scope.$index, scope.row)">材料确认</el-button>
                         <el-button
                          size="small"
                           type="text"
                          @click="legalSubmit(scope.$index, scope.row)">法务提交</el-button>
                        <el-button
                          size="small"
                           type="text"
                          @click="legalHandle(scope.$index, scope.row)">法务受理</el-button>
                      <el-button
                        size="small"
                         type="text"
                        @click="materialSubAgain(scope.$index, scope.row)">二次提交材料</el-button>
                        <el-button
                          size="small"
                           type="text"
                          @click="finalResults(scope.$index, scope.row)">填写结果</el-button>
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
                style="margin-top: 10px;float: right;">
            </Page>
        </Row>
        <Modal v-model="dialog.visible" width="800">
            <p slot="header">
                <span>{{ dialog.title }}</span>
            </p>
            <component :is="currentModal"
                v-if="dialog.visible"
                :detail="dialog.detail"
                :confirm="dialog.confirm"
                @cancel="dialog.visible = false"
                @save-success="dialog.visible = false"></component>
            <div class="" slot="footer">
            </div>
        </Modal>
    </div>
</template>

<script>
import List from '@/components/list';
import * as Config from './list.config.js';
import ContractForm from '@/components/contract/contract-form/form.vue';
import ContractConfirm from '@/components/contract/contract-confirm.vue';
import MaterialForm from '@/components/material/material-form/form.vue';
import MaterialConfirm from '@/components/material/material-confirm.vue';
import LegalAcceptForm from '@/components/legal/legal-accept-form.vue';
import LegalSubmitForm from '@/components/legal/legal-submit-form.vue';
import MaterialSubAgainForm from '@/components/material/material-subagain-form.vue';
import FinalResultsForm from '@/components/final-results/final-results-form.vue';
import _ from 'lodash';
import api from '@/api';

const statusText = {
  0: '驳回',
  1: '已完成',
  2: '进行中'
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
    FinalResultsForm
  },
  data() {
    return {
      popVis: false,
      currentModal: '',
      queryAssist: {
        dIds: [],
        doing: 'doing',
        done: 'done'
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
        confirm: false,
        detail: false
      },
      auth: {
        finance: false
      },
      tableColumns: Config.getTableColumns(this)
    };
  },
  computed: {
  },
  watch: {
  },
  created() {
    this._original_dialog = _.cloneDeep(this.$data.dialog);
  },
  methods: {
    fetchApi: api.contract.list,

    formatData(results) {
      results.forEach(item => {
        item.status = statusText[item.status]
      });
      return results;
    },

    resetDialog() {
      Object.assign(this.dialog, this._original_dialog);
    },
    showDetail(id) {
      this.resetDialog();
      this.dialog.detail = true;
      this.dialog.visible = true;
      this.$router.push({
        query: { id }
      });
    },
    showConfirm(id) {
      this.resetDialog();
      this.dialog.detail = true;
      this.dialog.confirm = true;
      this.dialog.visible = true;
      this.$router.push({
        query: { id }
      });
    },
    showEdit(id) {
      this.resetDialog();
      this.dialog.detail = false;
      this.dialog.visible = true;
      this.$router.push({
        query: { id }
      });
    },
    contractEdit(index, row) {
      this.showEdit(row.id);
      this.currentModal = 'ContractForm';
      this.dialog.title = '编辑签单';
    },
    contractDetail(index, row) {
      this.showDetail(row.id);
      this.currentModal = 'ContractForm';
      this.dialog.title = '签单详情';
    },
    contractConfirm(index, row) {
      this.showConfirm(row.id);
      this.currentModal = 'ContractConfirm';
      this.dialog.title = '签单确认';
    },
    materialEdit(index, row) {
      this.showEdit(row.id);
      this.currentModal = 'MaterialForm';
      this.dialog.title = '材料录入';
    },
    meterialDetail(index, row) {
      this.showDetail(row.id);
      this.currentModal = 'MaterialForm';
      this.dialog.title = '材料详情';
    },
    materialConfirm(index, row) {
      this.showConfirm(row.id);
      this.currentModal = 'MaterialForm';
      this.dialog.title = '材料确认';
    },
    legalSubmit(index, row) {
      this.showEdit(row.id);
      this.currentModal = 'LegalSubmitForm';
      this.dialog.title = '法务提交';
    },
    legalSubmitDetail(index, row) {
      this.showDetail(row.id);
      this.currentModal = 'LegalSubmitForm';
      this.dialog.title = '法务提交详情';
    },
    legalHandle(index, row) {
      this.showEdit(row.id);
      this.currentModal = 'LegalAcceptForm';
      this.dialog.title = '法务受理';
    },
    legalHandleDetail(index, row) {
      this.showDetail(row.id);
      this.currentModal = 'LegalAcceptForm';
      this.dialog.title = '法务受理详情';
    },
    materialSubAgain(index, row) {

    },
    finalResults(index, row) {

    },
    clickDel(item) {
      console.log('dfdsees');
    },
    prepare() {
      return Promise.resolve(this.topDepartmentList);
    }
  }
};
</script>

<style lang="less">
    .demo-spin-icon-load{
            animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
</style>
