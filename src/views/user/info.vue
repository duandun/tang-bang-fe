<template lang="html">
  <div class="user-info-container">
    <Row type="flex" justify="center">
      <Col span="12">
        <Form :modal="formData" :rules="rules" :label-width="100" ref="form">
          <Form-item label="账户：">
            <span>{{formData.userName}}</span>
          </Form-item>
          <Form-item label="姓名：" prop="nickName">
            <Input v-model="formData.nickName"></Input>
          </Form-item>
          <Form-item label="省市：" prop="place">
            <div id="city_1" class="prov-class">
              <select class="prov" ref="prov"></select>
              <select class="city" disabled="disabled" ref="city"></select>
            </div>
          </Form-item>
          <Form-item label="电话：" prop="phone">
            <Input v-model="formData.phone"></Input>
          </Form-item>
          <Form-item label="部门：" prop="department">
            <Input v-model="formData.department"></Input>
          </Form-item>
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
  require('../../../static/jquery.cityselect.js')

  export default {
    data () {
      return {
        formData: Config.getFormData(this),
        rules: Config.getRules(this)
      }
    },
    created () {
      api.user.getUserInfo().then(results => {
        Object.assign(this.formData, results)
      })
    },
    mounted () {
      $('#city_1').citySelect({
    		nodata: 'none',
    		required: false
    	})
    },
    methods: {
      confirm () {
        const province = this.$refs.prov.value
        const city = this.$refs.city.value
        this.formData.place = [province, city]
        console.log(this.formData.place)
        this.$refs.form.validate(valid =>{
          if (!valid) {
            return
          }
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