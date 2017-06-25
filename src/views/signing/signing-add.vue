<template lang="html">
    <div class="container">
        <Card dis-hover  v-if="!hiddenBtns">
            <p slot="title">
            {{showSubmitBtns ? '签单录入' : '签单修改'}}
            </p>
            <signing-form></signing-form>
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
import SigningForm from '@/components/signing/signing-form.vue';

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
    components: {
        SigningForm
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
