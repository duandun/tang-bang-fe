export const getFormData = () => {
  return {
    id: '',
    contract_id: '',
    notice: 'false',
    sign: '不可提交',
    accept: '已受理',
    applicationID: '',
    time: void 0,
    pause: 0
  };
};

export const getRules = (context) => {
  return {
    time: [
      { required: true, message: '请填写时间', trigger: 'change', type: 'date' }
    ]
  }
};
