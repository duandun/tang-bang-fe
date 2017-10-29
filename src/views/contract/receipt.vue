<template>
  <div>
    <Modal v-model="dialog.visible" title="票据" width="680" :mask-closable="false" :styles="{top: '30px'}" :transfer="true">
      <Form ref="form" :model="formData" :rules="rules" :label-width="100">
        <Row type="flex" justify="center">
          <Col span="12">
            <Form-item label="票据：" prop="receipt">
              <Radio-group v-model="formData.receipt" >
                  <Radio :label="1" >普通发票</Radio>
                  <Radio :label="2" >专用发票</Radio>
                  <Radio :label="3" >收据</Radio>
              </Radio-group>
          </Form-item>
          <Form-item label="开据时间：" prop="time">
              <Date-picker placeholder="选择时间和日期..." type="datetime" v-model="formData.time"></Date-picker>
          </Form-item>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Button type="primary" @click.stop="confirmDialog">确认</Button>
        <Button @click.stop="cancelDialog">取消</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import { TEXT } from '@/constant'
  import api from '@/api'
  import cloneDeep from 'lodash/cloneDeep'
  import moment from 'moment'

  export default {
    props: {
      dialog: Object
    },
    data () {
      return {
        formData: {
          contract_id: '',
          receipt: 1,
          time: ''
        },
        rules: {
          time: [
            { required: true, message: '请填写时间', trigger: 'change', type: 'date' }
          ]
        }
      }
    },
    watch: {
      'dialog.visible' (val) {
        if (!val) {
          this.resetFormData()
          return
        }
        this.formData.contract_id = this.dialog.id
      }
    },
    created () {
      this._original = cloneDeep(this.formData)
    },
    methods: {
      resetFormData () {
        Object.assign(this.formData, this._original)
      },
      confirmDialog () {
        this.$refs.form.validate(valid => {
          if (!valid) {
            this.$Message.error(TEXT.FORM_VALIDATE_ERROR)
            return
          }
          let formdata = cloneDeep(this.formData)
          formdata.time = moment(formdata.time).format('YYYY-MM-DD hh:mm:ss')
          api.contract.confirm(formdata).then(results => {
            console.log(results)
            if (results.flag) {
              this.dialog.visible = false
              this.$emit('save-success')
            } else {
              this.$Message.error('保存失败')
            }
          }).catch(e => {
            this.$Message.error('保存失败')
          })
        })
      },
      cancelDialog () {
        this.dialog.visible = false
        this.$emit('cancel')
      }
    }
  }
</script>