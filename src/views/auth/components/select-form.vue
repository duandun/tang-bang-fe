<template lang="html">
  <div class="actor-list-container">
    <Form ref="form" :model="formData" :label-width="80">
        <Form-item label="权限：" prop="">
            <CheckboxGroup v-model="formData.permission">
                <Checkbox :label="item.value" v-for="(item, index) in actorList" :key="index">{{item.label}}</Checkbox>
            </CheckboxGroup>
        </Form-item>
    </Form>
  </div>
</template>

<script>
import { ACTOR } from '@/constant'
import api from '@/api'
import cloneDeep from 'lodash/cloneDeep'

export default {
  props: {
    userId: String,
    userRoles: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
      actorList: ACTOR,
      formData: {
        permission: [],
        id: ''
      }
    }
  },
  created () {
    this.formData.permission = cloneDeep(this.userRoles)
    this.$nextTick(() => {
      if (!this.userId) return
      this.fetchApi(this.userId).then(results => {
        this.formData.permission = results.permission
        this.formData.id = this.userId
      })
    })
  },
  methods: {
    fetchApi: api.auth.getOtherUserInfo,
    saveForm: api.auth.addRole,
    handleSubmit () {
      let params = {
        permission: this.formData.permission.join(),
        id: this.userId
      }
      return this.saveForm(params).then(results => {
        if (results.addRole) {
          this.afterSubmit()
        } else {
          this.$Message.error('保存出错，请稍后重试')
        }
      })
    },
    afterSubmit () {
      this.$emit('close-dialog', this.formData)
    }
  }
}
</script>

<style lang="css">
</style>
