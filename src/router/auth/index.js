const routers = [{
  name: 'authManage',
  path: '/auth/list',
  component: resolve => require(['@/views/auth/list.vue'], resolve)
}];

export default routers;
