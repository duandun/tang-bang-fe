<template lang="html">
    <div class="">
      <legal-form :detail="true" @data-merged="fetchConfirmData" :dialog="dialog"></legal-form>
      <span class="line"></span>
        <Form ref="form" :model="formData" :label-width="120" :rules="rules">
            <Row type="flex" justify="center">
                <Col span="12">
                  <Form-item label="通知书：">
                      <Radio-group v-model="formData.accept">
                        <Radio label="已受理" :disabled="comDetail"></Radio>
                        <Radio label="不予受理" :disabled="comDetail"></Radio>
                        <Radio label="补正通知" :disabled="comDetail"></Radio>
                      </Radio-group>
                    </Form-item>
                    <Form-item label="申请号或注册号：">
                      <Input v-model="formData.applicationID" v-if="!comDetail"></Input>
                      <span v-else>{{formData.applicationID}}</span>
                    </Form-item>
                    <Form-item label="通知书下发：" prop="notice">
                      <Radio-group v-model="formData.notice">
                        <Radio label="true" :disabled="comDetail">已下发</Radio>
                        <Radio label="false" :disabled="comDetail">未下发</Radio>
                      </Radio-group>
                    </Form-item>
                    <Form-item label="接收时间：" prop="time">
                        <Date-picker placeholder="选择时间和日期..." type="datetime" v-model="formData.time" v-if="!comDetail"></Date-picker>
                        <span v-else>{{formData.time}}</span>
                    </Form-item>
                    <Form-item label="终止：" prop="pause">
                        <Radio-group v-model="formData.pause">
                            <Radio label="1" :disabled="comDetail">是</Radio>
                            <Radio label="0" :disabled="comDetail">否</Radio>
                        </Radio-group>
                    </Form-item>
                    <Form-item label="终止理由：" prop="" v-if="formData.pause === '1'">
                      <Input placeholder="请输入..." v-model="formData.pause_reason" type="textarea" v-if="!comDetail"></Input>
                      <span v-else>{{formData.pause_reason}}</span>
                    </Form-item>
                    <Form-item label="操作人：" v-if="comDetail">
                      {{formData.nickname}}
                    </Form-item>
                    <Form-item label="" prop="" v-if="!comDetail">
                        <Button type="primary" @click.stop="handleSubmit">确认</Button>
                        <Button @click="cancel">取消</Button>
                    </Form-item>
                </Col>
            </Row>
            <!-- <Row v-if="comDetail">
              <Button v-if="userInfo.role === 'admin' && !editable" type="primary" @click="editable = true">修改</Button>
            </Row> -->
        </Form>
    </div>
</template>

<script>
import * as Config from './config.js';
import Form from '@/components/form';
import api from '@/api';
import LegalForm from './legal-form/form.vue'
import moment from 'moment'
import {mapGetters} from 'vuex'

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
      rules: Config.getRules(this),
      editable: false
    }
  },
  computed: {
    comDetail () {
      if (this.editable) {
        return false
      }
      return this.dialog.detail || this.detail
    },
    ...mapGetters([
      'userInfo'
    ])
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
