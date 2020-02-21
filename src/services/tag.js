import { stringify } from 'qs';
import request from '@/utils/request';

export async function queryTag(params) {
  return request(`/api/getTagList?${stringify(params)}`);
}

export async function addTag(params) {
  return request('/api/addTag', {
    method: 'POST',
    data: params,
  });
}

export async function delTag(params) {
  return request('/api/delTag', {
    method: 'POST',
    data: params,
  });
}
