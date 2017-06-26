<template lang="html">
    <div class="">
        <Form ref="form" :model="formData" :label-width="100">
            <Row type="flex" justify="center">
                <Col span="12">
                    <Form-item label="通知书下发：" prop="">
                        <Checkbox v-model="formData.checkBox" v-if="!detail"></Checkbox>
                        <span v-else>XXXXXXX</span>
                    </Form-item>
                    <Form-item label="标记：" prop="">
                        <Radio-group v-model="formData.flag" v-if="!detail">
                            <Radio label="不可提交"></Radio>
                            <Radio label="重新提交"></Radio>
                            <Radio label="变更提交"></Radio>
                        </Radio-group>
                        <span v-else>XXXXXXX</span>
                    </Form-item>
                    <Form-item label="不可受理：" prop="">
                        <Radio-group v-model="formData.flag" v-if="!detail">
                            <Radio label="不可提交"></Radio>
                            <Radio label="重新提交"></Radio>
                            <Radio label="变更提交"></Radio>
                        </Radio-group>
                        <span v-else>XXXXXXX</span>
                    </Form-item>
                    <Form-item label="提交时间：" prop="">
                        <Date-picker placeholder="选择时间和日期..." type="date" :value="formData.moneyTime" v-if="!detail"></Date-picker>
                        <span v-else>XXXXXXX</span>
                    </Form-item>
                    <Form-item label="" prop="" v-if="!detail">
                        <Button type="primary">确认</Button>
                        <Button @click="cancel">取消</Button>
                    </Form-item>
                </Col>
            </Row>
        </Form>
    </div>
</template>

<script>
export default {
    props: {
        detail: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            formData: {

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
