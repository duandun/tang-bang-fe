import { fetch } from '@/utils/api'

export function list (params) {
  return fetch('/user/list', params, 'GET')
}
