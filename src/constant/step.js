import _ from 'lodash'

const arr = [
  'contract_submit',
  'contract_confirm',
  'material_submit',
  'material_confirm',
  'legal_submit',
  'legal_accept',
  'twice_material',
  'result'
]

function convert2Obj (obj) {
  const mapArr = arr.map(i => i + '_status')
  const newObj = _.sortBy(_.pick(obj, mapArr), arr)
  Object.keys(newObj).forEach(i => {
    newObj[i] === '1' ? (newObj[i] = true) : (newObj[i] = false)
  })
  return newObj
}

export default convert2Obj
