const routers = [{
  name: 'materialAdd',
  path: '/material/add',
  component: resolve => require(['@/views/contract/contract-add.vue'], resolve)
}];

export default routers;
