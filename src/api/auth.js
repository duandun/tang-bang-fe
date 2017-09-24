import { fetch } from '@/utils/api'

export function list (params) {
  return fetch('/list', params, 'GET', '/role')
}
