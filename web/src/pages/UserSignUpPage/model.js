import { message } from "antd";
import router from 'umi/router';

export default {
  namespace: "UserSignUpPage",
  state: {},
  effects: {

    *Register({ payload }, { put }) {
      const { username, password } = payload;

      const response = yield put.resolve({
        type: "api/post",
        payload: {
          url: "/api/v1/user",
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

      router.replace("/")
    },
  },
}
