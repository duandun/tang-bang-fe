import Vue from 'vue'
import App from './views/app'
import router from './router'
import iView from 'iview'
import store from './store/index'
import './styles/main.less'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

Vue.use(ElementUI)
Vue.use(iView)
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    next();
});

router.afterEach((to, from, next) => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});

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
