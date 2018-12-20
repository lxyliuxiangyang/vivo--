<template>
<div>
<Classify-Header title="商品分类"></Classify-Header>
  <div class="calssify-con" >
        <div class="calssify-left " ref="wrapper" >
    <ul class="calssify-left-ul" >
      <!--默认index是0-->
      <li v-for="(list,index) in left" :key="index" @click="qiehuan(index)" :class="{active:index===classifyIndex}">
        {{list.name}}
      </li>
    </ul>
  </div>
    <!--右侧-->
        <div class="calssify-rigth "ref="wrapper2" >
          <!--vue中获取节点-->
            <ul class="calssify-left-ul">
                <li v-for="(list,index) in right.rigth_data" :key="index" @click="goDetails(list.id)">
                     <img v-lazy="list.img">
                    <span>{{list.name}}</span>
                </li>
            </ul>
        </div>


    </div>
<v-footer></v-footer>
</div>

</template>

<script>
import ClassifyHeader from "../../common/headerone";
import footer from "../../pages/footer";
import axios from "axios";
import { mapGetters } from "vuex";
import BScroll from 'better-scroll'
export default {

  data() {
    return {
      left: [],
      right: [],
      list: [],
      ce: [],
      key2: "",
      classifyIndex: 0
    };
  },
  components: {
    "v-footer": footer,
    ClassifyHeader
  },
  // 加上点击事件就可以跳转了滚动条
     mounted(){
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.wrapper, {click:true})
          this.scroll = new BScroll(this.$refs.wrapper2, {click:true})
        })
    },
  // computed计算属性
  computed: {
    ...mapGetters(["this.$store.state.sindex"])
  },
  // 钩子函数craated 和 mounted不同初始化周期不一样
  created() {
    var _this = this;

  axios.get("/static/ceshi.json").then(function(res) {
    // console.log(res)
    _this.left = res.data.data.classify.left;
    _this.list = res.data.data.classify.right;
    _this.right = _this.list[0];
})
  },
  methods: {
// 传入的索引
    qiehuan(index) {
      var _this = this;
      _this.classifyIndex = index;
      _this.right = _this.list[index];
    },
    // 详情页
    goDetails(id) {
      console.log(id);
      this.$router.push({
        path: "goodDetail",
        query: { id: id }
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.active {
    border-left: 2px solid;
    background: #ffffff;
    color: #199cfe;
}
    /*flex布局
    要以父元素为基础
    */
.calssify-con {
    display: flex;
    overflow: hidden;
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
    padding-top: 1.45rem;
/*上边有一个固定定位 flex 最后一个值是重新定义宽高*/
    .calssify-left {
        flex: 0 0 2.9rem;
        width: 4rem;
        height: 100%;
        background: #f6f6f6;
        // border-right: 10px solid #f6f6f6;
        margin-bottom: 1.51rem;
        font-size 0.35rem

        li {
            height: 1.3rem;
            line-height: 1.3rem;
            text-align: center;
        }
    }
/*父元素和子元素各有六个属性*/
    .calssify-rigth {
        flex: 1;
        height: 90%;
        background: white;
        margin-bottom: 1.51rem;

        ul {
            display: flex ;
            flex-wrap: wrap;

            li {
                display: flex;
                flex-direction: column;
                text-align: center;
                width: 33%;
                margin-top: 0.3rem;
                font-size: 0.34rem;
                float: left;

                img {
                    width: 1.98rem;
                    display: block;
                    margin: auto;
                }

                span {
                    color: #999;
                    line-height: 0.9rem;
                    font-size: 0.34rem;
                }
            }
        }
    }
}
//  移动端的rem布局
</style>
