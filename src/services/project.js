import { stringify } from 'qs';
import request from '@/utils/request';

export async function queryProject(params) {
    return request(`/api/getProjectList?${stringify(params)}`);
  }
  
  export async function addProject(params) {
    return request('/api/addProject', {
      method: 'POST',
      body: params,
    });
  }
  export async function delProject(params) {
    return request('/api/delProject', {
      method: 'POST',
      body: params,
    });
  }
  
  export async function updateProject(params) {
    return request('/api/updateProject', {
      method: 'POST',
      body: params,
    });
  }
  
  export async function getProjectDetail(params) {
    return request('/api/getProjectDetail', {
      method: 'POST',
      body: params,
    });
  }