export const getFormData = (context) => {
  return {
    nickname: '',
    cell_phone: '',
    province: '',
    city: '',
    department: '',
    password: '',
    repassword: '',
    pcArray: []
  }
}

const Validator = {
  text (name, trigger = 'change', required = true) {
    return { required, trigger, message: `请填写${name}`, type: 'string' }
  }
}

export const getRules = (context) => {
  const validPlace = (rule, value, cb) => {
    const { formData } = context
    if (!formData.province || !formData.city) {
      return cb(new Error('请选择省市'))
    }
    return cb()
  }
  const validPassword = (rule, value, cb) => {
    if (value === '') {
      return cb(new Error('请输入密码'))
    } else if (context.formData.repassword !== '' &&
      context.formData.repassword !== undefined) {
      context.$refs.form.validateField('repassword')
    }
    cb()
  }
  const validRePassword = (rule, value, cb) => {
    if (value === '') {
      cb(new Error('请确认密码'))
    } else if (value !== context.formData.password) {
      cb(new Error('两次密码输入不一致'))
    } else {
      cb()
    }
  }
  return {
    nickname: [Validator.text('姓名')],
    cell_phone: [Validator.text('手机号')],
    department: [Validator.text('部门')],
    pcArray: [
      { type: 'array', trigger: 'change', required: true, message: '请选择省市' }
    ],
    password: [
      { validator: validPassword, trigger: 'change', required: true }
    ],
    repassword: [
      { validator: validRePassword, trigger: 'change', required: true }
    ]
  }
}
