<template lang="html">
    <div class="container">
        <Card dis-hover  v-if="!hiddenBtns">
            <p slot="title">
            {{showSubmitBtns ? '签单录入' : '签单修改'}}
            </p>
            <Form ref="form" :model="formData" :label-width="120" style="margin-top: 10px;">
                <Row type="flex" justify="center">
                    <Col span="12">
                        <Form-item label="合同编号：" prop="">
                            <Input placeholder="请输入..." v-model="formData.num"></Input>
                        </Form-item>
                        <Form-item label="公司名称：" prop="">
                            <Input placeholder="请输入..." v-model="formData.comName"></Input>
                        </Form-item>
                        <Form-item label="委托事项：" prop="">
                            <Input placeholder="请输入..." v-model="formData.caseName"></Input>
                        </Form-item>
                        <Form-item label="委托事项数量：" prop="">
                            <Input placeholder="请输入..." v-model="formData.caseNum"></Input>
                        </Form-item>
                        <Form-item label="汇款方式：" prop="">
                            <Input placeholder="请输入..." v-model="formData.moneyType"></Input>
                        </Form-item>
                        <Form-item label="汇款时间：" prop="">
                            <Date-picker placeholder="选择时间和日期..." type="date" :value="formData.moneyTime"></Date-picker>
                        </Form-item>
                        <Form-item label="委托事项申请人：" prop="">
                            <Input placeholder="请输入..." v-model="formData.applyName"></Input>
                        </Form-item>
                        <Form-item label="案件截止日期：" prop="">
                            <Date-picker placeholder="选择时间和日期..." type="date" :value="formData.deadlineTime"></Date-picker>
                        </Form-item>
                        <Form-item label="注意事项：" prop="">
                            <Input placeholder="请输入..." v-model="formData.attention"></Input>
                        </Form-item>
                        <Form-item label="" prop="" v-if="!hiddenBtns && showSubmitBtns">
                            <Button type="primary" @click="confirm">提交</Button>
                            <Button style="margin-left: 10px;">取消</Button>
                        </Form-item>
                    </Col>
                </Row>
            </Form>
        </Card>
        <Form ref="form" :model="formData" :label-width="120" style="margin-top: 10px;" v-if="hiddenBtns">
            <Row type="flex" justify="center">
                <Col span="12" class="e-confirm-content">
                    <Form-item label="合同编号：" prop="">
                        <span>1234567</span>
                    </Form-item>
                    <Form-item label="公司名称：" prop="">
                        <span>唐邦知识产权有限公司</span>
                    </Form-item>
                    <Form-item label="委托事项：" prop="">
                        <span>委托事项委托实现</span>
                    </Form-item>
                    <Form-item label="委托事项数量：" prop="">
                        <span>10</span>
                    </Form-item>
                    <Form-item label="汇款方式：" prop="">
                        <span>银行转账</span>
                    </Form-item>
                    <Form-item label="汇款时间：" prop="">
                        <span>2017-04-21 14:34:23</span>
                    </Form-item>
                    <Form-item label="委托事项申请人：" prop="">
                        <span>某某某</span>
                    </Form-item>
                    <Form-item label="案件截止日期：" prop="">
                        <span>2017-04-21 14:34:23</span>
                    </Form-item>
                    <Form-item label="注意事项：" prop="">
                        <span>注意事项注意事项</span>
                    </Form-item>
                </Col>
            </Row>
        </Form>
    </div>
</template>

<script>
export default {
    props: {
        hiddenBtns: {
            type: Boolean,
            default: false
        },
        showSubmitBtns: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            formData: {
                submitType: ''
            },
            toAccount: '是'
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
.e-confirm-content {
    .ivu-form-item {
        margin-bottom: 0;
    }
}
</style>
