<template lang="html">
    <div class="">
        <Form ref="form" :model="formData" :label-width="80">

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

    }
};
</script>

<style lang="less">
</style>
