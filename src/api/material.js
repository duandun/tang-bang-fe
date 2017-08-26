import { fetch } from '@/utils/api'

// 材料录入和修改
export function save (params) {
  if (params.id) {
    return fetch('/api/material/submit', params, 'POST')
  }
  return fetch('/api/material/submit', params, 'POST')
}

// 材料详情
export function detail (id) {
  return fetch('/api/material/detail', { id })
}

// 材料确认
export function confirm (params) {
  return fetch('/api/material/confirm', params, 'POST')
}
