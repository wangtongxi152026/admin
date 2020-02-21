import { stringify } from 'qs';
import request from '@/utils/request';

export async function queryArticle(params) {
  console.log('api queryArticle',params);
  return request(`/api/getArticleListAdmin?${stringify(params)}`);
}

export async function addArticle(params) {
  console.log(params);
  return request('/api/addArticle', {
    method: 'POST',
    data: params,
  });
}
export async function delArticle(params) {
  return request('/api/delArticle', {
    method: 'POST',
    data: params,
  });
}

export async function updateArticle(params) {
  return request('/api/updateArticle', {
    method: 'POST',
    data: params,
  });
}

export async function getArticleDetail(params) {
  return request('/api/getArticleDetail', {
    method: 'POST',
    data: params,
  });
}

// 管理一级评论
export async function changeComment(params) {
  return request('/api/changeComment', {
    method: 'POST',
    data: params,
  });
}

// 管理第三者评论
export async function changeThirdComment(params) {
  return request('/api/changeThirdComment', {
    method: 'POST',
    data: params,
  });
}
