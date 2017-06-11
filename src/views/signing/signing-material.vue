<template lang="html">
    <div class="container">
        <Card>
            <p slot="title">
            材料确认
            </p>
            <Form ref="form" :model="formData" :label-width="100" style="margin-top: 10px;">
                <Row type="flex" justify="center">
                    <Col span="12">
                        <Form-item label="确认单数量" prop="">
                            <Input placeholder="请输入..." v-model="formData.num"></Input>
                        </Form-item>
                        <Form-item label="XX书数量" prop="">
                            <Input placeholder="请输入..." v-model="formData.comName"></Input>
                        </Form-item>
                        <Form-item label="申请书数量" prop="">
                            <Input placeholder="请输入..." v-model="formData.caseName"></Input>
                        </Form-item>
                        <Form-item label="营业执照" prop="">
                            <Input placeholder="请输入..." v-model="formData.caseNum"></Input>
                        </Form-item>
                        <Form-item label="驳回通知书" prop="">
                            <Input placeholder="请输入..." v-model="formData.moneyType"></Input>
                        </Form-item>
                        <Form-item label="提交方式" prop="">
                            <Radio-group v-model="formData.submitType">
                                <Radio label="邮寄"></Radio>
                                <Radio label="纸质"></Radio>
                                <Radio label="网上"></Radio>
                            </Radio-group>
                        </Form-item>
                        <Form-item label="回执" prop="">
                            <Checkbox v-model="formData.response"></Checkbox>
                        </Form-item>
                        <Form-item label="" prop="">
                            <Button type="primary" @click="confirm">提交</Button>
                            <Button style="margin-left: 10px;">取消</Button>
                        </Form-item>
                    </Col>
                </Row>
            </Form>
        </Card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            formData: {
                submitType: '邮寄'
            }
        }
    },
    created() {
    },
    methods: {
        confirm() {
            this.$Message.success('提交成功')
            setTimeout(() => {
                this.$router.push({
                    name: 'flowAdd'
                })
            }, 1000);
        }
    }
}
</script>

<style lang="less">
    .container {
        padding: 10px 15px;
    }
</style>
