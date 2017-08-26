
export const getFormData = () => {
  return {
    id: '',
    contract_id: '',
    material_name: '',
    material_number: void 0,
    receiving_time: '',
    confirmedlist_number: void 0,
    commission_number: void 0,
    application_number: void 0,
    license_number: void 0,
    dismissal: 0
  };
};

export const getRules = (context) => {
  return {
    material_name: [
      { required: true, message: '请输入材料名称', trigger: 'change' }
    ],
    material_number: [
      { required: true, message: '请正确输入材料数量', trigger: 'change', type: 'integer' },
      { min: 0, trigger: 'change', message: '数量不小于0', type: 'integer' }
    ],
    receiving_time: [
      { required: true, message: '请输入接收时间', trigger: 'change', type: 'date' }
    ],
    confirmedlist_number: [
      { required: true, message: '请输入确认单数量', trigger: 'change', type: 'integer' },
      { min: 0, trigger: 'change', message: '数量不小于0', type: 'integer' }
    ],
    commission_number: [
      { required: true, message: '请输入委托书数量', trigger: 'change', type: 'integer' },
      { min: 0, trigger: 'change', message: '数量不小于0', type: 'integer' }
    ],
    application_number: [
      { required: true, message: '请输入申请数量', trigger: 'change', type: 'integer' },
      { min: 0, trigger: 'change', message: '数量不小于0', type: 'integer' }
    ],
    license_number: [
      { required: true, message: '请输入营业执照副本数量', trigger: 'change', type: 'integer' },
      { min: 0, trigger: 'change', message: '数量不小于0', type: 'integer' }
    ]
  }
};
