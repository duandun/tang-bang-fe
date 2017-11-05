const routers = [{
  name: 'userInfo',
  path: '/user/info/:id',
  component: () => import('@/views/user/info.vue')
}]

export default routers
