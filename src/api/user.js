import { fetch } from '@/utils/api'

export function getUserInfo () {
  return fetch('/user/getUserInfo')
}
