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
            name: '/signing/list?auth=finance',
            text: '签单确认'
        }, {
            name: '/signing/material',
            text: '材料确认'
        }, {
            name: '/legal/accept',
            text: '法务受理'
        }]
    }],
    openNames: ['/module-a'],
    activeName: ''
}
