<template lang="html">
    <div class="container">
        <Form ref="form" :model="formData" :label-width="120">
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
                        <Input placeholder="请输入..." v-model="formData.moneyTime"></Input>
                    </Form-item>
                    <Form-item label="委托事项申请人" prop="">
                        <Input placeholder="请输入..." v-model="formData.applyName"></Input>
                    </Form-item>
                    <Form-item label="案件截止日期" prop="">
                        <Input placeholder="请输入..." v-model="formData.deadlineTime"></Input>
                    </Form-item>
                    <Form-item label="注意事项" prop="">
                        <Input placeholder="请输入..." v-model="formData.attention"></Input>
                    </Form-item>
                    <Form-item label="" prop="">
                        <Button type="primary">提交</Button>
                        <Button style="margin-left: 10px;">取消</Button>
                    </Form-item>
                </Col>
            </Row>
        </Form>
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
        enterFlowPage() {
            this.$router.push({
                name: 'flowAdd'
            });
        }
    }
}
</script>

<style lang="less" scoped>
    .container {
        padding: 10px;
    }
</style>
