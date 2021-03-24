"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vuex = _interopRequireDefault(require("vuex"));

var _storage = require("@/utils/storage");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_vuex["default"]);

var _default = new _vuex["default"].Store({
  state: {
    login: false,
    userInfo: null,
    cartList: [],
    showCart: false
  },
  mutations: {
    SHOWCART: function SHOWCART(state, _ref) {
      var showCart = _ref.showCart;
      state.showCart = showCart;
    },
    ISLOGIN: function ISLOGIN(state, userInfo) {
      state.userInfo = userInfo;
      state.login = true;
      (0, _storage.setStore)("userInfo", userInfo);
    },
    ADDCART: function ADDCART(state, _ref2) {
      var productId = _ref2.productId,
          salePrice = _ref2.salePrice,
          productName = _ref2.productName,
          productImageBig = _ref2.productImageBig,
          _ref2$productNum = _ref2.productNum,
          productNum = _ref2$productNum === void 0 ? 1 : _ref2$productNum;
      var cart = state.cartList;
      var goods = {
        productId: productId,
        salePrice: salePrice,
        productName: productName,
        productImageBig: productImageBig
      };
      var flag = true;

      if (cart.length) {
        cart.forEach(function (item) {
          if (item.productId === productId) {
            if (item.productNum > 0) {
              item.productNum += productNum;
              flag = false;
            }
          }
        });
      }

      if (!cart.length || flag) {
        goods.productNum = productNum;
        cart.push(goods);
      }

      state.cartList = cart;
      (0, _storage.setStore)('buyCart', cart);
    },
    INITBUYCART: function INITBUYCART(state) {
      var initCart = (0, _storage.getStore)('buyCart');

      if (initCart) {
        state.cartList = JSON.parse(initCart);
      }
    }
  },
  actions: {},
  modules: {}
});

exports["default"] = _default;