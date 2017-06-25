<template lang="html">
    <div class="flow-list-container">
        <Form ref="form" :label-width="135">
            <Row>
                <Col span="6">
                    <Form-item label="合同编号:">
                        <Input placeholder="请输入..." v-model="query.num"></Input>
                    </Form-item>
                </Col>
                <Col span="6">
                    <Form-item label="公司名称:">
                        <Input v-model="query.processNum" @keyup.enter.native="search"></Input>
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
                prop="num"
                label="合同编号"
                width="180">
              </el-table-column>
              <el-table-column
                prop="name"
                label="公司名称">
              </el-table-column>
              <el-table-column
                prop="case"
                label="委托事项">
              </el-table-column>
              <el-table-column
                prop="date"
                label="提交时间"
                width="180">
              </el-table-column>
              <el-table-column v-if="!auth.finance"
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
                                  @click="signingDetail(scope.$index, scope.row)">签单详情</el-button>
                            </div>
                        </el-step>
                        <el-step title="签单确认"></el-step>
                        <el-step title="材料录入">
                            <div class="" slot="description">
                                <el-button
                                  size="small"
                                  @click="meterialDetail(scope.$index, scope.row)">材料详情</el-button>
                            </div>
                        </el-step>
                        <el-step title="材料确认"></el-step>
                        <el-step title="法务提交"></el-step>
                        <el-step title="法务受理">
                            <div class="" slot="description">
                                <el-button
                                  size="small"
                                  @click="meterialDetail(scope.$index, scope.row)">受理详情</el-button>
                            </div>
                        </el-step>
                        <el-step title="完成" description=""></el-step>
                      </el-steps>
                      <div slot="reference" style="display: inline-block;">
                        <el-tag>{{ scope.row.status }}</el-tag>
                      </div>
                    </el-popover>
                  </template>
              </el-table-column>
              <el-table-column label="操作">
                  <template scope="scope">
                    <el-button
                      size="small"
                      @click="signingEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                          size="small"
                          @click="signingConfirm(scope.$index, scope.row)">签单详情确认</el-button>
                        <el-button
                          size="small"
                          @click="materialEdit(scope.$index, scope.row)">材料录入</el-button>
                        <el-button
                         size="small"
                         @click="materialConfirm(scope.$index, scope.row)">材料确认</el-button>
                        <el-button
                          size="small"
                          @click="materialConfirm(scope.$index, scope.row)">法务受理</el-button>
                  </template>
                </el-table-column>
            </el-table>
            <Page
                :total="total"
                :page-size="query.pageSize"
                :current="query.pageNum"
                @on-change="handleCurrentChange"
                @on-page-size-change="handlePageSizeChange"
                show-sizer
                placement="top"
                style="margin-top: 10px;float: right;">
            </Page>
        </Row>
        <Modal v-model="dialog.visible" width="800">
            <p class="" slot="header">
                <span>{{ dialog.title }}</span>
            </p>
            <component :is="currentModal"
                :detail="dialog.detail"
                :confirm="dialog.confirm"
                @cancel="dialog.visible = false"></component>
            <div class="" slot="footer">
            </div>
        </Modal>
    </div>
</template>

<script>
import List from '@/components/list';
import * as Config from './list.config.js';
import mockList from '../../../mock/signing-list.js';
import SigningForm from '@/components/signing/signing-form.vue';
import MaterialForm from '@/components/material/material-form.vue';
import _ from 'lodash';

export default {
    extends: List,
    components: {
        SigningForm,
        MaterialForm
    },
    data() {
        return {
            popVis: false,
            currentModal: 'SigningForm',
            queryAssist: {
                dIds: [],
                doing: 'doing',
                done: 'done'
            },
            query: {
                deptId: '',
                processNum: '',
                processName: '',
                containRisks: '',
                pageNum: 1,
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
        this.tableList = mockList;
        this._original_dialog = _.cloneDeep(this.$data.dialog);
    },
    methods: {
        resetDialog() {
            Object.assign(this.dialog, this._original_dialog);
        },
        showDetail() {
            this.resetDialog();
            this.dialog.detail = true;
            this.dialog.visible = true;
        },
        showConfirm() {
            this.resetDialog();
            this.dialog.detail = true;
            this.dialog.confirm = true;
            this.dialog.visible = true;
        },
        showEdit() {
            this.resetDialog();
            this.dialog.visible = true;
        },
        signingEdit(index, row) {
            this.showEdit();
            this.currentModal = 'SigningForm';
            this.dialog.title = '编辑签单';
        },
        signingDetail(index, row) {
            this.showDetail();
            this.currentModal = 'SigningForm';
            this.dialog.title = '签单详情';
        },
        signingConfirm(index, row) {
            this.showConfirm();
            this.currentModal = 'SigningForm';
            this.dialog.title = '签单确认';
        },
        materialEdit(index, row) {
            this.showEdit();
            this.currentModal = 'MaterialForm';
            this.dialog.title = '材料录入';
        },
        meterialDetail(index, row) {
            this.showDetail();
            this.currentModal = 'MaterialForm';
            this.dialog.title = '材料详情';
        },
        materialConfirm(index, row) {
            this.showConfirm();
            this.currentModal = 'MaterialForm';
            this.dialog.title = '材料确认';
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
