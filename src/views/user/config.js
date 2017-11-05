export const getFormData = (context) => {
  return {
    id: '',
    userName: '',
    nickName: '',
    cell_phone: '',
    province: '',
    city: '',
    department: '',
    place: ''
  }
}

const Validator = {
  text (name, trigger, required = true) {
    return { required, trigger, message: `请填写${name}`, type: 'string' }
  }
}

export const getRules = (context) => {
  const validPlace = (context) => (rule, value, cb) => {
    const { formData } = context
    if (!formData.province || !formData.city) {
      return cb(new Error('请选择省市'))
    }
    return cb()
  }
  const rules = {
    nickName: [Validator.text('姓名')],
    cell_phone: [Validator.text('手机号')],
    department: [Validator.text('部门')],
    place: [
      { validator: validPlace(context), trigger: 'change' }
    ]
  }

  return rules
}
