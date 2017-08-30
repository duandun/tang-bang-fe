import { fetch } from '@/utils/api'

export function save (params) {
  return fetch('/legal/submit', params, 'POST')
}

export function detail (contractId) {
  return fetch('/legal/submit/detail', {contract_id: contractId})
}

export function accept (params) {
  return fetch('/legal/accept', params, 'POST')
}

export function acceptDetail (contractId) {
  return fetch('/legal/accept/detail', {contract_id: contractId})
}
