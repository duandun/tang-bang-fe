const routers = [{
  name: 'contractAdd',
  path: '/contract/add',
  component: resolve => require(['@/views/contract/contract-add.vue'], resolve)
}, {
  name: 'contractList',
  path: '/contract/list',
  component: resolve => require(['@/views/contract/list.vue'], resolve)
}];

export default routers;
