import { message } from "antd";

export default {
  namespace: 'index',
  state: {
    articles: [],
  },
  effects: {
    *getArticles({ payload }, { put }) {
      const response = yield put.resolve({
        type: 'api/get',
        payload: {
          url: '/api/v1/articles',
        },
      });

      yield put.resolve({
        type: 'setArticles',
        payload: {
          articles: response.data,
        },
      });
    },
    *createArticle({ payload }, { put }) {
      const { title, content } = payload;

      const response = yield put.resolve({
        type: 'api/post',
        payload: {
          url: '/api/v1/articles',
          body: {
            title,
            content,
          },
        },
      });

      if (response.success) {
        message.success(response.message)
      }else {
        message.error(response.message)
      }
    },
  },

  reducers: {
    setArticles(state, { payload }) {
      return {
        ...state,
        articles: payload.articles,
      };
    },
  },
};
