import { fetch } from '@/utils/api'

export function getUserInfo () {
  return fetch('/user/getUserInfo')
}

export function updateUserInfo (params) {
  return fetch('/user/changeInformation', params, 'POST')
}
