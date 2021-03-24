import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import { getStore } from '@/utils/storage';
//使用vue-lazyload
import VueLazyload from "vue-lazyload";
Vue.use(VueLazyload);

Vue.use(VueLazyload, {
  preload: 1.3,
  error: 'static/images/error.png',
  loading: 'static/images/load.gif',
  attempt: 1
})
Vue.config.productionTip = false
//挂载axios到vue的原型，由于继承性，所有的组件都可以使用this.$http
import axios from "axios";
Vue.prototype.$http = axios;
//请求拦截器
axios.interceptors.request.use(config => {
  const token = getStore('token');
  //表示用户已经登录
  if (token) {
    //请求头上的Authorization设置token字段
    config.headers.common['Authorization'] = token;
  }
  return config;
}, error => {
  return Promise.reject(error);
})
//守卫
router.beforeEach((to, from, next) => {
  axios.post('/api/validate', {}).then(res => {
    let data = res.data;
    //用户未登录
    if (data.state !== 1) {
      if (to.matched.some(record => record.meta.auth)) {
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
      store.commit("ISLOGIN", data);
      // console.log(data);
      // console.log();

      // if(to.path === '/login'){
      //   router.push({
      //     path:'/'
      //   })
      // }
      next();
    }
  }).catch(error => {
    console.log(error);
  });

})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
