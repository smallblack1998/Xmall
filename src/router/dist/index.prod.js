"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _vue=_interopRequireDefault(require("vue")),_vueRouter=_interopRequireDefault(require("vue-router"));function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function _getRequireWildcardCache(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return _getRequireWildcardCache=function(){return e},e}function _interopRequireWildcard(e){if(e&&e.__esModule)return e;if(null===e||"object"!==_typeof(e)&&"function"!=typeof e)return{default:e};var r=_getRequireWildcardCache();if(r&&r.has(e))return r.get(e);var t,o={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var u in e){Object.prototype.hasOwnProperty.call(e,u)&&((t=n?Object.getOwnPropertyDescriptor(e,u):null)&&(t.get||t.set)?Object.defineProperty(o,u,t):o[u]=e[u])}return o.default=e,r&&r.set(e,o),o}var Index=function(){return Promise.resolve().then(function(){return _interopRequireWildcard(require("@/views/Index"))})},Login=function(){return Promise.resolve().then(function(){return _interopRequireWildcard(require("@/views/Login/Index"))})},Home=function(){return Promise.resolve().then(function(){return _interopRequireWildcard(require("@/views/Home/Index"))})},Goods=function(){return Promise.resolve().then(function(){return _interopRequireWildcard(require("@/views/Goods/Index"))})},Thanks=function(){return Promise.resolve().then(function(){return _interopRequireWildcard(require("@/views/Thanks/Index"))})},GoodsDetail=function(){return Promise.resolve().then(function(){return _interopRequireWildcard(require("@/views/GoodsDetail/Index"))})},User=function(){return Promise.resolve().then(function(){return _interopRequireWildcard(require("@/views/User/Index"))})};_vue.default.use(_vueRouter.default);var originalPush=_vueRouter.default.prototype.push;_vueRouter.default.prototype.push=function(e){return originalPush.call(this,e).catch(function(e){return e})};var routes=[{path:"/",redirect:"/home",name:"home",component:Index,children:[{path:"home",component:Home},{path:"goods",component:Goods},{path:"thanks",component:Thanks},{path:"goodsDetail",name:"goodsDetail",component:GoodsDetail}]},{path:"/login",name:"login",component:Login},{path:"/user",name:"user",component:User,meta:{auth:!0}}],router=new _vueRouter.default({mode:"history",base:process.env.BASE_URL,routes:routes}),_default=router;exports.default=router;