<template lang="html">
    <div class="">
        <contract-form :dialog="dialog" :detail="true" @data-merged="fetchConfirmData"></contract-form>
        <Form ref="form" :model="formData" :label-width="120" :rules="rules">
            <Row>
              <!-- <Col span="12">
                  <Form-item label="到账金额确认无误：" prop="account">
                      <Radio-group v-model="formData.account">
                          <Radio label="1" :disabled="comDetail">是</Radio>
                          <Radio label="0" :disabled="comDetail">否</Radio>
                      </Radio-group>
                  </Form-item>
              </Col> -->
              <Col span="12">
                  <Form-item label="到账时间：" prop="date">
                      <Date-picker v-if="!comDetail" placeholder="选择时间和日期..."
                      type="date" v-model="formData.date"></Date-picker>
                      <span v-else>{{formData.date}}</span>
                  </Form-item>
              </Col>
            </Row>
            <!-- <Row>
                <Col span="12">
                    <Form-item label="合同信息确认无误：" prop="">
                        <Radio-group v-model="formData.information" >
                            <Radio label="1" :disabled="comDetail">是</Radio>
                            <Radio label="0" :disabled="comDetail">否</Radio>
                        </Radio-group>
                    </Form-item>
                </Col>
            </Row> -->
            <Row v-if="comDetail && formData.receipt">
              <Col span="12">
                <Form-item label="票据：" prop="receipt">
                    <Radio-group v-model="formData.receipt" >
                        <Radio :label="1" :disabled="comDetail">普通发票</Radio>
                        <Radio :label="2" :disabled="comDetail">专用发票</Radio>
                        <Radio :label="3" :disabled="comDetail">收据</Radio>
                    </Radio-group>
                </Form-item>
              </Col>
              <Col span="12">
                <Form-item label="开据时间：" prop="time">
                    <!-- <Date-picker placeholder="选择时间和日期..." type="datetime" v-model="formData.time" v-if="!comDetail"></Date-picker> -->
                    <span>{{formData.time}}</span>
                </Form-item>
              </Col>
            </Row>
            <Row v-if="computedPause">
                <Col span="12">
                    <Form-item label="终止：" prop="">
                        <Radio-group v-model="formData.pause">
                            <Radio label="1" :disabled="comDetail">是</Radio>
                            <Radio label="0" :disabled="comDetail">否</Radio>
                        </Radio-group>
                    </Form-item>
                    <Form-item label="终止理由：" prop="" v-if="formData.pause === '1'">
                        <Input placeholder="请输入..." v-model="formData.pause_reason" type="textarea" v-if="!comDetail"></Input>
                        <span v-else>{{formData.pause_reason}}</span>
                    </Form-item>
                </Col>
            </Row>
            <Row>
              <Form-item label="操作人:" v-if="comDetail">
                <span>{{formData.nickname}}</span>
              </Form-item>
            </Row>
            <Row style="text-align: center" v-if="!comDetail">
                <Button type="primary" @click="handleSubmit" :loading="isSaving">确认</Button>
                <Button @click="resetFormData">重置</Button>
            </Row>
            <Row v-if="comDetail">
              <Button v-if="userInfo.role === 'admin' && !editable" type="primary" @click="editable = true">修改</Button>
            </Row>
        </Form>
    </div>
</template>

<script>
import * as Config from './config.js';
import Form from '@/components/form';
import api from '@/api';
import moment from 'moment';
import isDate from 'lodash/isDate';
import ContractForm from './contract-form/form.vue'
import {mapGetters} from 'vuex'

export default {
  extends: Form,
  components: {
    ContractForm
  },
  props: {
    dialog: Object
  },
  data() {
    return {
      formData: Config.getFormData(),
      rules: Config.getRules(this),
      editable: false
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
    computedPause () {
      if (!this.editable) {
        return true
      } else if (this.userInfo.role === 'admin') {
        return true
      }
      return false
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
      const { contract_id } = results
      api.contract.confirmDetail(contract_id).then((results) => {
        Object.assign(this.formData, results)
      })
      this.formData.contract_id = results.contract_id
      this.formData.id = results.id
      // if (this.confirm) {
      //   this.formData.contract_id = results.contract_id
      //   this.formData.id = results.id
      // }
    },
    fetchApi () {
      return Promise.resolve(null)
    },
    saveForm: api.contract.confirm,
    afterSubmit(resp) {
      if (resp.flag) {
        this.$emit('save-success');
      } else {
        this.$Message.error('保存失败')
      }
    },
    formatter (formdata) {
      if (isDate(formdata.date)) {
        formdata.date = moment(formdata.date).format('YYYY-MM-DD')
      }
      if (isDate(formdata.piaojuTime)) {
        formdata.piaojuTime = moment(formdata.piaojuTime).format('YYYY-MM-DD hh:mm:ss')
      }
    },
    confirmContract () {
      let {account, date, information, pause, pause_reason, contract_id, piaoju, piaojuTime} = this.formData
      if (isDate(date)) {
        date = moment(date).format('YYYY-MM-DD')
      }
      if (isDate(piaojuTime)) {
        piaojuTime = moment(piaojuTime).format('YYYY-MM-DD hh:mm:ss')
      }
      api.contract.confirm({account, date, information, pause, pause_reason, contract_id, piaoju, piaojuTime}).then((results) => {
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
