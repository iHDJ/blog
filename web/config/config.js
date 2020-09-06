export default {
  routes: [
    {
      path: '/',
      routes: [
        {
          path: "/",
          component: './IndexPage',
        },
        {
          path: "/articles/:id",
          component: "./ArticlePage",
        },
        {
          path: '/sign_in',
          component: './UserSignInPage',
        },
        {
          path: '/sign_up',
          component: './UserSignUpPage',
        },
      ],

      component: "../layouts/index",
    },
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        dynamicImport: false,
        title: 'web',
        dll: false,

        routes: {
          exclude: [
            /models\//,
            /services\//,
            /model\.(t|j)sx?$/,
            /service\.(t|j)sx?$/,
            /components\//,
          ],
        },
      },
    ],
  ],
};
