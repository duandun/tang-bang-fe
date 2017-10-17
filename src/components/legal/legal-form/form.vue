<template lang="html">
  <div class="">
      <Row type="flex" justify="center">
          <Col span="12">
              <Form ref="form" :model="formData" :label-width="80" :rules="rules">
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
                  <Form-item label="" prop="" v-if="!comDetail">
                      <Button type="primary" @click.stop="handleSubmit">确认</Button>
                      <Button @click="resetFormData">重置</Button>
                  </Form-item>
              </Form>
          </Col>
      </Row>
  </div>
</template>

<script>
import * as Config from './config.js'
import Form from '@/components/form'
import api from '@/api'

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
      rules: Config.getRules(this)
    }
  },
  computed: {
    comDetail () {
      return this.dialog.detail || this.detail
    }
  },
  methods: {
    resetFormData () {
      this.$refs.form.resetFields()
    },
    prepare () {
      return Promise.resolve(this.dialog.contract_id)
    },
    fetchApi: api.legal.detail,
    saveForm: api.legal.save,
    afterDataMerge (results) {
      this.$emit('data-merged', results)
    },
    formatter (formdata) {
      formdata.contract_id = this.dialog.contract_id
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
