<template>
<div class="goodDetail" id="transitionName">
    <Detail-Header title="商品详情"></Detail-Header>
      <div class="goodDetailList">
            <ul style="background: white;">
                <li v-for="(goodDetail,index) in goodDetails" :key="index">
                  <!--商品详情轮播图-->
                    <div class="goodDetaiSwipe">
                        <mt-swipe :auto="4000">
                            <mt-swipe-item v-for="(list,index) in goodDetail.homeSwipe" :key="index">
                                <img :src="list.swipe" alt="图片">
                            </mt-swipe-item>
                        </mt-swipe>
                    </div>
              <!--商品详情介绍-->
                    <div class="goodDetailMain">
                        <div class="gooDetailNumber">商品编号：{{goodDetail.number}}</div>
                        <div class="goodDetailName">{{goodDetail.homeName}}</div>
                        <div style="text-align: justify;font-size: 0.348rem;">
                            <span style="margin-left:-.2rem;color:#FF4B3D;">【{{goodDetail.homeBright}}】</span>
                            {{goodDetail.homeTitle}}
                        </div>
                        <div class="goodDetailColor">{{goodDetail.color}}</div>
                        <div class="goodDetailPaid">￥{{goodDetail.homePrice}}</div>
                    </div>

              <!--商品详情页商品购买数量-->
                    <div class="goodDetailValue">
                        <div class="_Value">购买数量：</div>
                        <div class="_cartNumber" style="margin-left: 2rem;">
                            <a href="javascript:;" @click="jian(index)" class="goodDetailReduce">-</a>
                            <input type="text"   v-model="goodDetail.homeValue" readonly="readonly"/>
                            <a href="javascript:;" @click="jia(index)" class="goodDetailAdd">+</a>
                        </div>
                    </div>

                    <!--详情蚂蚁支付-->
                    <Detail-Layer></Detail-Layer>
                  <!--详情参数-->
                    <div class="goodDetailBox">
                        <mt-navbar v-model="selected" >
                            <mt-tab-item id="tab-container1">图文详情</mt-tab-item>
                            <mt-tab-item id="tab-container2">参数</mt-tab-item>
                        </mt-navbar>


                        <mt-tab-container v-model="selected" swipeable>
                            <mt-tab-container-item id="tab-container1">
                               <div class="goodDetailImg">
                                   <p v-for="Image in goodDetail.Images">
                                       <img v-bind:src="Image.one" alt="详情图片">
                                    </p>
                                </div>

                            </mt-tab-container-item>

                            <mt-tab-container-item id="tab-container2">
                                <div class="peizhi" v-html="goodDetail.homePeizhi"></div>
                            </mt-tab-container-item>
                        </mt-tab-container>

                    </div>
                  <!--详情页底部-->

                    <div class="goodDetailFooter">

                        <div class="left">
                          <!--购物车-->
                            <div class="cart">
                                <div class="cartlength">{{cartlength}}</div>
                                <img src="http://p6563v2ck.bkt.clouddn.com/%E8%B4%AD%E7%89%A9%E8%BD%A6.png" >
                                <span>购物车</span>
                            </div>
                          <!--收藏-->
                            <div class="collection" >
                                <div class="collection-box" @click="addCollection(goodDetail)"  v-show="!ces">
                                    <i class="iconfont icon-collection"></i>
                                    <span>收藏</span>
                                </div>
                                <div class="collection-box" @click="addCollection(goodDetail)"  v-show="ces">
                                    <i class="iconfont icon-shoucangxuanzhong1" style="color:red"></i>
                                    <span style="color:red">取消</span>
                                </div>
                            </div>
                              <!--待修改-->
                            <div class="shop">
                              <img src="http://p6563v2ck.bkt.clouddn.com/%E5%BA%97%E9%93%BA_2.png" >
                              <i class="iconfont icon-xuanzekuangxuanzhong" v-show="false"></i>
                              <i class="iconfont icon-xuanzekuangxuanzhong" v-show="true" style="color:red"></i>
                              <span>店铺</span>
                              </div>

                              </div>
                      <!--右侧-->
                        <div class="rigth">
                          <!--添加购物车-->
                              <div class="add">
                              <a href="javascript:void(0);" @click="add(goodDetail)">加入购物车</a>
                              </div>
                              <div class="purchase">
                              <a href="javascript:void(0);" @click="pay(goodDetail.id,goodDetail.homeValue)">提交订单</a>
                              </div>
                              </div>
                    </div>


                </li>
            </ul>
      </div>
  </div>
</template>

<script >
  // 引入min-ui的各组件
import { Toast,MessageBox,Navbar,TabItem,TabContainer,TabContainerItem } from "mint-ui";
    // vuex引入映射
