<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  // 函数自执行调节html的大小来试用不同的屏幕，引入直接调用的js不用export，只有试用js里面的方法时试用export，
  // rem加js调节HTML的大小不用于媒体查询
import rem from './rem/rem.js'
export default {
  name: 'app',
   data(){
    return{
      transitionName:''
    }
  }
}
</script>

<style>
 @import 'styles/style.css';
 @import './fon/iconfont.css';
body{
  /* padding-bottom:1.56rem; */
  background: #F4F4F4;
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif; */
}
.mint-swipe-indicator{
  background: #000;
  border: 1px solid black
}
.mint-swipe-indicator.is-active{
  background: #ddd;
}
</style>
