<template lang="html">
  <div class="">
      <Row type="flex" justify="center">
          <Col span="12">
              <Form ref="form" :model="formData" :label-width="80" :rules="rules">
                  <Form-item label="提交方式：" prop="">
                      <Radio-group v-model="formData.submitType" v-if="!detail">
                          <Radio label="邮寄"></Radio>
                          <Radio label="纸质"></Radio>
                          <Radio label="网上"></Radio>
                      </Radio-group>
                      <span v-else>XXXXXX</span>
                  </Form-item>
                  <Form-item label="回执：" prop="">
                      <Checkbox v-model="formData.num" v-if="!detail"></Checkbox>
                      <span v-else>XXXXX</span>
                  </Form-item>
                  <Form-item label="" prop="" v-if="!detail">
                      <Button type="primary">确认</Button>
                      <Button @click="cancel">取消</Button>
                  </Form-item>
              </Form>
          </Col>
      </Row>
  </div>
</template>

<script>
import * as Config from './config.js'

export default {
  props: {
    detail: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formData: Config.getFormData(),
      rules: Config.getRules(this)
    }
  },
  created() {

  },
  methods: {
    cancel() {
      this.$emit('cancel');
    }
  }
}
</script>

<style lang="css">
</style>
