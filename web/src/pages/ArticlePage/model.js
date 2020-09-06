import { message } from "antd";

export default {
  namespace: "ArticlePage",
  state: {
    article: {},
    tags: [],
    comments: [],
  },
  effects: {
    *getArticle({ payload }, { put }) {
      const { id } = payload;

      const response = yield put.resolve({
        type: "api/get",
        payload: {
          url: `/api/v1/articles/${id}`,
        }
      })

      const { article = {}, tags = [] } = response.data

      yield put.resolve({
        type: 'sync',
        payload: {
          article,
          tags,
        }
      })
    },

    *getComments({ payload }, { put }) {
      const { article_id } = payload;

      const response = yield put.resolve({
        type: "api/get",
        payload: {
          url: `/api/v1/articles/${article_id}/comments`,
        },
      })

      const { users, comments } = response.data;


      yield put.resolve({
        type: 'sync',
        payload: {
          comments: comments.map(comment => {
            return {
              ...comment,
              user: users[comment.user_id] || {},
            }
          })
        }
      })
    },

    *createComment({ payload }, { put }) {
      const { content, article_id } = payload;

      const response = yield put.resolve({
        type: "api/post",
        payload: {
          url: `/api/v1/articles/${article_id}/comments`,
          body: {
            content
          }
        }
      })

      if (!response.success) {
        message.error(response.message)
        return
      }

      message.success(response.message)

      yield put.resolve({
        type: "ArticlePage/getComments",
        payload: {
          article_id,
        }
      })
    },

    *destroyComment({ payload }, { put, select }) {
      const { id } = payload;
      const articleID = yield select(state => state.ArticlePage.article.id)

      const response = yield put.resolve({
        type: "api/delete",
        payload: {
          url: `/api/v1/articles/${articleID}/comments/${id}`
        }
      })

      if (!response.success) {
        message.error(response.message)
        return
      }

      message.success(response.message)

      yield put.resolve({
        type: "ArticlePage/getComments",
        payload: {
          article_id: articleID,
        }
      })
    },
  },

  reducers: {
    sync(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    }
  },
}
