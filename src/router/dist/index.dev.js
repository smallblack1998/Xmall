"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// import Index from "@/views/Index";
// import Login from "@/views/Login/Index"
// import Home from "@/views/Home/Index";
// import Goods from "@/views/Goods/Index";
// import Thanks from "@/views/Thanks/Index";
// import GoodsDetail from "@/views/GoodsDetail/Index";
// import User from "@/views/User/Index";
var Index = function Index() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('@/views/Index'));
  });
};

var Login = function Login() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('@/views/Login/Index'));
  });
};

var Home = function Home() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('@/views/Home/Index'));
  });
};

var Goods = function Goods() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('@/views/Goods/Index'));
  });
};

var Thanks = function Thanks() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('@/views/Thanks/Index'));
  });
};

var GoodsDetail = function GoodsDetail() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('@/views/GoodsDetail/Index'));
  });
};

var User = function User() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('@/views/User/Index'));
  });
};

_vue["default"].use(_vueRouter["default"]);

var originalPush = _vueRouter["default"].prototype.push;

_vueRouter["default"].prototype.push = function push(location) {
  return originalPush.call(this, location)["catch"](function (err) {
    return err;
  });
};

var routes = [{
  path: '/',
  redirect: '/home',
  name: 'home',
  component: Index,
  children: [{
    path: 'home',
    component: Home
  }, {
    path: 'goods',
    component: Goods
  }, {
    path: 'thanks',
    component: Thanks
  }, {
    path: 'goodsDetail',
    name: 'goodsDetail',
    component: GoodsDetail
  }]
}, {
  path: '/login',
  name: "login",
  component: Login
}, {
  path: '/user',
  name: 'user',
  component: User,
  meta: {
    auth: true
  }
}];
var router = new _vueRouter["default"]({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes
});
var _default = router;
exports["default"] = _default;