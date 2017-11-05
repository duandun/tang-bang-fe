export const getFormData = (context) => {
  return {
    id: '',
    userName: '',
    nickName: '',
    phone: '',
    province: '',
    city: '',
    department: '',
    place: []
  }
}

const Validator = {
  text (name, trigger, required = true) {
    return { required, trigger, message: `请填写${name}`, type: 'string' }
  }
}

export const getRules = (context) => {
  const rules = {
    nickName: [Validator.text('姓名')],
    phone: [Validator.text('手机号')],
    department: [Validator.text('部门')],
    place: [
      { required: true, message: '请选择省市', trigger: 'change', type: 'array' }
    ]
  }

  return rules
}
