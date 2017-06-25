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
                    <el-popover trigger="click" placement="top-end">
                        <el-steps :space="120" :active="1">
                        <el-step title="提交" description="这是一段很长很长很长的描述性文字"></el-step>
                        <el-step title="财务确认" description="这是一段很长很长很长的描述性文字这是一段很长很长很长的描述性文字这是一段很长很长很长的描述性文字这是一段很长很长很长的描述性文字"></el-step>
                        <el-step title="法务提交" description="这是一段很长很长很长的描述性文字"></el-step>
                        <el-step title="法务受理" description="这是一段很长很长很长的描述性文字"></el-step>
                        <el-step title="完成" description=""></el-step>
                      </el-steps>
                      <div slot="reference" class="name-wrapper" style="display: inline-block;">
                        <el-tag>{{ scope.row.status }}</el-tag>
                      </div>
                    </el-popover>
                  </template>
              </el-table-column>
              <el-table-column label="操作" width="240">
                  <template scope="scope">
                    <el-button
                      size="small"
                      type="text"
                      @click="handleEdit(scope.$index, scope.row)">签单详情</el-button>
                  <el-button
                    size="small"
                    type="text"
                    @click="handleEdit(scope.$index, scope.row)">材料详情</el-button>
                <el-button
                  size="small"
                  @click="handleItems(scope.$index, scope.row)">受理</el-button>
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
            <signing-add :hiddenBtns="true"></signing-add>
            <p slot="footer"></p>
        </Modal>
        <Modal v-model="dialog.handleVisible" width="800" title="法务受理">
            <Row type="flex" justify="center">
                <Col span="12">
                    <Form ref="form" :model="formData" :label-width="100">
                        <Form-item label="通知书下发：" prop="">
                            <Checkbox v-model="formData.noticeDeliver"></Checkbox>
                        </Form-item>
                        <Form-item label="标记：" prop="">
                            <Radio-group v-model="formData.flag">
                                <Radio label="不可提交"></Radio>
                                <Radio label="重新提交"></Radio>
                                <Radio label="变更提交"></Radio>
                            </Radio-group>
                        </Form-item>
                        <Form-item label="不可受理：" prop="">
                            <Radio-group v-model="formData.flag">
                                <Radio label="不可提交"></Radio>
                                <Radio label="重新提交"></Radio>
                                <Radio label="变更提交"></Radio>
                            </Radio-group>
                        </Form-item>
                        <Form-item label="提交时间：" prop="">
                            <Input placeholder="请输入..." v-model="formData.acceptTime"></Input>
                        </Form-item>
                    </Form>
                </Col>
            </Row>
        </Modal>
    </div>
</template>

<script>
import _ from 'lodash';
import List from '@/components/list';
import * as Config from './list.config.js';
import mockList from '../../../mock/signing-list.js';
import SigningAdd from '@/views/signing/signing-add.vue';

export default {
    extends: List,
    components: {
        SigningAdd
    },
    data() {
        return {
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
                visible: false,
                handleVisible: false
            },
            auth: {
                finance: false
            },
            formData: {
                flag: '不可提交'
            },
            tableColumns: Config.getTableColumns(this)
        };
    },
    computed: {
    },
    watch: {
        'queryAssist.dIds': function(val) {
            this.query.deptId = _.last(this.queryAssist.dIds);
        }
    },
    created() {
        this.tableList = mockList;
        if (location.href.split('?').length > 1) {
            if (location.href.split('?')[1].split('=')[1] === 'finance') {
                this.auth.finance = true;
            }
        }
    },
    methods: {
        handleItems(index, row) {
            this.dialog.handleVisible = true;
        },
        handleEdit(index, row) {
            this.dialog.visible = true;
        },
        clickDel(item) {
            console.log('dfdsees');
        },
        prepare() {
            return Promise.resolve(this.topDepartmentList);
        },

        formatData(resList) {
            return resList;
        },
        jumpToDetail(row) {
            this.$router.push({
                name: 'flowDetail',
                params: {
                    parentId: row.processGradeIds.split(',')[0],
                    id: row.id
                },
                query: {
                    level: row.processLevel,
                    editable: false,
                    tab: 'editTab'
                }
            });
        },
        jumpToEdit(row) {
            this.$router.push({
                name: 'flowEdit',
                params: {
                    parentId: row.processGradeIds.split(',')[0],
                    id: row.id
                },
                query: {
                    editable: true,
                    tab: 'editTab'
                }
            });
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
