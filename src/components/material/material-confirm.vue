<template lang="html">
    <div class="">
        <material-form :detail="true" @data-merged="fetchConfirmData" :dialog="dialog"></material-form>
        <Form ref="form" :model="formData" :label-width="120" style="margin-top: 10px;" :rules="rules">
            <Row type="flex" justify="center">
                <Col span="12">
                    <Form-item label="终止：" prop="pause">
                        <Radio-group v-model="formData.pause">
                            <Radio label="1" :disabled="dialog.detail">是</Radio>
                            <Radio label="0" :disabled="dialog.detail">否</Radio>
                        </Radio-group>
                    </Form-item>
                    <Form-item label="终止理由：" v-if="formData.pause === '1'" prop="pause_reason" >
                        <Input placeholder="请输入..." v-model="formData.pause_reason" type="textarea" v-if="!dialog.detail"></Input>
                        <span v-else>{{formData.pause_reason}}</span>
                    </Form-item>
                </Col>
            </Row>
            <Row style="text-align: center;" v-if="!dialog.detail">
                <Button type="primary" @click.stop="handleSubmit" :loading="isSaving">确认</Button>
                <Button @click="cancel">取消</Button>
            </Row>
        </Form>
    </div>
</template>

<script>
import * as Config from './config.js';
import Form from '@/components/form';
import api from '@/api';
import MaterialForm from './material-form/form.vue'

export default {
  extends: Form,
  props: {
    dialog: Object
  },
  components: {
    MaterialForm
  },
  data() {
    return {
      formData: Config.getFormData(),
      rules: Config.getRules(this)
    }
  },
  methods: {
    cancel() {
      this.$emit('cancel');
    },
    prepare () {
      this.formData.contract_id = this.$route.query.id || ''
      return Promise.resolve(null)
    },
    fetchApi () {
      return Promise.resolve(null)
    },
    saveForm: api.material.confirm,
    fetchConfirmData (results) {
      if (this.confirmDetail) {
        Object.assign(this.formData, results)
        // api.material.confirmDetail(contract_id).then(results => {
        //
        // })
      }
      if (this.confirm) {
        this.formData.contract_id = results.contract_id
      }
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
</style>
