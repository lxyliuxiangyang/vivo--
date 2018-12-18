import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/home'
import Choose from '@/pages/choose'
import parts from '@/pages/parts'
import classify from "@/pages/classify/classify"
import goodDetail from '@/pages/detail/goodDetail'
import change from '@/pages/detail/Change'
import pay from "@/pages/pay/pay"
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
    }


  ],
  //路由切换页面始终回到最顶部
  // scrollBehavior(to, from, savedPosition) {
  //   return { x: 0, y: 0 }
  // }
})
