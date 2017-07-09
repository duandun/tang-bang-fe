import { fetch } from '@/utils/api';

export function testLogin(params) {
  return fetch('/api/login', params);
}

export function save(params) {
  return fetch('/contract/submit', params, 'POST');
}

export function update(params) {
  return fetch('/contract/update', params, 'POST');
}

export function remove(id) {
  return fetch('/contract/delete', { id }, 'POST');
}

export function detail(id) {
  return fetch('/contract/detail', { id });
}

export function list(params) {
  return fetch('/contract/list', params);
}
