export default {
    list: [{
        name: '/module-a',
        text: '签单管理',
        children: [{
            name: '/signing/add',
            text: '签单录入'
        }, {
            name: '/signing/list',
            text: '签单列表'
        }, {
            name: '/signing/confirm',
            text: '签单确认'
        }, {
            name: '/material/add',
            text: '材料录入'
        }, {
            name: '/material/list',
            text: '材料列表'
        }, {
            name: '/legal/accept',
            text: '法务受理'
        }]
    }],
    openNames: ['/module-a'],
    activeName: ''
}
