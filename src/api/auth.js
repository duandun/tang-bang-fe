import { fetch } from '@/utils/api'

export function list (params) {
  return fetch('/user/list', params, 'GET')
}

export function logout () {
  return fetch('/user/logout')
}

export function addRole (params) {
  console.log(111)
  return fetch('/user/addRole', params)
}

export function getUser (id) {
  return fetch('')
}
