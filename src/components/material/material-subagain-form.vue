<template lang="html">
    <div class="">
      <Row type="flex" justify="center">
          <Col span="16">
            <Form ref="form" :model="formData" :label-width="150" :rules="rules">
              <Form-item label="补充材料提交：" prop="extra_material">
                  <Radio-group v-model="formData.extra_material">
                      <Radio :label="1" :disabled="dialog.detail">有</Radio>
                      <Radio :label="0" :disabled="dialog.detail">无</Radio>
                  </Radio-group>
              </Form-item>
              <div v-if="formData.extra_material === 1">
                <Form-item label="补充证据提交方式：">
                   <i-switch v-model="switches.add_way" size="large" v-if="!dialog.detail">
                    <span slot="open">开启</span>
                    <span slot="close">关闭</span>
                  </i-switch>
                  <Radio-group v-model="formData.add_way" v-if="switches.add_way || dialog.detail">
                      <Radio :label="0" :disabled="dialog.detail">邮寄</Radio>
                      <Radio :label="1" :disabled="dialog.detail">纸质</Radio>
                      <Radio :label="2" :disabled="dialog.detail">网上</Radio>
                  </Radio-group>
                </Form-item>
                <Form-item label="补充证据提交结果：">
                  <i-switch v-model="switches.results" size="large" v-if="!dialog.detail">
                    <span slot="open">开启</span>
                    <span slot="close">关闭</span>
                  </i-switch>
                  <Radio-group v-model="formData.results" v-if="switches.results || dialog.detail">
                      <Radio :label="1" :disabled="dialog.detail">回执</Radio>
                      <Radio :label="0" :disabled="dialog.detail">无回执</Radio>
                  </Radio-group>
                </Form-item>
                <Form-item label="提交时间：" v-if="switches.results || dialog.detail">
                  <DatePicker :disabled="dialog.detail" type="datetime" placeholder="选择日期和时间" style="width: 200px" v-model="formData.add_time"></DatePicker>
                </Form-item>
                <Form-item label="未受理通知书提交方式：">
                  <i-switch v-model="switches.no_way" size="large" v-if="!dialog.detail">
                    <span slot="open">开启</span>
                    <span slot="close">关闭</span>
                  </i-switch>
                    <Radio-group v-model="formData.no_way" v-if="switches.no_way || dialog.detail">
                        <Radio :label="0" :disabled="dialog.detail">已补正提交</Radio>
                        <Radio :label="1" :disabled="dialog.detail">已重新提交</Radio>
                        <Radio :label="2" :disabled="dialog.detail">不予提交</Radio>
                    </Radio-group>
                </Form-item>
                <Form-item label="备注原因：" v-if="(formData.no_way === 2 && switches.no_way) || dialog.detail">
                    <Input placeholder="请输入..." v-model="formData.no_reason" v-if="!dialog.detail"></Input>
                    <span v-else>{{formData.no_reason}}</span>
                </Form-item>
                <Form-item label="提交时间：" v-if="switches.no_way || dialog.detail">
                    <DatePicker type="datetime" :disabled="dialog.detail" placeholder="选择日期和时间" style="width: 200px" v-model="formData.no_time"></DatePicker>
                </Form-item>
              </div>
              <Form-item label="操作人:" v-if="dialog.detail">
                {{formData.nickname}}
              </Form-item>
              <Form-item v-if="!dialog.detail">
                  <Button type="primary" @click.stop="handleSubmit">提交</Button>
                  <Button @click.stop="dialog.visible = false">取消</Button>
              </Form-item>
            </Form>
          </Col>
      </Row>
    </div>
</template>

<script>
import Form from '@/components/form'
import api from '@/api'
import moment from 'moment'

export default {
  extends: Form,
  props: {
    dialog: Object
  },
  data() {
    return {
      switches: {
        results: false,
        add_way: false,
        no_way: false
      },
      formData: {
        id: '',
        contract_id: '',
        extra_material: 0,
        add_way: 0,
        no_way: 0,
        results: 0,
        add_time: '',
        no_time: '',
        no_reason: ''
      },
      rules: {
        no_time: [
          { required: true, message: '请输入时间', trigger: 'change', type: 'date' }
        ],
        add_time: [
          { required: true, message: '请输入时间', trigger: 'change', type: 'date' }
        ],
        extra_material: [
          { required: true, message: '请选择', trigger: 'change', type: 'number' }
        ]
      }
    }
  },
  methods: {
    fetchApi: api.material.twiceDetail,
    saveForm: api.material.twice,
    formatter (formdata) {
      if (!formdata.contract_id) {
        formdata.contract_id = this.$route.query.id
      }
      formdata.add_time = formdata.add_time && moment(formdata.add_time).format('YYYY-MM-DD hh:mm:ss')
      formdata.no_time = formdata.no_time && moment(formdata.no_time).format('YYYY-MM-DD hh:mm:ss')
      if (!this.switches.results) {
        formdata.results = void 0
        formdata.add_time = void 0
      }
      if (!this.switches.add_way) {
        formdata.add_way = void 0
      }
      if (!this.switches.no_way) {
        formdata.no_way = void 0
        formdata.no_time = void 0
        formdata.no_reason = void 0
      }
    },
    afterSubmit (resp) {
      if (resp.flag) {
        this.$emit('save-success');
      } else {
        this.$Message.error('保存失败')
      }
    },
    willDataMerge (results) {
    }
  }
}
</script>

<style lang="less">
</style>
