<template lang="html">
  <div class="">
      <Form ref="form" :model="formData" :label-width="120" :rules="rules">
          <Row>
              <Col span="12">
                  <Form-item label="合同编号：" prop="contract_id">
                      <Input placeholder="请输入..." v-model="formData.contract_id" v-if="!comDetail"></Input>
                      <span v-else>{{ formData.contract_id }}</span>
                  </Form-item>
              </Col>
              <Col span="12">
                  <Form-item label="公司名称：" prop="company_name">
                      <Input placeholder="请输入..." v-model="formData.company_name" v-if="!comDetail"></Input>
                      <span v-else>{{ formData.company_name }}</span>
                  </Form-item>
              </Col>
          </Row>
          <Row>
              <Col span="12">
                  <Form-item label="委托事项：" prop="commission">
                      <Input placeholder="请输入..." v-model="formData.commission" v-if="!comDetail"></Input>
                      <span v-else>{{formData.commission}}</span>
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
      </Form>
  </div>
</template>

<script>
import Form from '@/components/form'
import * as Config from './config.js'
import api from '@/api'
import _ from 'lodash'
import moment from 'moment'

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
      rules: Config.getRules(this)
    }
  },
  computed: {
    comDetail () {
      return this.dialog.detail || this.detail
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
    },
    formatter(formdata) {
      if (_.isDate(formdata.remittance_time)) {
        formdata.remittance_time = moment(formdata.remittance_time).format('YYYY-MM-DD hh:mm:ss');
      }
      if (_.isDate(formdata.deadline)) {
        formdata.deadline = moment(formdata.deadline).format('YYYY-MM-DD');
      }
      if (!formdata.id) {
        delete formdata.id
      }
      delete formdata.nickname
    },
    willDataMerge (results) {
      // if (this.detail) {
      //   results.remittance_time = moment(results.remittance_time).format('YYYY-MM-DD hh:mm:ss')
      //   results.deadline = moment(results.deadline).format('YYYY-MM-DD')
      // } else {
      //   results.remittance_time = moment(results.remittance_time).toDate();
      //   results.deadline = moment(results.deadline).toDate();
      // }
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

<style lang="less">
</style>
