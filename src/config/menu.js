export default {
    list: [{
        name: '/signing-manage',
        text: '签单管理',
        children: [{
            name: '/signing/add',
            text: '签单录入'
        }, {
            name: '/signing/list',
            text: '签单列表'
        }, {
            name: '/legal/accept',
            text: '法务受理'
        }]
    }],
    openNames: ['/signing-manage'],
    activeName: ''
}
