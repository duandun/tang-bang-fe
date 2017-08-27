import { FormHelper, Wrapper, BaseUtils } from '@/utils'
import { TEXT, LIFECYCLE } from '@/constant'
import _ from 'lodash'

const lifecycleMap = BaseUtils.reverseKeyVal(LIFECYCLE)

export default {
  data () {
    return {
            // 表单生命周期
      lifecycle: 0,
      isSaving: false,
      formloading: false,
            // 是否需要watch
      shouldWatch: true,
            // 表单辅助字段
      assist: {},
            // 表单内容
      formData: {},
            // 验证规则
      rules: {}
    }
  },

  beforeRouteLeave (from, to, next) {
    if (this.lifecycle === LIFECYCLE.CHANGED && this.isFormChanged()) {
      this.$Modal.confirm({
        title: '提示',
        content: `<p>${TEXT.NOT_SAVE_WARNING}</p>`,
        okText: '是',
        cancelText: '否',
        onOk: () => {
          next()
        },
        onCancel: () => {
          next(false)
        }
      })
    } else {
      next()
    }
  },

  created () {
    this.prepare().then((contractId) => {
      window.scrollTo(0, 0)
      this.fetchData(true, contractId)
    })
  },

  mounted () {
    this.lifecycle = LIFECYCLE.INITED
  },

  watch: {
    lifecycle (lifecycle) {
      console.log(`lifecycle change to ${lifecycleMap[lifecycle]}`)
    }
  },

  methods: {
        // internal api
    isFormChanged () {
      let changedKeys = []

      for (var key in this.formData) {
        if (this.formData.hasOwnProperty(key)) {
          let newVal = this.formData[key]
          let rawVal = this.rawForm[key]

          if (JSON.stringify(newVal) !== JSON.stringify(rawVal)) {
            changedKeys.push({ key, newVal, rawVal })
          }
        }
      }

      if (changedKeys.length) {
        console.log(changedKeys)
      }
      return changedKeys.length > 0
    },

        /**
         * 初始化表单的前置工作
         */
    prepare () {
      return Promise.resolve(null)
    },

        /**
         * 表单重置前的勾子
         */
    willFormReset () {

    },

        /**
         * 重置表单
         */
    reset () {
      this.willFormReset()

            // 暂时关闭表单验证
      this.$refs.form.fields.forEach(field => {
        field.validateDisabled = true
      })

      FormHelper.resetWith(this.assist, this.getDefaultAssistData())
      FormHelper.resetWith(this.formData, this.getDefaultFormData())

      setTimeout(() => {
        this.didFormReset()

        this.$refs.form.fields.forEach(field => {
          field.validateDisabled = false
        })

        this.lifecycle = LIFECYCLE.READY
      }, 25)
    },

        /**
         * 表单重置后的勾子
         */
    didFormReset () {

    },

        // 默认assist data
    getDefaultAssistData () {
      return {}
    },

        // 默认form data
    getDefaultFormData () {
      return {}
    },

        /**
         * fetch api
         * @return {Promise}
         */
    fetchApi: function () {},

        /**
         * 远程form data合并前的处理
         */
    willDataMerge (results) {

    },

        // internal api
    fetchData: Wrapper.wrapFormLoad(function (isFirst, contractId) {
      if (!isFirst) {
        this.reset()
      }
      let id = this.$route.params.id || this.$route.query.id;
      if (!id) {
        return Promise.resolve(null)
      }
      if (contractId) {
        id = contractId
      }

      if (!this.fetchApi || typeof this.fetchApi !== 'function') {
        return
      }

      return this.fetchApi(id).then((results) => {
        if (!results) {
          return
        }
        this.willDataMerge(results)
        if (results.flag !== false) {
          Object.assign(this.formData, results)
        }
        this.afterDataMerge(results)
      })
    }),

        /**
         * 远程form data合并后的处理
         */
    afterDataMerge (results) {

    },

        /**
         * 提交前的格式化操作
         */
    formatter (formdata) {

    },

        // internal api
    formatBeforeSumbit: function (rawFormData) {
      let formdata = _.cloneDeep(rawFormData)

      this.formatter(formdata)

      for (var field in formdata) {
        if (formdata.hasOwnProperty(field)) {
          if (Array.isArray(formdata[field])) {
            formdata[field] = formdata[field].join()
          }
          if (typeof formdata[field] === 'object') {
            formdata[field] = JSON.stringify(formdata[field])
          }
          if (typeof formdata[field] === 'number' && isNaN(formdata[field])) {
            formdata[field] = void (0)
          }
        }
      }

      return formdata
    },

        /**
         * save api
         * @return {Promise}
         */
    saveForm: function () {},

        // internal api
    submit: Wrapper.wrapSubmit(function () {
      let formdata = this.formatBeforeSumbit(this.formData)
      return this.saveForm(formdata)
                .then((resp) => {
                  this.afterSubmit(resp)
                })
    }),

        /**
         * 表单验证前勾子
         */
    willFormValidate () {
      return Promise.resolve(null)
    },

        /**
         * 表单提交前勾子
         */
    willFormSubmit () {
      return Promise.resolve(null)
    },

    handleSubmit (event, ...rest) {
      this.$emit('willFormValidate')
      this.willFormValidate(...rest).then(() => {
        this.$refs.form.validate((valid) => {
          if (!valid) {
            this.$Message.error(TEXT.FORM_VALIDATE_ERROR)
            return
          }

          this.$emit('willFormSubmit')
          this.willFormSubmit(...rest).then((resp) => {
            this.submit()
          })
        })
      })
    },

        /**
         * 表单保存后勾子
         */
    afterSubmit () {

    }
  }
}
