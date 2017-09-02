<template lang="html">
  <div class="actor-list-container">
    <Form ref="form" :model="formData" :label-width="80">
        <Form-item label="角色：" prop="">
            <Radio-group v-model="formData.actor">
                <Radio :label="item.value" v-for="item in actorList" :key="item">{{item.label}}</Radio>
            </Radio-group>
        </Form-item>
    </Form>
  </div>
</template>

<script>
import { ACTOR } from '@/constant'
import Form from '@/components/form'

export default {
  extends: Form,
  data () {
    return {
      actorList: ACTOR,
      formData: {
        actor: 1
      }
    }
  },
  methods: {
    fetchApi: function () {
      return Promise.resolve(null)
    },
    saveForm () {
      return Promise.resolve(null)
    },
    afterSubmit () {
      this.$emit('close-dialog', this.formData)
    }
  }
}
</script>

<style lang="css">
</style>
