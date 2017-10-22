const routers = [{
  name: 'authManage',
  path: '/auth/list',
  component: () => import('@/views/auth/list.vue')
}];

export default routers;
