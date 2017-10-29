export const getFormData = () => {
  return {
    id: '',
    contract_id: '',
    account: '0',
    date: '',
    information: '0',
    pause: 0,
    pause_reason: '',
    piaoju: '普通发票',
    piaojuTime: ''
  };
};

export const getRules = (context) => {
  return {
    date: [
      { required: true, message: '请输入到账时间', trigger: 'change', type: 'date' }
    ],
    piaojuTime: [
      { required: true, message: '请输入开据时间', trigger: 'change', type: 'date' }
    ]
  }
};
