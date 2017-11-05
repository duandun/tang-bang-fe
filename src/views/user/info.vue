<template lang="html">
  <div class="user-info-container">
    <Row type="flex" justify="center">
      <Col span="12">
        <Form :model="formData" :rules="rules" :label-width="100" ref="form">
          <Form-item label="账户：">
            <span>{{username}}</span>
          </Form-item>
          <Form-item label="姓名：" prop="nickname">
            <Input v-model.trim="formData.nickname" placeholder="填写姓名"></Input>
          </Form-item>
          <Form-item label="省市：" prop="pcArray">
            <Cascader v-model="formData.pcArray" :data="pcData"></Cascader>
          </Form-item>
          <Form-item label="电话：" prop="cell_phone">
            <Input v-model="formData.cell_phone" placeholder="填写电话"></Input>
          </Form-item>
          <Form-item label="部门：" prop="department">
            <Input v-model.trim="formData.department" placeholder="填写部门"></Input>
          </Form-item>
          <Form-item label="设置新密码：">
            <i-switch v-model="canSetPasswd">
              <span slot="open">是</span>
              <span slot="close">否</span>
            </i-switch>
          </Form-item>
          <div v-if="canSetPasswd">
            <Form-item label="新密码：" prop="password">
              <Input v-model="formData.password" placeholder="填写密码" type="password"></Input>
            </Form-item>
            <Form-item label="确认密码：" prop="repassword">
              <Input v-model="formData.repassword" placeholder="确认密码" type="password"></Input>
            </Form-item>
          </div>
           <Form-item>
            <Button type="primary" @click="confirm">修改</Button>
          </Form-item>
        </Form>
      </Col>
    </Row>
  </div>
</template>

<script>
  import * as Config from './config'
  import api from '@/api'
  import cloneDeep from 'lodash/cloneDeep'
  import CityList from './city.min.js'

  export default {
    data () {
      return {
        username: '',
        formData: Config.getFormData(this),
        rules: Config.getRules(this),
        canSetPasswd: false,
        pcData: []
      }
    },
    watch: {
      'formData.pcArray' (val) {
        this.formData.province = val[0]
        this.formData.city = val[1]
      }
    },
    created () {
      this.$nextTick(() => {
        api.user.getUserInfo().then(results => {
          this.username = results.username || results.name
          this.resetWith(this.formData, results)
          this.formData.pcArray = [results.province, results.city]
        })
      })
    },
    mounted () {
      const { citylist } = CityList
      const newList = citylist.map(item => {
        const children = item.c && item.c.map(k => ({value: k.n, label: k.n}))
        return {
          value: item.p,
          label: item.p,
          children
        }
      })
      this.pcData = newList
    },
    methods: {
      resetWith (source, data) {
        Object.keys(source).forEach(key => {
          source[key] = data[key]
        })
        return source
      },
      formatData () {
        const formdata = cloneDeep(this.formData)
        delete formdata.repassword
        if (!this.canSetPasswd) {
          delete formdata.password
        }
        delete formdata.pcArray
        return formdata
      },
      confirm () {
        const { formData } = this
        this.$refs.form.validate(valid =>{
          if (!valid) {
            return
          }
          const formdata = this.formatData()
          api.user.updateUserInfo(formdata).then(results => {
            if(results.flag) {
              this.$Notice.success({
                title: '修改个人信息成功'
              })
            }
          })
        })
      }
    }
  }
</script>

<style lang="less">
  .user-info-container {
    margin-top: 20px;
  }
</style>