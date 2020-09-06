import { message } from "antd";
import router from 'umi/router';

export default {
  namespace: "UserSignInPage",
  state: {},
  effects: {

    *Login({ payload }, { put }) {
      const { username, password } = payload;

      const response = yield put.resolve({
        type: "api/post",
        payload: {
          url: "/api/v1/session",
          body: {
            username,
            password,
          }
        },
      })

      if (!response.success) {
        message.error(response.message)
        return
      }

      yield put.resolve({ type: "user/fetchUser" })
      router.replace("/")
    },
  },
}
