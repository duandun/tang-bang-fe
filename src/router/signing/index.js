const routers = [{
    name: 'signingAdd',
    path: '/signing/add',
    component: resolve => require(['@/views/signing/signing-add.vue'], resolve)
}, {
    name: 'signingList',
    path: '/signing/list',
    component: resolve => require(['@/views/signing/signing-list.vue'], resolve)
}, {
    name: 'signingMaterial',
    path: '/material/add',
    component: resolve => require(['@/views/signing/signing-material.vue'], resolve)
}, {
    name: 'materialList',
    path: '/material/list',
    component: resolve => require(['@/views/signing/material-list.vue'], resolve)
}, {
    name: 'legalAccept',
    path: '/legal/accept',
    component: resolve => require(['@/views/legal/legal-accept.vue'], resolve)
}, {
    name: 'signingConfirm',
    path: '/signing/confirm',
    component: resolve => require(['@/views/signing/signing-confirm.vue'], resolve)
}];

export default routers;
