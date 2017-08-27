import Vue from 'vue';
import Router from 'vue-router';
import ContractRouters from './contract';
import MaterialRouters from './material';

Vue.use(Router)

const routes = [{
  path: '/',
  name: '首页',
  component: resolve => require(['@/views/default'], resolve).default,
  redirect: '/contract/add'
}, {
  path: '/index',
  name: 'index',
  component: resolve => require(['@/views/contract/contract-add.vue'], resolve).default
}, {
  path: '/notFound',
  name: 'notFound',
  component: resolve => require(['@/eview/components/e-404/e-404.vue'], resolve).default
}, {
  path: '/settings',
  name: 'settings',
  component: resolve => require(['@/settings/index.vue'], resolve)
}].concat(
    ContractRouters,
    MaterialRouters,
  [{
    path: '*',
    name: '找不到资源',
    component: resolve => require(['@/eview/components/e-404/e-404.vue'], resolve).default
  }]
);

export default new Router({ routes })
