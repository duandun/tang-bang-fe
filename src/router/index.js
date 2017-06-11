import Vue from 'vue';
import Router from 'vue-router';
import SigningRouters from './signing';

Vue.use(Router)

const routes = [{
    path: '/',
    name: '首页',
    component: resolve => require(['@/views/default'], resolve).default,
    redirect: '/index'
}, {
    path: '/index',
    name: 'index',
    component: resolve => require(['@/views/index'], resolve).default
}, {
    path: '*',
    name: '找不到资源',
    component: resolve => require(['@/eview/components/e-404/e-404.vue'], resolve).default
}, {
    path: '/notFound',
    name: 'notFound',
    component: resolve => require(['@/eview/components/e-404/e-404.vue'], resolve).default
}, {
    path: '/settings',
    name: 'settings',
    component: resolve => require(['@/settings/index.vue'], resolve)
}].concat(
    SigningRouters
);

export default new Router({ routes })