import { mapGetters, mapMutations, mapState } from "vuex";
import DetailHeader from "./component/DetailHeader";
import DetailLayer from "./component/DetailLayer";
import axios from "axios";
export default {
  name: "goodDetail",
  // 原型上的数据访问时要加this
  data() {
    return {
      active: "1",
      goodDetailHeader: "商品详情",
      selected: "tab-container1",
      goodDetails:[],
      cartlength: 0
    };
  },
  components: {
    DetailHeader,
    DetailLayer
  },
      // 计算属性只能有一个
    computed: {
    // 引入
    ...mapState(
        // ["this.$store.state.carts"],
        ["todos","ces",'collections','carts'],
        // ["this.$store.state.collection"],

    ),
      // VUE new实例代替了所有的属性和方法 也就是 vm.a=vm.$data.a=this.a
   paid: function() {
     var paid = 0;
     for (var i in this.goodDetails) {
       paid += this.goodDetails[i].homeValue * this.goodDetails[i].homePrice;
     }
     return paid;
   }
  },

  mounted() {
    if (this.$store.state.carts != undefined) {
      this.cartlength = this.$store.state.carts.length;
    }

  },

  created() {
    var _this = this;
    // 获取上个页面的传入的参数id
    var id = this.$route.query.id;
    axios.get("/static/ceshi.json").then(res => {
      console.log(res.data.data.home[1])
      for (var i = 0; i < res.data.data.home.length;i++){
        if (res.data.data.home[i].id == id ) {
            _this.goodDetails.push(res.data.data.home[i]);

        }

      }

    });

    axios.get("/static/ceshi.json").then(res => {
      for (var i = 0; i < res.data.data.set.length;i++){
        if (res.data.data.set[i].id == id ) {
            _this.goodDetails.push(res.data.data.set[i]);
        }
      }
    });

  },
  //
  methods: {
    addCollection(index) {
      this.$store.state.ces=!this.$store.state.ces
       var data={
           id:index.id,
           img:index.homeImg,
           name:index.homeName,
           price:index.homePrice
       }
        this.$store.dispatch("setGoods",data)
    },

  //   // 点击按钮时，首先判断该商品是否在购物车已存在，如果存在则不再加入
  //   添加购物车功能
           add: function(index) {
        console.log(index.id);
        // es6新写法find函数，注意参数如果没有找到就是undefined
      var idExist = this.$store.state.carts.find(todo => {
        return todo.id == index.id;
      });

      console.log(this.$store.state.carts)

      if (!idExist) {
        var data = {
          id:index.id,
          name:index.homeName,
          price:index.homePrice,
          value:index.homeValue,
          img:index.homeImg,
          danx1uan: ""
        };
        this.$store.dispatch('setCart', data);
        // this.$store.commit("SET_CARTS",data);
        this.cartlength = this.$store.state.carts.length;
        Toast({
          message: "加入购物车成功！",
          iconClass: "iconfont icon-goumaichenggong-copy",
          duration: 950
        });
      } else {
        MessageBox("提示", "商品已存在购物车");
      }
    },

  //   购买数量加减方法
             jia: function(index) {
        this.goodDetails[index].homeValue++;

      },
              jian: function(index) {
      if (this.goodDetails[index].homeValue == 1) {
        this.goodDetails[index].homeValue = 1;
      } else {
        this.goodDetails[index].homeValue--;
      }
    },
  //   //返回上一级
            fanhui: function() {
      this.$router.go(-1);
    },
    pay: function(id,value) {
        console.log(value)
        this.$router.push({
            path:"pay",
            query:{
                id:id,
                value:value
            }
        })
        // Toast({
        //     message: `成功支付了${this.paid}元`,
        //     iconClass: "iconfont icon-goumaichenggong",
        //     duration: 750
        // });
      // alert(`成功支付了${this.paid}元`)
      // var data = {
      //   id: this.goodDetails[index].id,
      //   name: this.goodDetails[index].homeName,
      //   price: this.goodDetails[index].homePrice,
      //   image: this.goodDetails[index].homeImg,
      //   value: this.goodDetails[index].homeValue,
      //   order: this.goodDetails[index].order,
      //   color: this.goodDetails[index].color,
      //   number: this.goodDetails[index].number
      // };
      // this.$store.commit("addorder", data);

    }
  }
};
</script>

<style lang="stylus" >
// .goodDetail {
// width: 100%;
// height: 100%;
// z-index: 999;
// top: 0;
// left: 0;
// background: white;
// }
.peizhi {
    width: 90%;
    margin: auto;
    div{
        margin-bottom .5rem;
        margin-top .5rem;
    }
    h3 {
        height: 2rem;
        line-height: 2.3rem;
        font-size: 0.5rem;
        border-bottom: 1px solid #ccc;
    }
    span {
        font-size: 0.38rem;
        color: #888;
        margin-top: .3rem;
        display: block;
    }
    p {
         height .55rem
        color: #888;
    }
}

