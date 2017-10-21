import { fetch } from '@/utils/api'

// 材料录入和修改
export function save (params) {
  if (params.id) {
    return fetch('/material/submit', params, 'POST')
  }
  return fetch('/material/submit', params, 'POST')
}

// 材料详情
export function detail (contractId) {
  return fetch('/material/detail', { contract_id: contractId })
}

// 材料确认
export function confirm (params) {
  return fetch('/material/confirm', params, 'POST')
}

// 二次材料提交
export function twice (params) {
  console.log(params)
  return fetch('/twicematerial/submit', params, 'POST')
}

// 二次提交详情
export function twiceDetail (contractId) {
  return fetch('/twicematerial/detail', { contract_id: contractId })
}
