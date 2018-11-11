export const getFormData = () => {
  return {
    id: '',
    contract_id: '',
    company_name: '',
    commission: '',
    commission_number: void 0,
    remittance: '',
    otherRemittance: '',
    remittance_time: '',
    commissioned_applicant: '',
    deadline: '',
    precautions: '',
    nickname: ''
  };
};

export const getRules = (context) => {
  return {
    contract_id: [
      { required: true, message: '请输入合同编号', trigger: 'change' },
      { max: 80, message: '编号不大于80字', trigger: 'change' }
    ],
    company_name: [
      { required: true, message: '请输入甲方名称', trigger: 'change' },
      { max: 120, message: '名称不大于120字', trigger: 'change' }
    ],
    commission: [
      { required: true, message: '请输入委托事项', trigger: 'change' },
      { max: 120, message: '不大于120字', trigger: 'change' }
    ],
    commission_number: [
      { required: true, message: '请正确输入委托事项数量', trigger: 'change', type: 'integer' },
      { min: 0, trigger: 'change', message: '委托数量不小于0', type: 'integer' }
    ],
    remittance: [
      { required: true, message: '请输入汇款方式', trigger: 'change' },
      { max: 120, message: '不大于120字', trigger: 'change' }
    ],
    remittance_time: [
      { required: true, message: '请选择汇款时间', trigger: 'change', type: 'date' }
    ],
    commissioned_applicant: [
      { required: true, message: '请输入委托事项申请人', trigger: 'change' },
      { max: 120, message: '不大于120字', trigger: 'change' }
    ],
    deadline: [
      { required: true, message: '请选择截止日期', trigger: 'change', type: 'date' }
    ],
    precautions: [
      { required: true, message: '请输入注意事项', trigger: 'change' },
      { max: 120, message: '不大于120字', trigger: 'change' }
    ]
  }
};
