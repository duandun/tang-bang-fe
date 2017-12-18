<template lang="html">
  <div class="">
      <Form ref="form" :model="formData" :label-width="120" :rules="rules">
          <Row>
              <Col span="12">
                  <Form-item label="合同编号：" prop="contract_id">
                      <Input placeholder="请输入..." v-model="formData.contract_id" v-if="!comDetail" :disabled="$route.name !== 'contractAdd'"></Input>
                      <span v-else>{{ formData.contract_id }}</span>
                  </Form-item>
              </Col>
              <Col span="12">
                  <Form-item label="甲方名称：" prop="company_name">
                      <Input placeholder="请输入..." v-model="formData.company_name" v-if="!comDetail"></Input>
                      <span v-else>{{ formData.company_name }}</span>
                  </Form-item>
              </Col>
          </Row>
          <Row>
              <Col span="12">
                  <Form-item label="委托事项：" prop="commission">
                      <Row v-if="!comDetail">
                        <Col span="11">
                          <Select v-model="commissionCate">
                            <Option label="商标委托事项" value="商标委托事项"></Option>
                            <Option label="专利委托事项" value="专利委托事项"></Option>
                            <Option label="著作委托事项" value="著作委托事项"></Option>
                            <Option label="其他" value="其他"></Option>
                          </Select>
                        </Col>
                        <Col span="12" style="margin-left: 5px;">
                          <Select v-model="commissionDetail" v-if="commissionCate !== '其他'">
                            <Option v-for="(item, index) in commissionList" :label="item" :key="index" :value="item"></Option>
                          </Select>
                          <Input v-model="commissionDetail" v-else placeholder="请输入..."></Input>
                        </Col>
                      </Row>
                      <span v-else>{{formData.commission}}</span>
                      <Input v-model="formData.commission" style="display: none;"></Input>
                  </Form-item>
              </Col>
              <Col span="12">
                  <Form-item label="委托事项数量：" prop="commission_number">
                      <Input placeholder="请输入..." v-model.number="formData.commission_number" v-if="!comDetail"></Input>
                      <span v-else>{{formData.commission_number}}</span>
                  </Form-item>
              </Col>
          </Row>
          <Row>
              <Col span="12">
                  <Form-item label="汇款方式：" prop="remittance">
                      <Input placeholder="请输入..." v-model="formData.remittance" v-if="!comDetail"></Input>
                      <span v-else>{{formData.remittance}}</span>
                  </Form-item>
              </Col>
              <Col span="12">
                  <Form-item label="汇款时间：" prop="remittance_time">
                      <Date-picker v-if="!comDetail" placeholder="选择时间和日期..."
                      format="yyyy-MM-dd HH:mm:ss"
                      type="datetime" v-model="formData.remittance_time"></Date-picker>
                      <span v-else>{{formData.remittance_time}}</span>
                  </Form-item>
              </Col>
          </Row>
          <Row>
              <Col span="12">
                  <Form-item label="委托事项申请人：" prop="commissioned_applicant">
                      <Input placeholder="请输入..." v-model="formData.commissioned_applicant" v-if="!comDetail"></Input>
                      <span v-else>{{formData.commissioned_applicant}}</span>
                  </Form-item>
              </Col>
              <Col span="12">
                  <Form-item label="案件截止日期：" prop="deadline">
                      <Date-picker v-if="!comDetail" placeholder="选择日期..."
                        format="yyyy-MM-dd"
                       type="date" v-model="formData.deadline"></Date-picker>
                      <span v-else>{{formData.deadline}}</span>
                  </Form-item>
              </Col>
          </Row>
          <Row>
              <Col span="12">
                  <Form-item label="注意事项：" prop="precautions">
                      <Input placeholder="请输入..." v-model="formData.precautions" v-if="!comDetail"></Input>
                      <span v-else>{{formData.precautions}}</span>
                  </Form-item>
              </Col>
              <Col span="12">
              </Col>
          </Row>
          <Row v-if="comDetail">
              <Col span="12">
                  <Form-item label="签单员：">
                      <span>{{formData.nickname}}</span>
                  </Form-item>
              </Col>
              <Col span="12">
              </Col>
          </Row>
          <Row style="text-align: center; margin-top: 10px;" v-if="!comDetail">
              <Button type="primary" @click.stop="handleSubmit" :loading="isSaving">提交</Button>
              <Button @click="resetFormData">重置</Button>
          </Row>
          <Row v-if="!detail && $route.name !== 'contractAdd'">
              <Button v-if="showEditBtn" type="primary" @click="editable = true">修改</Button>
          </Row>
      </Form>
  </div>
