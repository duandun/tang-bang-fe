import { fetch } from '@/utils/api';

export function testLogin(params) {
  return fetch('/login', params);
}

export function save(params) {
  if (params.id) {
    return fetch('/contract/update', params, 'POST');
  }
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

export function confirm(params) {
  if (params.editable) {
    return fetch('/contract/confirmUpdate', params, 'POST')
  }
  return fetch('/contract/confirm', params, 'POST');
}

export function confirmDetail(contractId) {
  return fetch('/contract/confirmDetail', {contract_id: contractId})
}

export function assignUser (params) {
  return fetch('/user/changeContractor', params, 'POST')
}

export function downloadFile (params) {
  return fetch('/process/download', params)
}

export function processRecovery (contractId) {
  return fetch('/process/recovery', {contract_id: contractId}, 'POST')
}

// 管理员全局终止
export function processPause (contractId) {
  return fetch('/process/pause', {contract_id: contractId}, 'POST')
}

export function processDefer (contractId) {
  return fetch('/process/defer', {contract_id: contractId}, 'POST')
}
