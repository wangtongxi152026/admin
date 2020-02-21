import request from '@/utils/request';
export async function query() {
  return request('/api/users');
}

// export async function queryCurrent() {
//   return request("/api/currentUser");
// }

export async function queryNotices() {
  return request('/api/notices');
}

export async function queryCurrent() {
  return request('/api/currentUser', {
    method: 'GET'
  });
}

export async function loginAdmin() {
  return request('/api/loginAdmin', {
    method: 'POST',
    data: params
  });
}
export async function register() {
  return request('/api/register', {
    method: 'POST',
    data: params
  });
}
