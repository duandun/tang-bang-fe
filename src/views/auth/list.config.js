import { ACTOR } from '@/constant'
export const getTableColumns = (context) => {
  let columns = [{
    type: 'index',
    width: 60,
    align: 'center'
  }, {
    title: '账号',
    key: 'username'
  }, {
    title: '姓名',
    key: 'nickname'
  }, {
    title: '电话',
    key: 'phone'
  }, {
    title: '权限',
    render: (h, params) => {
      if (params.row.permission) {
        const permission = params.row.permission.split(',')
        const permNames = []
        permission.forEach(i => {
          permNames.push(ACTOR.find(k => k.value === i).label)
        })
        return <span>{permNames.join()}</span>
      }
      return <span></span>
    }
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
        context.userId = params.row.id
        if (params.row.role) {
          context.userRoles = params.row.role.split(',')
        }
      }
      return <i-button type="text" onClick={openDialog} style="color: #2d8cf0;">选择权限</i-button>
    }
  }]
  return columns
}
