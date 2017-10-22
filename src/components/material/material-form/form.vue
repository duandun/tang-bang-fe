<template lang="html">
  <div class="">
    <Form ref="form" :model="formData" :label-width="130" style="margin-top: 10px;" :rules="rules">
        <Row type="flex" justify="center">
            <Col span="12">
                <Form-item label="材料名称：" prop="material_name">
                    <Input placeholder="请输入..." v-model="formData.material_name" v-if="!comDetail"></Input>
                    <span v-else>{{formData.material_name}}</span>
                </Form-item>
                <Form-item label="材料数量：" prop="material_number">
                    <Input placeholder="请输入..." v-model.number="formData.material_number" v-if="!comDetail"></Input>
                    <span v-else>{{formData.material_number}}</span>
                </Form-item>
                <Form-item label="材料接收时间：" prop="receiving_time">
                    <Date-picker placeholder="请输入日期和时间" type="datetime" v-model="formData.receiving_time" v-if="!comDetail"></Date-picker>
                    <span v-else>{{formData.receiving_time}}</span>
                </Form-item>
                <Form-item label="确认单数量：" prop="confirmedlist_number">
                    <Input placeholder="请输入..." v-model.number="formData.confirmedlist_number" v-if="!comDetail"></Input>
                    <span v-else>{{formData.confirmedlist_number}}</span>
                </Form-item>
                <Form-item label="委托书数量：" prop="commission_number">
                    <Input placeholder="请输入..." v-model.number="formData.commission_number" v-if="!comDetail"></Input>
                    <span v-else>{{formData.commission_number}}</span>
                </Form-item>
                <Form-item label="申请书数量：" prop="application_number">
                    <Input placeholder="请输入..." v-model.number="formData.application_number" v-if="!comDetail"></Input>
                    <span v-else>{{formData.application_number}}</span>
                </Form-item>
                <Form-item label="营业执照副本数量：" prop="license_number">
                    <Input placeholder="请输入..." v-model.number="formData.license_number" v-if="!comDetail"></Input>
                    <span v-else>{{formData.license_number}}</span>
                </Form-item>
                <Form-item label="驳回通知书：" prop="">
                    <Radio-group v-model="formData.dismissal">
                        <Radio :label="index.toString()" v-for="(item, index) in enumDismiss" :key="index" :disabled="comDetail">{{item}}</Radio>
                    </Radio-group>
                </Form-item>

                <div class=""  v-for="(item, index) in formData.extra_material" :key="index">
                  <Form-item label="名称：" prop="" v-if="!comDetail">
                    <Input placeholder="请输入材料名称" v-model="item.key"></Input>
                  </Form-item>
                  <Form-item label="数量：" prop="" v-if="!comDetail">
                    <Row>
                        <Col span="18">
                          <Input placeholder="请输入..." v-model="item.value"></Input>
                        </Col>
                        <Col span="4" offset="1">
                            <Button type="ghost" @click.stop="handleRemove(index)">删除</Button>
                        </Col>
                    </Row>
                  </Form-item>
                  <Form-item :label="`${item.key}：`" prop="" v-if="comDetail">
                      <span>{{item.value}}</span>
                  </Form-item>
                </div>
                <Form-item v-if="!comDetail">
                  <Row>
                      <Col span="12">
                        <Button type="ghost" icon="plus" @click.stop="addColumn" long>添加</Button>
                      </Col>
                  </Row>
                </Form-item>
                <Form-item v-if="!comDetail">
                    <Button type="primary" @click.stop="handleSubmit" :loading="isSaving">提交</Button>
                    <Button @click="resetFormData">重置</Button>
                </Form-item>
            </Col>
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
    detail: {
      type: Boolean,
      default: false
    },
    dialog: Object
  },
  data () {
    return {
      enumDismiss: ['原件', '复印件', '无'],
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
    addColumn () {
      let oneColumn = {
        key: '',
        value: ''
      }
      this.formData.extra_material.push(oneColumn)
    },
    handleRemove (index) {
      this.formData.extra_material.splice(index, 1)
    },
    resetFormData () {
      this.$refs.form.resetFields()
    },
    prepare () {
      this.formData.contract_id = this.dialog.contract_id
      this.formData.id = this.dialog.id
      console.log(this.formData)
      return Promise.resolve(this.$route.query.id)
    },
    fetchApi: api.material.detail,
    saveForm: api.material.save,
    afterDataMerge (results) {
      this.$emit('data-merged', results)
    },
    formatter (formdata) {
      if (_.isDate(formdata.receiving_time)) {
        formdata.receiving_time = moment(formdata.receiving_time).format('YYYY-MM-DD hh:mm:ss');
      }
      if (!_.isEmpty(formdata.extra_material)) {
        formdata.extra_material = JSON.stringify(formdata.extra_material)
      }
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

<style lang="css">
</style>
