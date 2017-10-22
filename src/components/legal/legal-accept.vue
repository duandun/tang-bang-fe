<template lang="html">
    <div class="">
      <legal-form :detail="true" @data-merged="fetchConfirmData" :dialog="dialog"></legal-form>
      <span class="line"></span>
        <Form ref="form" :model="formData" :label-width="100" :rules="rules">
            <Row type="flex" justify="center">
                <Col span="12">
                    <Form-item label="通知书下发：" prop="notice">
                        <Checkbox v-model="formData.notice" :disabled="dialog.detail"></Checkbox>
                    </Form-item>
                    <Form-item label="标记：" prop="sign">
                        <Radio-group v-model="formData.sign">
                            <Radio label="不可提交" :disabled="dialog.detail"></Radio>
                            <Radio label="重新提交" :disabled="dialog.detail"></Radio>
                            <Radio label="变更提交" :disabled="dialog.detail"></Radio>
                        </Radio-group>
                    </Form-item>
                    <Form-item label="不可受理：" prop="accept">
                        <Radio-group v-model="formData.accept">
                            <Radio label="不可提交" :disabled="dialog.detail"></Radio>
                            <Radio label="重新提交" :disabled="dialog.detail"></Radio>
                            <Radio label="变更提交" :disabled="dialog.detail"></Radio>
                        </Radio-group>
                    </Form-item>
                    <Form-item label="提交时间：" prop="time">
                        <Date-picker placeholder="选择时间和日期..." type="datetime" v-model="formData.time" v-if="!dialog.detail"></Date-picker>
                        <span v-else>{{formData.time}}</span>
                    </Form-item>
                    <Form-item label="终止：" prop="pause">
                        <Radio-group v-model="formData.pause">
                            <Radio label="1" :disabled="dialog.detail">是</Radio>
                            <Radio label="0" :disabled="dialog.detail">否</Radio>
                        </Radio-group>
                    </Form-item>
                    <Form-item label="终止理由：" prop="" v-if="formData.pause === '1'">
                      <Input placeholder="请输入..." v-model="formData.pause_reason" type="textarea" v-if="!dialog.detail"></Input>
                      <span v-else>{{formData.pause_reason}}</span>
                    </Form-item>
                    <Form-item label="" prop="" v-if="!dialog.detail">
                        <Button type="primary" @click.stop="handleSubmit">确认</Button>
                        <Button @click="cancel">取消</Button>
                    </Form-item>
                </Col>
            </Row>
        </Form>
    </div>
</template>

<script>
import * as Config from './config.js';
import Form from '@/components/form';
import api from '@/api';
import LegalForm from './legal-form/form.vue'
import moment from 'moment'

export default {
  extends: Form,
  components: {
    LegalForm
  },
  props: {
    dialog: Object
  },
  data() {
    return {
      formData: Config.getFormData(),
      rules: Config.getRules(this)
    }
  },
  methods: {
    cancel() {
      this.$emit('cancel')
    },
    fetchApi () {
      return Promise.resolve(null)
    },
    saveForm: api.legal.accept,
    fetchConfirmData (results) {
      const { contract_id } = results
      api.legal.acceptDetail(contract_id).then(results => {
        results.notice = results.notice === 'true'
        Object.assign(this.formData, results)
      })
      this.formData.contract_id = results.contract_id
    },
    formatter (formdata) {
      formdata.time = moment(formdata.time).format('YYYY-MM-DD hh:mm:ss')
    },
    afterSubmit (resp) {
      if (resp.flag) {
        this.$emit('save-success')
      } else {
        this.$Message.error('保存失败')
      }
    }
  }
}
</script>

<style lang="less">
  .line {
    display: block;
    width: 70%;
    height: 1px;
    background-color: #ccc;
    margin: 0 auto;
    margin-bottom: 20px;
  }
</style>
