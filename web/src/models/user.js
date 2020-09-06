import { message } from "antd"

export default {
  namespace: "user",
  state: {
    currentUser: {

    },
  },
  effects: {
    *fetchUser(_, { put }) {
      const response = yield put.resolve({
        type: 'api/get',
        payload: {
          url: "/api/v1/user",
        },
      })

      if (response.success) {
        yield put.resolve({
          type: "sync",
          payload: {
            currentUser: response.user || {}
          }
        })
      }
    },

    *signOut(_, { put }) {
      const response = yield put.resolve({
        type: 'api/delete',
        payload: {
          url: "/api/v1/session",
        }
      })

      if (response.success) {
        yield put.resolve({
          type: 'sync',
          payload: {
            currentUser: {},
          }
        })

        message.success(response.message)
        return
      }
    },
  },

  reducers: {
    sync(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    }
  }
}
