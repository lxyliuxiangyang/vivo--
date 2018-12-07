import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/home'
import success from '../common/success'
Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'Home', component: Home },
    // { path: '/Home', name: 'Home', component: Home,meta:{index:1} },


  ],
  //路由切换页面始终回到最顶部
  // scrollBehavior(to, from, savedPosition) {
  //   return { x: 0, y: 0 }
  // }
})
