<template lang="html">
    <div class="">
        <Row>
            <Form :label-width="80" ref="form" :model="formData">
                <Form-item label="调试地址:" prop="debugApiHost">
                    <Input v-model="formData.debugApiHost" style="width: 300px;"></Input>
                </Form-item>
                <Form-item>
                    <Button type="primary" @click="confirm">确定</Button>
                    <Button type="ghost" @click="handleReset('form')" icon="trash-b" style="margin-left: 20px;">重置</Button>
                </Form-item>
            </Form>
        </Row>
    </div>
</template>

<script>
import { storage } from '@/utils';

export default {
    data() {
        return {
            formData: {
                debugApiHost: ''
            }
        }
    },
    methods: {
        confirm() {
            storage.local.set('debugApiHost', this.formData.debugApiHost);
            this.$Message.success('更改调试地址成功');
        },
        handleReset(name) {
            this.$refs[name].resetFields();
        }
    }
};
</script>

<style lang="css">
</style>
