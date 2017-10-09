
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
    key: 'email'
  }, {
    title: '状态',
    key: 'status'
  }, {
    title: '角色',
    key: 'role'
  }, {
    title: '省市',
    render: (h, params) => {
      if (params.row.province) {
        return <div>{params.row.province},{params.row.city}</div>
      }
      return <div></div>
    }
  }, {
    title: '部门',
    key: 'department'
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
