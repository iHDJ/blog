import request from '@/utils/request';

export default {
  namespace: 'api',
  state: {},
  effects: {
    *get({ payload }, { call }) {
      return yield call(request, payload.url, {
        data: payload.query
      });
    },

    *post({ payload }, { call }) {
      return yield call(request, payload.url, {
        method: 'post',
        data: payload.body
      });
    },

    *put({ payload }, { call }) {
      return yield call(request, payload.url, {
        method: 'put',
        data: payload.body
      });
    },

    *delete({ payload }, { call }) {
      return yield call(request, payload.url, {
        method: 'delete',
        data: payload.query
      });
    },
  },
};
