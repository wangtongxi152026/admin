import request from '@/utils/request';

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    data: params,
  });
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}


export async function loginAdmin(params) {
  return request("/api/loginAdmin", {
    method: "POST",
    data: params
  });
}

export async function register(params) {
  return request("/api/register", {
    method: "POST",
    data: params
  });
}
