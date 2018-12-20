import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/home'
import Choose from '@/pages/choose'
import parts from '@/pages/parts'
import classify from "@/pages/classify/classify"
import goodDetail from '@/pages/detail/goodDetail'
import change from '@/pages/detail/Change'
import pay from "@/pages/pay/pay"
import success from '@/common/success'
import order from '@/pages/order'
import news from "@/pages/news/news"
import newsDetail from "@/pages/news/newsDetail"
import my from "@/pages/my/my"
import author from"@/pages/author"
Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/home', name: 'Homes', component: Home,meta:{index:1} },
    {path:'/choose',name:'choose',component:Choose},
    {path:"/parts",name:'parts',component:parts},
    { path: '/classify',name:'classify',component:classify},
    {
      path: '/goodDetail',
      name: 'goodDetail',
      component: goodDetail,
      meta:{index:0}
    },
    { path: '/change', name: 'change', component: change },
    {
      path: '/pay',
      name: 'pay',
      component:pay
    },
    {path :'/success', name:"success",component:success},
    {path :'/order',name:'order',component:order},
    {path:'/news',name:'news',component:news},
    {path:'/newsDetail',name:"newsDetail",component:newsDetail},
    {path :'/my', name:"my",component:my},
    {path :'/author', name:"author",component:author},


  ],
  //路由切换页面始终回到最顶部
  // scrollBehavior(to, from, savedPosition) {
  //   return { x: 0, y: 0 }
  // }
})
