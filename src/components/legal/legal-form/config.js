export const getFormData = () => {
  return {
    id: '',
    contract_id: '',
    post: '纸质',
    response: false,
    time: ''
  }
}

export const getRules = (context) => {
  return {
    time: [
      { required: true, message: '请输入提交时间', trigger: 'change', type: 'date' }
    ]
  }
}
