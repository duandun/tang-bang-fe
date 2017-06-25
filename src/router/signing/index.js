const routers = [{
    name: 'signingAdd',
    path: '/signing/add',
    component: resolve => require(['@/views/signing/signing-add.vue'], resolve)
}, {
    name: 'signingList',
    path: '/signing/list',
    component: resolve => require(['@/views/signing/signing-list.vue'], resolve)
}, {
    name: 'legalAccept',
    path: '/legal/accept',
    component: resolve => require(['@/views/legal/legal-accept.vue'], resolve)
}];

export default routers;