</template>

<script>
import Form from '@/components/form'
import * as Config from './config.js'
import api from '@/api'
import isDate from 'lodash/isDate'
import moment from 'moment'
import {mapGetters} from 'vuex'
import { COMMISSION } from '@/constant'

export default {
  extends: Form,
  props: {
    dialog: {
      type: Object
    },
    detail: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      formData: Config.getFormData(),
      editable: false,
      rules: Config.getRules(this),
      commissionCate: '',
      commissionDetail: '',
      commissionList: COMMISSION.brand
    }
  },
  computed: {
    ...mapGetters([
        'userInfo'
    ]),
    comDetail () {
        if (this.editable) {
            return false
        }
        return this.dialog.detail || this.detail
    },
    showEditBtn () {
      if (this.userInfo.role === 'admin' && !this.editable) {
        return true
      }
      if (this.userInfo.permission.indexOf('1') > -1 && !this.editable) {
        const {itemContent} = this.dialog
        console.log(1112, itemContent)
        if (itemContent.contract_submit_status === '1' && itemContent.contract_confirm_status === '0') {
          return true
        }
      }
      return false
    }
  },
  watch: {
    commissionDetail (val, oldVal) {
      if (!val) {
        this.formData.commission = ''
        return
      }
      this.formData.commission = this.commissionCate + ',' + val
    },
    commissionCate (val, oldVal) {
      switch (val) {
        case '商标委托事项':
          this.commissionList = COMMISSION.brand
          break
        case '专利委托事项':
          this.commissionList = COMMISSION.patent
          break
        case '著作委托事项':
          this.commissionList = COMMISSION.copyright
          break
        default:
          this.commissionList = []
          break
      }
    }
  },
  methods: {
    fetchApi: api.contract.detail,
    saveForm: api.contract.save,
    cancel() {
      this.resetFormData();
      this.$emit('cancel');
    },
    resetFormData() {
      this.$refs['form'].resetFields();
      this.commissionDetail = ''
    },
    formatter(formdata) {
      if (isDate(formdata.remittance_time)) {
        formdata.remittance_time = moment(formdata.remittance_time).format('YYYY-MM-DD hh:mm:ss');
      }
      if (isDate(formdata.deadline)) {
        formdata.deadline = moment(formdata.deadline).format('YYYY-MM-DD');
      }
      if (!formdata.id) {
        delete formdata.id
      }
      delete formdata.nickname
    },
    willDataMerge (results) {
      const { commission } = results
      const comArr = commission.split(',')
      // 兼容旧数据
      if (comArr.length !== 2) {
        Object.keys(COMMISSION).forEach(key => {
          if (COMMISSION[key].findIndex(i => i === commission) > -1) {
            switch (key) {
              case 'brand':
                this.commissionCate = '商标委托事项'
                break
              case 'patent':
                this.commissionCate = '专利委托事项'
                break
              case 'copyright':
                this.commissionCate = '著作委托事项'
                break
            }
          }
        })
        if (!this.commissionCate) {
          this.commissionCate = '其他'
        }
        this.commissionDetail = commission
        return
      }

      this.commissionCate = comArr[0]
      this.commissionDetail = comArr[1]
    },
    afterDataMerge (results) {
      console.log(results)
      this.$emit('data-merged', results)
    },
    afterSubmit(resp) {
      if (resp.flag) {
        this.$emit('save-success');
      } else {
        this.$Message.error('保存失败');
      }
    }
  }
}
</script>
