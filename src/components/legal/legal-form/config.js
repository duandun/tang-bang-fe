export const getFormData = () => {
  return {
    id: '',
    contract_id: '',
    post: '纸质',
    response: false,
    posttime: ''
  }
}

export const getRules = (context) => {
  return {
    posttime: [
      { required: true, message: '请输入提交时间', trigger: 'change', type: 'date' }
    ]
  }
}
