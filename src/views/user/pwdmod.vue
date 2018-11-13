<template lang="pug">
  .pwd-view
    Row(justify="center" type="flex")
      Col(:span="10")
        Form(:label-width="120" ref="form" :rules="rules" :model="formData")
          Form-item(label="账号：" prop="userName")
            Input(v-model="formData.userName")
          Form-item(label="密码：" prop="newPwd")
            Input(v-model.trim="formData.newPwd")
          Form-item(label="再次输入密码：" prop="rePwd")
            Input(v-model.trim="formData.rePwd")
          Form-item.btn-group
            Button(type="primary" @click="submitForm") 提交
            Button(@click="clearUp") 清空
</template>
<script>
import api from '@/api'

export default {
  data () {
    const validPwd = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请再次填写密码'))
      } else if (value !== this.formData.newPwd) {
        callback(new Error('两次密码输入不一致'))
      } else {
        callback()
      }
    }
    return {
      formData: {
        userName: '',
        newPwd: '',
        rePwd: ''
      },
      rules: {
        userName: [
          {required: true, trigger: 'change', message: '请填写账号'}
        ],
        newPwd: [
          {required: true, trigger: 'change', message: '请填写密码'}
        ],
        rePwd: [
          {required: true, trigger: 'change', message: '请再次填写密码', validator: validPwd}
        ]
      }
    }
  },
  methods: {
    clearUp () {
      this.$refs.form.resetFields()
    },
    submitForm () {
      this.$refs.form.validate(valid => {
        if (valid) {
          const params = {
            username: this.formData.userName,
            password: this.formData.newPwd
          }
          api.user.updatePwd(params).then(rs => {
            this.$Message.success('修改成功')
          }).catch(error => {
            console.log(error)
            if (error.user_exist === false) {
              this.$Message.error('用户不存在')
            } else {
              this.$Message.error('修改失败')
            }
          })
        }
      })
    }
  }
}
</script>
<style lang="less">
  .pwd-view {
    margin: 20px 0;
    .btn-group {
      button {
        margin-right: 10px;
      }
    }
  }
</style>
