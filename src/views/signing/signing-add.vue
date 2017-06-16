<template lang="html">
    <div class="container">
        <Card dis-hover>
            <p slot="title">
            签单录入
            </p>
            <Form ref="form" :model="formData" :label-width="100" style="margin-top: 10px;">
                <Row type="flex" justify="center">
                    <Col span="12">
                        <Form-item label="合同编号" prop="">
                            <Input placeholder="请输入..." v-model="formData.num"></Input>
                        </Form-item>
                        <Form-item label="公司名称" prop="">
                            <Input placeholder="请输入..." v-model="formData.comName"></Input>
                        </Form-item>
                        <Form-item label="委托事项" prop="">
                            <Input placeholder="请输入..." v-model="formData.caseName"></Input>
                        </Form-item>
                        <Form-item label="委托事项数量" prop="">
                            <Input placeholder="请输入..." v-model="formData.caseNum"></Input>
                        </Form-item>
                        <Form-item label="汇款方式" prop="">
                            <Input placeholder="请输入..." v-model="formData.moneyType"></Input>
                        </Form-item>
                        <Form-item label="汇款时间" prop="">
                            <Date-picker placeholder="选择时间和日期..." type="date" :value="formData.moneyTime"></Date-picker>
                        </Form-item>
                        <Form-item label="委托事项申请人" prop="">
                            <Input placeholder="请输入..." v-model="formData.applyName"></Input>
                        </Form-item>
                        <Form-item label="案件截止日期" prop="">
                            <Date-picker placeholder="选择时间和日期..." type="date" :value="formData.deadlineTime"></Date-picker>
                        </Form-item>
                        <Form-item label="注意事项" prop="">
                            <Input placeholder="请输入..." v-model="formData.attention"></Input>
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
