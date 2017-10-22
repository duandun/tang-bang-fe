import { fetch } from '@/utils/api'

export function end (id) {
  return fetch('/process/setResult', { contract_id: id }, 'POST')
}
