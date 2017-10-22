const routers = [{
  name: 'contractAdd',
  path: '/contract/add',
  component: () => import('@/views/contract/contract-add.vue')
}, {
  name: 'contractList',
  path: '/contract/list',
  component: () => import('@/views/contract/list.vue')
}];

export default routers;
