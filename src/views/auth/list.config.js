
export const getTableColumns = (context) => {
  let columns = [{
    type: 'index',
    width: 60,
    align: 'center'
  }, {
    title: '姓名',
    key: 'name'
  }, {
    title: '账号',
    key: 'account'
  }, {
    title: '状态',
    key: 'status'
  }, {
    title: '角色',
    key: 'actor'
  }, {
    title: '操作',
    key: 'action',
    width: 120,
    align: 'center',
    render: (h, params) => {
      const openDialog = () => {
        context.dialog.visible = true
      }
      return <i-button type="text" onClick={openDialog} style="color: #2d8cf0;">选择角色</i-button>
    }
  }]
  return columns
}
