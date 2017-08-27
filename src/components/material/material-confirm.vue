<template lang="html">
    <div class="">
        <material-form :detail="true" @data-merged="fetchConfirmData" :dialog="dialog"></material-form>
        <Form ref="form" :model="formData" :label-width="120" style="margin-top: 10px;">
            <Row type="flex" justify="center">
                <Col span="12">
                    <Form-item label="终止：">
                        <Radio-group v-model="formData.pause"  >
                            <Radio :label="1" :disabled="confirmDetail">是</Radio>
                            <Radio :label="0" :disabled="confirmDetail">否</Radio>
                        </Radio-group>
                    </Form-item>
                    <Form-item label="终止理由：" v-if="formData.pause" >
                        <Input placeholder="请输入..." v-model="formData.pause_reason" type="textarea" v-if="!confirmDetail"></Input>
                        <span v-else>{{formData.pause_reason}}</span>
                    </Form-item>
                </Col>
            </Row>
            <Row style="text-align: center;" v-if="!confirmDetail">
                <Button type="primary" @click="handleSubmit">确认</Button>
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
    confirm: {
      type: Boolean,
      default: false
    },
    detail: {
      type: Boolean,
      default: false
    },
    confirmDetail: {
      type: Boolean,
      default: false
    },
    dialog: Object
  },
  components: {
    MaterialForm
  },
  data() {
    return {
      formData: Config.getFormData()
    }
  },
  methods: {
    cancel() {
      this.$emit('cancel');
    },
    fetchApi () {
      return Promise.resolve(null)
    },
    saveForm: api.material.confirm,
    fetchConfirmData (results) {
      if (this.confirmDetail) {
        const { contract_id } = results
        api.material.confirmDetail(contract_id).then(results => {
          Object.assign(this.formData, results)
        })
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
