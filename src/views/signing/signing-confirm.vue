<template lang="html">
    <div class="">
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
              <el-table-column
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
                        @click="handleEdit(scope.$index, scope.row)">确认</el-button>
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

        <Modal v-model="dialog.visible" width="800"
            title="签单确认">
            <Row>
                <signing-add :hiddenBtns="true"></signing-add>
            </Row>
            <Row type="flex" justify="center">
                <Col span="12">
                    <Form ref="form" :model="formData" :label-width="100">
                        <Form-item label="是否到账" prop="">
                            <Radio-group v-model="formData.submitType">
                                <Radio label="是"></Radio>
                                <Radio label="否"></Radio>
                            </Radio-group>
                        </Form-item>
                    </Form>
                </Col>
            </Row>
        </Modal>
    </div>
</template>

<script>
import List from '@/components/list';
import * as Config from './list.config.js';
import mockList from '../../../mock/signing-list.js';
import SigningAdd from './signing-add.vue';

export default {
    extends: List,
    components: {
        SigningAdd
    },
    data() {
        return {
            toAccount: '是',
            queryAssist: {
                doing: 'doing',
                done: 'done'
            },
            query: {
                pageNum: 1,
                pageSize: 10
            },
            dialog: {
                visible: false
            },
            auth: {
                finance: false
            },
            formData: {
                submitType: '邮寄'
            },
            tableColumns: Config.getTableColumns(this)
        }
    },
    created() {
        this.tableList = mockList;
    },
    methods: {
        handleEdit(index, row) {
            this.dialog.visible = true;
        }
    }
}
</script>

<style lang="css">
</style>
