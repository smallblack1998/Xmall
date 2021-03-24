import Vue from 'vue'
import Vuex from 'vuex'
import {setStore,getStore} from '@/utils/storage';
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    login:false,
    userInfo:null,
    cartList:[],
    showCart:false
  },
  mutations: {
    SHOWCART(state,{showCart}){
      state.showCart=showCart;
    },
    ISLOGIN(state,userInfo){
      state.userInfo = userInfo;
      state.login = true;
      setStore("userInfo",userInfo);
    },
    ADDCART(state,{productId,salePrice,productName,productImageBig,productNum=1}){
      let cart = state.cartList;
      let goods = {
        productId,
        salePrice,
        productName,
        productImageBig
      }
      let flag = true;
      if(cart.length){
        cart.forEach(item => {
          if(item.productId === productId){
            if(item.productNum>0){
              item.productNum +=productNum;
              flag = false;
            }
          }
        })
      }
      if(!cart.length || flag){
        goods.productNum = productNum;
        cart.push(goods);
      }
      state.cartList = cart;
      setStore('buyCart',cart);
    },
    INITBUYCART(state){
      let initCart = getStore('buyCart');
      if(initCart){
        state.cartList = JSON.parse(initCart);
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
