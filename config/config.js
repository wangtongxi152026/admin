import defaultSettings from './defaultSettings'; // https://umijs.org/config/

import slash from 'slash2';
import themePluginConfig from './themePluginConfig';
const { pwa } = defaultSettings; // preview.pro.ant.design only do not use in your production ;
// preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。

const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION } = process.env;
const isAntDesignProPreview = ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site';
const plugins = [
  ['umi-plugin-antd-icon-config', {}],
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
      },
      locale: {
        // default false
        enable: true,
        // default zh-CN
        default: 'zh-CN',
        // default true, when it is true, will use `navigator.language` overwrite default
        baseNavigator: true,
      },
      dynamicImport: {
        loadingComponent: './components/PageLoading/index',
        webpackChunkName: true,
        level: 3,
      },
      pwa: pwa
        ? {
            workboxPluginMode: 'InjectManifest',
            workboxOptions: {
              importWorkboxFrom: 'local',
            },
          }
        : false, // default close dll, because issue https://github.com/ant-design/ant-design-pro/issues/4665
      // dll features https://webpack.js.org/plugins/dll-plugin/
      // dll: {
      //   include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
      //   exclude: ['@babel/runtime', 'netlify-lambda'],
      // },
    },
  ],
  [
    'umi-plugin-pro-block',
    {
      moveMock: false,
      moveService: false,
      modifyRequest: true,
      autoAddMenu: true,
    },
  ],
];

if (isAntDesignProPreview) {
  // 针对 preview.pro.ant.design 的 GA 统计代码
  plugins.push([
    'umi-plugin-ga',
    {
      code: 'UA-72788897-6',
    },
  ]);
  plugins.push(['umi-plugin-antd-theme', themePluginConfig]);
}

export default {
  plugins,
  hash: true,
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/zh/guide/router.html
  routes: [
    {
      path: 'test',
      component: '../layouts/test',
    },
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
        {
          name: 'register',
          icon: 'smile',
          path: '/user/register',
          component: './UserRegister',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              redirect: '/welcome',
            },
            {
              path: '/welcome',
              name: 'welcome',
              icon: 'smile',
              component: './Welcome',
            },
            {
              path: '/admin',
              name: 'admin',
              icon: 'crown',
              component: './Admin',
              authority: ['admin'],
            },
            {
              name: '个人设置',
              icon: 'smile',
              path: '/accountsettings',
              component: './AccountSettings',
            },
            {
              path: '/otherUser',
              name: '用户管理',
              icon: 'usergroup-add',
              routes: [
                {
                  path: '/otherUser/list',
                  name: '用户管理',
                  component: './OtherUser/List',
                },
              ],
            },
            {
              path: '/article',
              name: '博文管理',
              icon: 'file-markdown',
              routes: [
                {
                  path: '/article/list',
                  name: '文章管理',
                  component: './Article/List',
                },
                {
                  path: '/article/create',
                  name: '添加文章',
                  component: './Article/ArticleCreate',
                },
                {
                  path: '/article/update',
                  name: '修改文章',
                  hideInMenu:true,
                  component: './Article/ArticleUpdate',
                },
              ],
            },
            {
              path: '/message',
              name: '留言系统',
              icon: 'message', 
                routes: [
                  {
                    path: '/message/list',
                    name: '留言',
                    component: './Message/List',
                  },
                ],
            },
            {
              path: '/tag',
              name: '标签管理',
              icon: 'tags',
              routes: [
                {
                  path: '/tag/list',
                  name: '标签列表',
                  component: './Tag/List',
                },
              ],
            },
            {
              path: '/link',
              name: '友情链接',
              icon: 'link', //   routes: [
              //     {
              //       path: '/link/list',
              //       name: 'list',
              //       component: './Link/List',
              //     },
              //   ],
            },
            {
              path: '/category',
              name: '文章分类',
              icon: 'book',
              routes: [
                {
                  path: '/category/list',
                  name: '分类列表',
                  component: './Category/List',
                },
              ],
            },
            {
              path: '/timeline',
              name: '时间线',
              icon: 'clock-circle',
              routes: [
                {
                  path: '/timeline/list',
                  name: '时间线表',
                  component: './Timeline/List',
                },
              ],
            },
            {
              path: '/project',
              name: '项目简介',
              icon: 'clock-circle', //   routes: [
              //     {
              //       path: '/project/list',
              //       name: 'list',
              //       component: './Project/List',
              //     },
              //   ],
            },
            {
              name: '搜索列表（应用）',
              icon: 'smile',
              path: '/listsearchapplications',
              component: './ListSearchApplications',
            }, // {
            //   name: 'exception',
            //   icon: 'warning',
            //   path: '/exception',
            //   routes: [
            //     // exception
            //     {
            //       path: '/exception/403',
            //       name: 'not-permission',
            //       component: './Exception/403',
            //     },
            //     {
            //       path: '/exception/404',
            //       name: 'not-find',
            //       component: './Exception/404',
            //     },
            //     {
            //       path: '/exception/500',
            //       name: 'server-error',
            //       component: './Exception/500',
            //     },
            //     {
            //       path: '/exception/trigger',
            //       name: 'trigger',
            //       hideInMenu: true,
            //       component: './Exception/TriggerException',
            //     },
            //   ],
            // },
            // {
            //   name: 'account',
            //   icon: 'user',
            //   path: '/account',
            //   routes: [
            //     {
            //       path: '/account/settings',
            //       name: 'settings',
            //       component: './Account/Settings/Info',
            //       routes: [
            //         {
            //           path: '/account/settings',
            //           redirect: '/account/settings/base',
            //         },
            //         {
            //           path: '/account/settings/base',
            //           component: './Account/Settings/BaseView',
            //         },
            //         {
            //           path: '/account/settings/personalLink',
            //           component: './Account/Settings/PersonalLinkView',
            //         },
            //       ],
            //     },
            //   ],
            // },
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
  },
  define: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION:
      ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION || '', // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (context, _, localName) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }

      const match = context.resourcePath.match(/src(.*)/);

      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = slash(antdProPath)
          .split('/')
          .map(a => a.replace(/([A-Z])/g, '-$1'))
          .map(a => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }

      return localName;
    },
  },
  manifest: {
    basePath: '/',
  },
  // chainWebpack: webpackPlugin,
  proxy: {
    // '/api': {
    //   target: 'http://127.0.0.1:3000',
    //   changeOrigin: true,
    //   pathRewrite: {
    //     '^/api': '',
    //   },
    // },
    '/api': {
      target: 'http://127.0.0.1:7001',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    },
  },
};
