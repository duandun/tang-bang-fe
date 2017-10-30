import Vue from 'vue'
import App from './views/app'
import router from './router'
import iView from 'iview'
import store from './store/index'
import './styles/main.less'
import { Table, Button, TableColumn, Steps, Step, Popover, Tag, Loading } from 'element-ui'
import moment from 'moment'
moment.locale('zh-cn')
// import 'element-ui/lib/theme-default/index.css'

Vue.use(Table)
Vue.use(Button)
Vue.use(TableColumn)
Vue.use(Steps)
Vue.use(Step)
Vue.use(Popover)
Vue.use(Tag)
Vue.use(Loading.directive)

Vue.use(iView)
Vue.config.productionTip = false

Vue.config.errorHandler = function (err, vm, info) {
  console.error(err)
  console.error(vm)
}

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  next();
});

router.afterEach((to, from, next) => {
  iView.LoadingBar.finish();
  window.scrollTo(0, 0);
});

// 全局扩展 FormItem
Vue.component('FormItem', Vue.component('FormItem').extend({
  mounted () {
    this.$on('on-form-change', () => {
      this.dispatch('iForm', 'change')
    })
  }
}))

/* eslint-disable no-new */
new Vue({
  el: '#app-container',
  http: {
    root: '/root',
    headers: {
      Authorization: 'Base s9a8s9da7a'
    }
  },
  router,
  store,
  template: '<App />',
  components: { App }
})
