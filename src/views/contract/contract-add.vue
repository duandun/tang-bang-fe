<template lang="html">
    <div class="container">
        <Card dis-hover  v-if="!hiddenBtns">
            <p slot="title">
            {{showSubmitBtns ? '签单录入' : '签单修改'}}
            </p>
            <contract-form></contract-form>
        </Card>
    </div>
</template>

<script>
import ContractForm from '@/components/contract/contract-form.vue';

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
    ContractForm
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
