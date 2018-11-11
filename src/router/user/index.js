const routers = [{
  name: 'userInfo',
  path: '/user/info',
  component: () => import('@/views/user/info.vue')
}, {
  name: 'modPwd',
  path: '/user/pwd',
  component: () => import('@/views/user/pwdmod.vue')
}]

export default routers
