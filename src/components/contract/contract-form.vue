<template lang="html">
    <div class="">
        <Form ref="form" :model="formData" :label-width="120" :rules="rules">
            <Row>
                <Col span="12">
                    <Form-item label="合同编号：" prop="contract_id">
                        <Input placeholder="请输入..." v-model="formData.contract_id" v-if="!detail"></Input>
                        <span v-else>{{ formData.contract_id }}</span>
                    </Form-item>
                </Col>
                <Col span="12">
                    <Form-item label="公司名称：" prop="company_name">
                        <Input placeholder="请输入..." v-model="formData.company_name" v-if="!detail"></Input>
                        <span v-else>{{ formData.company_name }}</span>
                    </Form-item>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <Form-item label="委托事项：" prop="commission">
                        <Input placeholder="请输入..." v-model="formData.commission" v-if="!detail"></Input>
                        <span v-else>{{formData.commission}}</span>
                    </Form-item>
                </Col>
                <Col span="12">
                    <Form-item label="委托事项数量：" prop="commission_number">
                        <Input-number :min="0" placeholder="请输入..." v-model="formData.commission_number" v-if="!detail"></Input-number>
                        <span v-else>{{formData.commission_number}}</span>
                    </Form-item>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <Form-item label="汇款方式：" prop="remittance">
                        <Input placeholder="请输入..." v-model="formData.remittance" v-if="!detail"></Input>
                        <span v-else>{{formData.remittance}}</span>
                    </Form-item>
                </Col>
                <Col span="12">
                    <Form-item label="汇款时间：" prop="remittance_time">
                        <Date-picker v-if="!detail" placeholder="选择时间和日期..."
                        format="yyyy-MM-dd HH:mm:ss"
                        type="datetime" v-model="formData.remittance_time"></Date-picker>
                        <span v-else>{{formData.remittance_time}}</span>
                    </Form-item>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <Form-item label="委托事项申请人：" prop="commissioned_applicant">
                        <Input placeholder="请输入..." v-model="formData.commissioned_applicant" v-if="!detail"></Input>
                        <span v-else>{{formData.commissioned_applicant}}</span>
                    </Form-item>
                </Col>
                <Col span="12">
                    <Form-item label="案件截止日期：" prop="deadline">
                        <Date-picker v-if="!detail" placeholder="选择日期..."
                          format="yyyy-MM-dd"
                         type="date" v-model="formData.deadline"></Date-picker>
                        <span v-else>{{formData.deadline}}</span>
                    </Form-item>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <Form-item label="注意事项：" prop="precautions">
                        <Input placeholder="请输入..." v-model="formData.precautions" v-if="!detail"></Input>
                        <span v-else>{{formData.precautions}}</span>
                    </Form-item>
                </Col>
                <Col span="12">
                </Col>
            </Row>
            <Row style="text-align: center; margin-top: 10px;" v-if="!detail">
                <Button type="primary" @click.stop="handleSubmit" :loading="isSaving">提交</Button>
                <Button @click="cancel">取消</Button>
            </Row>
            <span class="" v-if="confirm">
                <Row>
                    <Col span="12">
                        <Form-item label="到账金额确认无误：" prop="">
                            <Radio-group v-model="formData.account" v-if="!confirmDetail">
                                <Radio :label="1">是</Radio>
                                <Radio :label="0">否</Radio>
                            </Radio-group>
                            <span v-else>XXXXXX</span>
                        </Form-item>
                    </Col>
                    <Col span="12">
                        <Form-item label="到账时间：" prop="">
                            <Date-picker v-if="!confirmDetail" placeholder="选择时间和日期..."
                            type="date" v-model="formData.date"></Date-picker>
                            <span v-else>XXXXXX</span>
                        </Form-item>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <Form-item label="合同信息确认无误：" prop="">
                            <Radio-group v-model="formData.information" v-if="!confirmDetail">
                                <Radio :label="1">是</Radio>
                                <Radio :label="0">否</Radio>
                            </Radio-group>
                            <span v-else>XXXXX</span>
                        </Form-item>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <Form-item label="终止：" prop="">
                            <Radio-group v-model="formData.pause">
                                <Radio :label="1">是</Radio>
                                <Radio :label="0">否</Radio>
                            </Radio-group>
                        </Form-item>
                        <Form-item label="终止理由：" prop="" v-if="formData.pause">
                            <Input placeholder="请输入..." v-model="formData.pause_reason" type="textarea"></Input>
                        </Form-item>
                    </Col>
                </Row>
                <Row style="text-align: center" v-if="!confirmDetail">
                    <Button type="primary" @click="confirmContract">确认</Button>
                    <Button @click="cancel">取消</Button>
                </Row>
            </span>
        </Form>
    </div>
</template>

<script>
import * as Config from './contract.config.js';
import Form from '@/components/form';
import * as api from '@/api';
import moment from 'moment';

export default {
  extends: Form,
  props: {
    detail: {
      type: Boolean,
      default: false
    },
    confirm: {
      type: Boolean,
      default: false
    },
    confirmDetail: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formData: Config.getFormData(),
      rules: Config.getRules(this)
    }
  },
  created() {
  },
  methods: {
    cancel() {
      this.resetFormData();
      this.$emit('cancel');
    },
    resetFormData() {
      this.$refs['form'].resetFields();
    },
    formatter(formdata) {
      if (Object.prototype.toString.call(formdata.remittance_time) === '[object Date]') {
        formdata.remittance_time = moment(formdata.remittance_time).format('YYYY-MM-DD hh:mm:ss');
      }
      if (Object.prototype.toString.call(formdata.deadline) === '[object Date]') {
        formdata.deadline = moment(formdata.deadline).format('YYYY-MM-DD');
      }
    },
    willFormValidate() {
      this.formData.remittance_time = moment(this.formData.remittance_time).toDate();
      this.formData.deadline = moment(this.formData.deadline).toDate();
      return Promise.resolve(null);
    },
    afterSubmit(resp) {
      if (resp.flag) {
        this.$emit('save-success');
      } else {
        this.$Message.error('保存失败');
      }
    },
    fetchApi: api.contract.detail,
    saveForm: api.contract.save,
    afterDataMerge(results) {
      if (this.confirm) {
        const {contract_id} = results
        api.contract.confirmDetail(contract_id).then((results) => {
          console.log(results)
          Object.assign(this.formData, results)
        })
      }
    },
    confirmContract () {
      const {account, date, information, pause, pause_reason} = this.formData
      api.contract.confirm({account, date, information, pause, pause_reason}).then((results) => {
        console.log(results)
      })
    }
  }
}
</script>

<style lang="less">
</style>
