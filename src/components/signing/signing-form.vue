<template lang="html">
    <div class="">
        <Form ref="form" :model="formData" :label-width="120">
            <Row>
                <Col span="12">
                    <Form-item label="合同编号：" prop="">
                        <Input placeholder="请输入..." v-model="formData.num" v-if="!detail"></Input>
                        <span v-else>XXXXX</span>
                    </Form-item>
                </Col>
                <Col span="12">
                    <Form-item label="公司名称：" prop="">
                        <Input placeholder="请输入..." v-model="formData.name" v-if="!detail"></Input>
                        <span v-else>XXXXX</span>
                    </Form-item>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <Form-item label="委托事项：" prop="">
                        <Input placeholder="请输入..." v-model="formData.num" v-if="!detail"></Input>
                        <span v-else>XXXXX</span>
                    </Form-item>
                </Col>
                <Col span="12">
                    <Form-item label="委托事项数量：" prop="">
                        <Input placeholder="请输入..." v-model="formData.name" v-if="!detail"></Input>
                        <span v-else>XXXXXX</span>
                    </Form-item>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <Form-item label="汇款方式：" prop="">
                        <Input placeholder="请输入..." v-model="formData.num" v-if="!detail"></Input>
                        <span v-else>XXXXXX</span>
                    </Form-item>
                </Col>
                <Col span="12">
                    <Form-item label="汇款时间：" prop="">
                        <Date-picker v-if="!detail" placeholder="选择时间和日期..." type="date" :value="formData.moneyTime"></Date-picker>
                        <span v-else>XXXXX</span>
                    </Form-item>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <Form-item label="委托事项申请人：" prop="">
                        <Input placeholder="请输入..." v-model="formData.num" v-if="!detail"></Input>
                        <span v-else>XXXXXX</span>
                    </Form-item>
                </Col>
                <Col span="12">
                    <Form-item label="案件截止日期：" prop="">
                        <Date-picker v-if="!detail" placeholder="选择时间和日期..." type="date" :value="formData.moneyTime"></Date-picker>
                        <span v-else>XXXXXX</span>
                    </Form-item>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <Form-item label="注意事项：" prop="">
                        <Input placeholder="请输入..." v-model="formData.num" v-if="!detail"></Input>
                        <span v-else>XXXXXX</span>
                    </Form-item>
                </Col>
                <Col span="12">
                </Col>
            </Row>
            <Row style="text-align: center; margin-top: 10px;" v-if="!detail">
                <Button type="primary">提交</Button>
                <Button @click="cancel">取消</Button>
            </Row>
            <span class="" v-if="confirm">
                <Row>
                    <Col span="12">
                        <Form-item label="到账金额确认无误：" prop="">
                            <Radio-group v-model="formData.num" v-if="!confirmDetail">
                                <Radio label="是"></Radio>
                                <Radio label="否"></Radio>
                            </Radio-group>
                            <span v-else>XXXXXX</span>
                        </Form-item>
                    </Col>
                    <Col span="12">
                        <Form-item label="到账时间：" prop="">
                            <Date-picker v-if="!confirmDetail" placeholder="选择时间和日期..." type="date" :value="formData.moneyTime"></Date-picker>
                            <span v-else>XXXXXX</span>
                        </Form-item>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <Form-item label="合同信息确认无误：" prop="">
                            <Radio-group v-model="formData.num" v-if="!confirmDetail">
                                <Radio label="是"></Radio>
                                <Radio label="否"></Radio>
                            </Radio-group>
                            <span v-else>XXXXX</span>
                        </Form-item>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <Form-item label="终止：" prop="">
                            <Radio-group v-model="formData.endProcess">
                                <Radio :label="1">是</Radio>
                                <Radio :label="0">否</Radio>
                            </Radio-group>
                        </Form-item>
                        <Form-item label="终止理由：" prop="" v-if="formData.endProcess">
                            <Input placeholder="请输入..." v-model="formData.endReason" type="textarea"></Input>
                        </Form-item>
                    </Col>
                </Row>
                <Row style="text-align: center" v-if="!confirmDetail">
                    <Button type="primary">确认</Button>
                    <Button @click="cancel">取消</Button>
                </Row>
            </span>
        </Form>
    </div>
</template>

<script>
export default {
    props: {
        detail: {
            type: Boolean,
            default: false
        },
        confirm: {
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
                endProcess: 0
            }
        }
    },
    created() {

    },
    methods: {
        cancel() {
            this.resetFormData();
            this.$emit('cancel');
        },
        resetFormData() {
            this.$refs['form'].resetFields();
        }
    }
}
</script>

<style lang="css">
</style>
