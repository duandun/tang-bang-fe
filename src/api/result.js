import { fetch } from '@/utils/api'

export function end (id) {
  return fetch('/process/setResult', { contract_id: id }, 'POST')
}

export function finishProcess(id) {
  return fetch('/process/finished', { contract_id: id }, 'POST');
}
