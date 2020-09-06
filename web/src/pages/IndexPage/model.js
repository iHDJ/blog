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

      console.log('response', response);

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

      console.log(response);
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