.cartlength {
    width: 15px;
    height: 15px;
    position: absolute;
    top: 1px;
    left: 30px;
    background: #f81301;
    border-radius: 50%;
    text-align: center;
    line-height: 15px;
    color: white;
}

.goodDetailList {
    margin-bottom: 1rem;
    padding-top: 1.45rem;
}

.goodDetailHeader {
    width: 100%;
    z-index: 1;
    height: 1.3rem;
    line-height: 1.3rem;
    font-size: 12px;
    background: white;
    position: fixed;
    box-shadow: 0 0 10px #cecece;
    text-align: center;
    font-size: 0.41rem;
}

.goodDetailHeader i {
    display: block;
    float: left;
    height: 50px;
    padding-left: 0.3rem;
    font-size: 0.71rem;
    color: black;
}

.goodDetaiSwipe {
    height: 8rem;
    margin-top: 3px;
    background: white;
}

.goodDetaiSwipe img {
    width: 70%;
    height: 7rem;
    display: block;
    /* margin-top: 60px; */
    margin: auto;
}

.goodDetailMain {
    /* height: 1.8rem; */
    background: white;
    border-bottom: 1px solid #cecece;
    // border-top: 1px solid #cecece;
    padding: 0.4rem;
    margin-top: -15px;
}

// .goodDetailBox {
// height: 1px;
// }
.goodDetailName {
    color: black;
    font-weight: 400;
    font-size: 0.5rem;
    line-height 1rem
}

.goodDetailPaid {
    color: #f81200;
    font-size: 0.7rem;
    margin-top: 0.1rem;
}

.goodDetailFooter {
    position: fixed;
    width: 100%;
    bottom: 0rem;
    height: 1.2rem;
    background: #F6F4F7;
    border-top: 1px solid #efefef;

    .left {
        width: 45%;
        float: left;
        position: relative;
        font-size: .35rem;
        .cart {
            width: 33%;
            display: flex;
            justify-content: center;
            flex-direction: column;
            float: right;
            position: relative;

            img {
                width: 0.76rem;
                height: 0.7rem;
                display: block;
                margin: auto;
            }

            span {
                text-align: center;
                color: #767676;
            }
        }

        .shop {
            width: 33%;
            display: flex;
            justify-content: center;
            flex-direction: column;
            float: right;

            img {
                width: 0.76rem;
                height: 0.7rem;
                display: block;
                margin: auto;
            }

            span {
                display: block;
                text-align: center;
                color: #767676;
            }
        }

        .collection {
            width: 33%;
            height: 100%;
            display: flex;
            justify-content: center;
            flex-direction: column;
            float: right;
            border-left: 1px solid #ccc;
            border-right: 1px solid #ccc;
            color: #767676;

            .collection-box {
                text-align: center;
                
            }

            i {
                font-size: 0.6rem;
                display: block;
                text-align: center;
            }

            span {
                text-align: center;
            }
        }
    }

    .rigth {
        width: 55%;
        float: right;

        .add {
            a {
                display: block;
                width: 50%;
                height: 1.2rem;
                line-height: 1.2rem;
                text-align: center;
                background: #FF9800;
                color: white;
                font-size: 0.35rem;
                float: left;
            }
        }

        .purchase {
            a {
                float: left;
                display: block;
                width: 50%;
                height: 1.2rem;
                line-height: 1.2rem;
                text-align: center;
                color: white;
                font-size: 0.35rem;
                background: #E3211E;
            }
        }
    }
}

.gooDetailNumber {
    display: none;
}

.add a {
}

.purchase a {
}

.goodDetailImg {
    margin-top: 4px;
    margin-bottom: 6px;
}

.goodDetailImg img {
    width: 100%;
    height: auto;
    display: block;
}

table td {
    font-size: 0.31rem;
    text-align: center;
    color: #000;
}

.goodDetailValue {
    height: 2rem;
    border-bottom: 1px solid #cecece;
    padding: 0.4rem;
}

.goodDetailAdd {
    width: 1rem;
    height: 0.8rem;
    line-height: 0.8rem;
    display: block;
    background: white;
    float: left;
    border: 1px solid #b2b2b2;
    border-left: none;
    text-align: center;
    font-size: 0.5rem;
    color: black;
}

.goodDetailReduce {
    width: 1rem;
    height: 0.8rem;
    line-height: 0.8rem;
    display: block;
    background: white;
    float: left;
    border: 1px solid #b2b2b2;
    border-right: none;
    text-align: center;
    font-size: 0.5rem;
    color: black;
}

._cartNumber input {
    width: 1rem;
    height: 0.8rem;
    line-height: 0.8rem;
    float: left;
    border: 1px solid #b2b2b2;
    text-align: center;
    color: black;
}

._Value {
    float: left;
    margin-top: 0.2rem;
    font-size 0.35rem
}

.goodDetailColor {
    display: none;
}
</style>
