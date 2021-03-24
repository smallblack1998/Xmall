import Vue from 'vue'
import VueRouter from 'vue-router'
// import Index from "@/views/Index";
// import Login from "@/views/Login/Index"
// import Home from "@/views/Home/Index";
// import Goods from "@/views/Goods/Index";
// import Thanks from "@/views/Thanks/Index";
// import GoodsDetail from "@/views/GoodsDetail/Index";
// import User from "@/views/User/Index";
const Index = () => import('@/views/Index');
const Login = () => import('@/views/Login/Index');
const Home = () => import('@/views/Home/Index');
const Goods = () => import('@/views/Goods/Index');
const Thanks = () => import('@/views/Thanks/Index');
const GoodsDetail = () => import('@/views/GoodsDetail/Index');
const User = () => import('@/views/User/Index');
Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [
  {
    path: '/',
    redirect: '/home',
    name: 'home',
    component: Index,
    children: [
      {
        path: 'home',
        component: Home
      },
      {
        path: 'goods',
        component: Goods
      },
      {
        path: 'thanks',
        component: Thanks
      },
      {
        path: 'goodsDetail',
        name: 'goodsDetail',
        component: GoodsDetail,

      }
    ]
  },
  {
    path: '/login',
    name: "login",
    component: Login
  },
  {
    path: '/user',
    name:'user',
    component:User,
    meta:{
      auth:true,
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
