import { fetch } from '@/utils/api'

export function save (params) {
  if (params.editable) {
    return fetch('/legal/submit/update', params, 'POST')
  }
  return fetch('/legal/submit', params, 'POST')
}

export function detail (contractId) {
  return fetch('/legal/submit/detail', {contract_id: contractId})
}

export function accept (params) {
  if (params.editable) {
    return fetch('/legal/accept/update', params, 'POST')
  }
  return fetch('/legal/accept', params, 'POST')
}

export function acceptDetail (contractId) {
  return fetch('/legal/accept/detail', {contract_id: contractId})
}
