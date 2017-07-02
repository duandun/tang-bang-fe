<template lang="html">
    <div class="">
        <Form ref="form" :model="formData" :label-width="120" style="margin-top: 10px;">
            <Row type="flex" justify="center">
                <Col span="12">
                    <Form-item label="材料名称：" prop="">
                        <Input placeholder="请输入..." v-model="formData.name" v-if="!detail"></Input>
                        <span v-else>XXXXXX</span>
                    </Form-item>
                    <Form-item label="材料数量：" prop="">
                        <Input placeholder="请输入..." v-model="formData.name" v-if="!detail"></Input>
                        <span v-else>XXXXXX</span>
                    </Form-item>
                    <Form-item label="材料接收时间：" prop="">
                        <Input placeholder="请输入..." v-model="formData.name" v-if="!detail"></Input>
                        <span v-else>XXXXXX</span>
                    </Form-item>
                    <Form-item label="确认单数量：" prop="">
                        <Input placeholder="请输入..." v-model="formData.num" v-if="!detail"></Input>
                        <span v-else>XXXXXX</span>
                    </Form-item>
                    <Form-item label="委托书数量：" prop="">
                        <Input placeholder="请输入..." v-model="formData.comName" v-if="!detail"></Input>
                        <span v-else>XXXXXX</span>
                    </Form-item>
                    <Form-item label="申请书数量：" prop="">
                        <Input placeholder="请输入..." v-model="formData.caseName" v-if="!detail"></Input>
                        <span v-else>XXXXXX</span>
                    </Form-item>
                    <Form-item label="营业执照副本数量：" prop="">
                        <Input placeholder="请输入..." v-model="formData.caseNum" v-if="!detail"></Input>
                        <span v-else>XXXXXX</span>
                    </Form-item>
                    <Form-item label="驳回通知书：" prop="">
                        <Radio-group v-model="formData.cantactType" v-if="!detail">
                            <Radio label="原件"></Radio>
                            <Radio label="复印件"></Radio>
                            <Radio label="无"></Radio>
                        </Radio-group>
                        <span v-else>XXXXXX</span>
                    </Form-item>
                    <Form-item label="" prop="" v-if="!detail">
                        <Button type="primary" icon="plus">添加</Button>
                    </Form-item>
                    <Form-item label="" prop="" v-if="!detail">
                        <Button type="primary" @click="confirm">提交</Button>
                        <Button @click="cancel">取消</Button>
                    </Form-item>
                    <Form-item label="终止：" prop="" v-if="confirm && !confirmDetail">
                        <Radio-group v-model="formData.endProcess">
                            <Radio :label="1">是</Radio>
                            <Radio :label="0">否</Radio>
                        </Radio-group>
                    </Form-item>
                    <Form-item label="终止理由：" prop="" v-if="formData.endProcess && confirm && !confirmDetail" >
                        <Input placeholder="请输入..." v-model="formData.endReason" type="textarea"></Input>
                    </Form-item>
                </Col>
            </Row>
            <Row style="text-align: center;" v-if="confirm && !confirmDetail">
                <Button type="primary" @click="confirm">确认</Button>
                <Button @click="cancel">取消</Button>
            </Row>
        </Form>
    </div>
</template>

<script>
export default {
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
  data() {
    return {
      formData: {
        submitType: '邮寄',
        endProcess: 0,
        endReason: ''
      }
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

<style lang="less">
</style>
