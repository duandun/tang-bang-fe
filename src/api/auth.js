import { fetch } from '@/utils/api'

export function list (params) {
  return fetch('/user/list', params, 'GET')
}

export function logout () {
  return fetch('/user/logout')
}

export function addRole (params) {
  return fetch('/user/addRole', params)
}

export function getUserInfo () {
  return fetch('/user/getUserInfo')
}
