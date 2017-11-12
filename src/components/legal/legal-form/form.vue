<template lang="html">
  <div class="">
      <Row type="flex" justify="center">
          <Col span="12">
              <Form ref="form" :model="formData" :label-width="100" :rules="rules">
                  <Form-item label="提交方式：" prop="post">
                      <Radio-group v-model="formData.post">
                          <Radio label="邮寄" :disabled="comDetail"></Radio>
                          <Radio label="纸质" :disabled="comDetail"></Radio>
                          <Radio label="网上" :disabled="comDetail"></Radio>
                      </Radio-group>
                  </Form-item>
                  <Form-item label="回执：" prop="response">
                      <Checkbox v-model="formData.response" :disabled="comDetail"></Checkbox>
                  </Form-item>
                  <Form-item label="提交时间：" prop="posttime">
                       <Date-picker v-if="!comDetail" placeholder="选择时间和日期..."
                      format="yyyy-MM-dd HH:mm:ss"
                      type="datetime" v-model="formData.posttime"></Date-picker>
                      <span v-else>{{formData.posttime}}</span>
                  </Form-item>
                  <Form-item label="操作人:" v-if="comDetail">
                    {{formData.nickname}}
                  </Form-item>
                  <Form-item label="" prop="" v-if="!comDetail">
                      <Button type="primary" @click.stop="handleSubmit">确认</Button>
                      <Button @click="resetFormData">重置</Button>
                  </Form-item>
              </Form>
          </Col>
      </Row>
      <Row v-if="!detail">
          <Button v-if="userInfo.role === 'admin' && !editable" type="primary" @click="editable = true">修改</Button>
        </Row>
  </div>
</template>

<script>
import * as Config from './config.js'
import Form from '@/components/form'
import api from '@/api'
import isDate from 'lodash/isDate'
import moment from 'moment'
import {mapGetters} from 'vuex'

export default {
  extends: Form,
  props: {
    detail: {
      type: Boolean,
      default: false
    },
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
    resetFormData () {
      this.$refs.form.resetFields()
    },
    prepare () {
      return Promise.resolve(this.$route.query.id)
    },
    fetchApi: api.legal.detail,
    saveForm: api.legal.save,
    afterDataMerge (results) {
      this.$emit('data-merged', results)
    },
    formatter (formdata) {
      formdata.contract_id = this.dialog.contract_id
      if (isDate(formdata.time)) {
        formdata.time = moment(formdata.time).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    willDataMerge (results) {
      results.response = results.response === 'true'
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
