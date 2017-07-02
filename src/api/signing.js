import { fetch } from '@/utils/api';

export function testLogin(params) {
  return fetch('/api/login', params);
}
