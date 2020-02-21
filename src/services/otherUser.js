// 其他用户

import { stringify } from 'qs';
import request from '@/utils/request';

export async function queryUser(params) {
  return request(`/api/getUserList?${stringify(params)}`);
}

export async function addUser(params) {
  return request('/api/addUser', {
    method: 'POST',
    data: params,
  });
}
export async function updateUser(params) {
  return request('/api/updateUser', {
    method: 'POST',
    data: params,
  });
}

export async function delUser(params) {
  return request('/api/delUser', {
    method: 'POST',
    data: params,
  });
}