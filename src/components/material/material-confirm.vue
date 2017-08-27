<template lang="html">
    <div class="">
        <material-form :detail="true" @data-merged="fetchConfirmData"></material-form>
        <Form ref="form" :model="formData" :label-width="120" style="margin-top: 10px;">
            <Row type="flex" justify="center">
                <Col span="12">
                    <Form-item label="终止：" prop="" v-if="confirm && !confirmDetail">
                        <Radio-group v-model="formData.pause">
                            <Radio :label="1">是</Radio>
                            <Radio :label="0">否</Radio>
                        </Radio-group>
                    </Form-item>
                    <Form-item label="终止理由：" prop="" v-if="formData.pause && confirm && !confirmDetail" >
                        <Input placeholder="请输入..." v-model="formData.pause_reason" type="textarea"></Input>
                    </Form-item>
                </Col>
            </Row>
            <Row style="text-align: center;" v-if="confirm && !confirmDetail">
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
    }
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
