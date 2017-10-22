import Vue from 'vue';
import Router from 'vue-router';
import ContractRouters from './contract';
import MaterialRouters from './material';
import AuthRouters from './auth'

Vue.use(Router)

const routes = [{
  path: '/',
  name: '首页',
  component: () => import('@/views/default'),
  redirect: '/contract/list'
}, {
  path: '/index',
  name: 'index',
  component: () => import('@/views/contract/contract-add.vue')
}, {
  path: '/settings',
  name: 'settings',
  component: () => import('@/settings/index.vue')
}].concat(
    ContractRouters,
    MaterialRouters,
    AuthRouters,
  [{
    path: '*',
    name: '找不到资源',
    component: () => import('@/eview/components/e-404/e-404.vue')
  }]
);

export default new Router({ routes })
