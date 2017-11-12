<template lang="html">
    <div class="">
      <Row type="flex" justify="center">
          <Col span="16">
            <Form ref="form" :model="formData" :label-width="150" :rules="rules">
              <Form-item label="补充材料提交：" prop="extra_material">
                  <Radio-group v-model="formData.extra_material">
                      <Radio :label="1" :disabled="comDetail">有</Radio>
                      <Radio :label="0" :disabled="comDetail">无</Radio>
                  </Radio-group>
              </Form-item>
              <div v-if="formData.extra_material === 1">
                <Form-item label="补充证据提交方式：">
                   <i-switch v-model="switches.add_way" size="large" v-if="!comDetail">
                    <span slot="open">开启</span>
                    <span slot="close">关闭</span>
                  </i-switch>
                  <Radio-group v-model="formData.add_way" v-if="switches.add_way || comDetail">
                      <Radio :label="0" :disabled="comDetail">邮寄</Radio>
                      <Radio :label="1" :disabled="comDetail">纸质</Radio>
                      <Radio :label="2" :disabled="comDetail">网上</Radio>
                  </Radio-group>
                </Form-item>
                <Form-item label="补充证据提交结果：">
                  <i-switch v-model="switches.result" size="large" v-if="!comDetail">
                    <span slot="open">开启</span>
                    <span slot="close">关闭</span>
                  </i-switch>
                  <Radio-group v-model="formData.result" v-if="switches.result || comDetail">
                      <Radio :label="1" :disabled="comDetail">回执</Radio>
                      <Radio :label="0" :disabled="comDetail">无回执</Radio>
                  </Radio-group>
                </Form-item>
                <Form-item label="提交时间：" v-if="switches.result || comDetail">
                  <DatePicker :disabled="comDetail" type="datetime" placeholder="选择日期和时间" style="width: 200px" v-model="formData.add_time"></DatePicker>
                </Form-item>
                <Form-item label="未受理通知书提交方式：">
                  <i-switch v-model="switches.no_way" size="large" v-if="!comDetail">
                    <span slot="open">开启</span>
                    <span slot="close">关闭</span>
                  </i-switch>
                    <Radio-group v-model="formData.no_way" v-if="switches.no_way || comDetail">
                        <Radio :label="0" :disabled="comDetail">已补正提交</Radio>
                        <Radio :label="1" :disabled="comDetail">已重新提交</Radio>
                        <Radio :label="2" :disabled="comDetail">不予提交</Radio>
                    </Radio-group>
                </Form-item>
                <Form-item label="备注原因：" v-if="(formData.no_way === 2 && switches.no_way) || comDetail">
                    <Input placeholder="请输入..." v-model="formData.no_reason" v-if="!comDetail"></Input>
                    <span v-else>{{formData.no_reason}}</span>
                </Form-item>
                <Form-item label="提交时间：" v-if="switches.no_way || comDetail">
                    <DatePicker type="datetime" :disabled="comDetail" placeholder="选择日期和时间" style="width: 200px" v-model="formData.no_time"></DatePicker>
                </Form-item>
              </div>
              <Form-item label="操作人:" v-if="comDetail">
                {{formData.nickname}}
              </Form-item>
              <Form-item v-if="!comDetail">
                  <Button type="primary" @click.stop="handleSubmit">提交</Button>
                  <Button @click.stop="dialog.visible = false">取消</Button>
              </Form-item>
            </Form>
          </Col>
      </Row>
      <Row v-if="comDetail">
        <Button v-if="userInfo.role === 'admin' && !editable" type="primary" @click="editable = true">修改</Button>
      </Row>
    </div>
</template>

<script>
import Form from '@/components/form'
import api from '@/api'
import moment from 'moment'
import {mapGetters} from 'vuex'

export default {
  extends: Form,
  props: {
    dialog: Object
  },
  data() {
    return {
      switches: {
        result: false,
        add_way: false,
        no_way: false
      },
      formData: {
        id: '',
        contract_id: '',
        extra_material: 0,
        add_way: 0,
        no_way: 0,
        result: 0,
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
      },
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
    fetchApi: api.material.twiceDetail,
    saveForm: api.material.twice,
    formatter (formdata) {
      if (!formdata.contract_id) {
        formdata.contract_id = this.$route.query.id
      }
      formdata.add_time = formdata.add_time && moment(formdata.add_time).format('YYYY-MM-DD hh:mm:ss')
      formdata.no_time = formdata.no_time && moment(formdata.no_time).format('YYYY-MM-DD hh:mm:ss')
      if (!this.switches.result) {
        formdata.result = void 0
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
    willDataMerge (data) {
    }
  }
}
</script>

<style lang="less">
</style>
