import { stringify } from 'querystring';
import { router } from 'umi';
import { fakeAccountLogin, getFakeCaptcha,loginAdmin } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
const Model = {
  namespace: 'login',
  state: {
    status: undefined,
    id:undefined
  },
  effects: {
    *login({ payload }, { call, put }) {
       
      const response = yield call(loginAdmin, payload);
      console.log('response',response);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
       // Login successfully
      if (response.code === 0) {
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;

        if (redirect) {
          const redirectUrlParams = new URL(redirect);

          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);

            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }

        router.replace(redirect || '/');
      }
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },

    logout() {
      const { redirect } = getPageQuery(); // Note: There may be security issues, please note
      setAuthority('')
      if (window.location.pathname !== '/user/login' && !redirect) {
        router.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.data.token);
      return { ...state, status: payload.status, id: payload.data.id };
    },
  },
};
export default Model;
