export default {
  list: [{
    name: '/contract-manage',
    text: '签单管理',
    children: [{
      name: '/contract/add',
      text: '签单录入'
    }, {
      name: '/contract/list',
      text: '签单列表'
    }]
  }],
  openNames: ['/contract-manage'],
  activeName: ''
}
