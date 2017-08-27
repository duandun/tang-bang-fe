<template lang="html">
    <div class="">
        <contract-form :detail="true" @data-merged="fetchConfirmData"></contract-form>
        <Form ref="form" :model="formData" :label-width="120" :rules="rules">
            <Row>
              <Col span="12">
                  <Form-item label="到账金额确认无误：" prop="account">
                      <Radio-group v-model="formData.account" v-if="!confirmDetail">
                          <Radio :label="1">是</Radio>
                          <Radio :label="0">否</Radio>
                      </Radio-group>
                      <span v-else>{{formData.account}}</span>
                  </Form-item>
              </Col>
              <Col span="12">
                  <Form-item label="到账时间：" prop="date">
                      <Date-picker v-if="!confirmDetail" placeholder="选择时间和日期..."
                      type="date" v-model="formData.date"></Date-picker>
                      <span v-else>{{formData.date}}</span>
                  </Form-item>
              </Col>
            </Row>
            <Row>
                <Col span="12">
                    <Form-item label="合同信息确认无误：" prop="">
                        <Radio-group v-model="formData.information" >
                            <Radio :label="1" :disabled="confirmDetail">是</Radio>
                            <Radio :label="0" :disabled="confirmDetail">否</Radio>
                        </Radio-group>
                    </Form-item>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <Form-item label="终止：" prop="">
                        <Radio-group v-model="formData.pause">
                            <Radio :label="1" :disabled="confirmDetail">是</Radio>
                            <Radio :label="0" :disabled="confirmDetail">否</Radio>
                        </Radio-group>
                    </Form-item>
                    <Form-item label="终止理由：" prop="" v-if="formData.pause">
                        <Input placeholder="请输入..." v-model="formData.pause_reason" type="textarea" v-if="!confirmDetail"></Input>
                        <span v-else>{{formData.pause_reason}}</span>
                    </Form-item>
                </Col>
            </Row>
            <Row style="text-align: center" v-if="!confirmDetail">
                <Button type="primary" @click="handleSubmit">确认</Button>
                <Button @click="resetFormData">重置</Button>
            </Row>
        </Form>
    </div>
</template>

<script>
import * as Config from './config.js';
import Form from '@/components/form';
import api from '@/api';
import moment from 'moment';
import _ from 'lodash';
import ContractForm from './contract-form/form.vue'

export default {
  extends: Form,
  components: {
    ContractForm
  },
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
  methods: {
    cancel() {
      this.resetFormData();
      this.$emit('cancel');
    },
    resetFormData() {
      this.$refs['form'].resetFields();
    },
    fetchConfirmData (results) {
      if (this.confirmDetail) {
        const { contract_id } = results
        api.contract.confirmDetail(contract_id).then((results) => {
          Object.assign(this.formData, results)
        })
      }
    },
    fetchApi () {
      return Promise.resolve(null)
    },
    saveForm: api.contract.confirm,
    afterSubmit(resp) {
      if (resp.flag) {
        this.$emit('save-success');
      } else {
        this.$Message.error('保存失败');
      }
    },
    formatter (formdata) {
      if (_.isDate(formdata.date)) {
        formdata.date = moment(formdata.date).format('YYYY-MM-DD')
      }
    },
    confirmContract () {
      let {account, date, information, pause, pause_reason, contract_id} = this.formData
      if (_.isDate(date)) {
        date = moment(date).format('YYYY-MM-DD')
      }
      api.contract.confirm({account, date, information, pause, pause_reason, contract_id}).then((results) => {
        if (results) {
          this.$Message.success('保存成功')
          this.$emit('save-success')
        } else {
          this.$Message.error('保存失败')
        }
      })
    }
  }
}
</script>

<style lang="less">
</style>
