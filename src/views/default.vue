<template>
  <div class="default-container">
    <h2>{{text}}</h2>
    <router-link to='/module-a/list'>跳转到list</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: '欢迎使用 risk-control',
      content: ''
    }
  },
  components: {
  },
  created() {
  },
  mounted() {

  }
}
</script>
<style lang='less'>
.default-container{
  margin-top:40px;
  text-align:center;
}
</style>
