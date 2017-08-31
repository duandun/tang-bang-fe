import { fetch } from '@/utils/api'

// 法务详情
export function detail (contractId) {
  return fetch('/legal/submit/detail', {contract_id: contractId})
}

// 法务提交
export function save (params) {
  return fetch('/legal/submit', params, 'POST')
}

// 法务确认
export function accept (params) {
  return fetch('/legal/accept', params, 'POST')
}

// 法务确认详情
export function acceptDetail (contractId) {
  return fetch('/legal/accept/detail', {contract_id: contractId})
}
