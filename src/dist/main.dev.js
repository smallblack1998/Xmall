"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _App = _interopRequireDefault(require("./App.vue"));

var _router = _interopRequireDefault(require("./router"));

var _store = _interopRequireDefault(require("./store"));

require("./plugins/element.js");

var _storage = require("@/utils/storage");

var _vueLazyload = _interopRequireDefault(require("vue-lazyload"));

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//使用vue-lazyload
_vue["default"].use(_vueLazyload["default"]);

_vue["default"].use(_vueLazyload["default"], {
  preload: 1.3,
  error: 'static/images/error.png',
  loading: 'static/images/load.gif',
  attempt: 1
});

_vue["default"].config.productionTip = false; //挂载axios到vue的原型，由于继承性，所有的组件都可以使用this.$http

_vue["default"].prototype.$http = _axios["default"]; //请求拦截器

_axios["default"].interceptors.request.use(function (config) {
  var token = (0, _storage.getStore)('token'); //表示用户已经登录

  if (token) {
    //请求头上的Authorization设置token字段
    config.headers.common['Authorization'] = token;
  }

  return config;
}, function (error) {
  return Promise.reject(error);
}); //守卫


_router["default"].beforeEach(function (to, from, next) {
  _axios["default"].post('/api/validate', {}).then(function (res) {
    var data = res.data; //用户未登录

    if (data.state !== 1) {
      if (to.matched.some(function (record) {
        return record.meta.auth;
      })) {
        //用户未登录 需要跳转登录页面
        next({
          path: '/login',
          query: {
            redirect: to.fullPath
          }
        });
      }

      next();
    } else {
      //已登录，保存用户信息
      _store["default"].commit("ISLOGIN", data); // console.log(data);
      // console.log();
      // if(to.path === '/login'){
      //   router.push({
      //     path:'/'
      //   })
      // }


      next();
    }
  })["catch"](function (error) {
    console.log(error);
  });
});

new _vue["default"]({
  router: _router["default"],
  store: _store["default"],
  render: function render(h) {
    return h(_App["default"]);
  }
}).$mount('#app');