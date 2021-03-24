<template>
  <div class="w store-content">
    <div class="gray-box">
      <div class="gallery-wrapper">
        <div class="gallery">
          <div class="thumbnail">
            <ul>
              <li v-for="(item,i) in small" :key="i" :class="{on:item===big}" @click="handleClick(item)">
                <img :src="item" >
              </li>
            </ul>
          </div>
          <div class="thumb">
            <div class="big">
              <img :src="big">
            </div>
          </div>
        </div>
      </div>
      <!--右边-->
      <div class="banner">
        <div class="sku-custom-title">
          <h4>{{product.productName}}</h4>
          <h6>
            <span>{{product.subTitle}}</span>
            <span class="price">
              <em>¥</em>
              <i>{{Number(product.salePrice).toFixed(2)}}</i>
            </span>
          </h6>
        </div>
        <div class="num">
          <span class="params-name">数量</span>
          <buy-num @handlerValue='handlerVal'></buy-num>
        </div>
        <div class="buy">
          <el-button type="primary" @click="addCart">加入购物车</el-button>
          <el-button type="danger">现在购买</el-button>
        </div>
      </div>
    </div>
    <!--产品信息-->
    <div class="item-info">
        <m-self title="产品信息">
          <div slot="content" v-if="product.detail">
            <div v-html="product.detail"></div>
          </div>
          <div v-else class="no-info">
            <img src="/static/images/no-data.png">
            <br>该商品暂无内容数据
          </div>
        </m-self>
    </div>
  </div>
</template>

<script>
import BuyNum from '@/components/BuyNum.vue';
import MSelf from '@/components/Self.vue';
import {mapState,mapMutations} from 'vuex';
export default {
  computed: {
    ...mapState(['login','userInfo','cartList','showCart']),
  },
  data() {
    return {
      product:{},
      small:[],
      big:'',
      productNum:0,
    }
  },
  components: {
    BuyNum,
    MSelf
  },
  methods: {
    ...mapMutations(['ADDCART']),
    async addCart(){
      console.log(this.productNum);
      
      if(this.login){
        //用户已登录
        this.$http.post('/api/addCart',{
          userId:getStore('id'),
          productId:this.product.productId,
          productNum:this.productNum
        });
        //已经存储到后端中，将当前的商品存储到store的cartList
        this.ADDCART({
          productId:this.product.productId,
          salePrice:this.product.salePrice,
          productName:this.product.productName,
          productImg:this.big,
          productNum:this.productNum
        })
      }else{
        //如果用户未登录 也要将商品存储到store的cartList
        this.ADDCART({
          productId:this.product.productId,
          salePrice:this.product.salePrice,
          productName:this.product.productName,
          productImg:this.big,
          productNum:this.productNum
        })
      }
    },
    handlerVal(num){
      // console.log(num);
      this.productNum = num;
    },
    handleClick(src){
      this.big = src;
    },
    async getGoodsDetail() {
      try {
        const res = await this.$http.get(`/api/goods/productDet?productId=${this.$route.query.productId}`);
        this.product = res.data;
        // console.log(this.product);
        
        this.small = this.product.productImageSmall;
        this.big = this.small[0];
        // console.log(res);
      } catch (error) {
        console.log(error);
        
      }
      
    }
  },
  created () {
    this.getGoodsDetail();
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/style/mixin";

.store-content {
  clear: both;
  width: 1220px;
  min-height: 600px;
  padding: 0 0 25px;
  margin: 0 auto;
}

.gray-box {
  display: flex;
  padding: 60px;
  margin: 20px 0;
  .gallery-wrapper {
    .gallery {
      display: flex;
      width: 540px;
      .thumbnail {
        li:first-child {
          margin-top: 0px;
        }
        li {
          @include wh(80px);
          margin-top: 10px;
          padding: 12px;
          border: 1px solid #f0f0f0;
          border: 1px solid rgba(0, 0, 0, 0.06);
          border-radius: 5px;
          cursor: pointer;
          &.on {
            padding: 10px;
            border: 3px solid #ccc;
            border: 3px solid rgba(0, 0, 0, 0.2);
          }
          img {
            display: block;
            @include wh(100%);
          }
        }
      }
      .thumb {
        .big {
          margin-left: 20px;
        }
        img {
          display: block;
          @include wh(440px);
        }
      }
    }
  }
  // 右边
  .banner {
    width: 450px;
    margin-left: 10px;
    h4 {
      font-size: 24px;
      line-height: 1.25;
      color: #000;
      margin-bottom: 13px;
    }
    h6 {
      font-size: 14px;
      line-height: 1.5;
      color: #bdbdbd;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .sku-custom-title {
      overflow: hidden;
      padding: 8px 8px 18px 10px;
      position: relative;
    }
    .params-name {
      padding-right: 20px;
      font-size: 14px;
      color: #8d8d8d;
      line-height: 36px;
    }
    .num {
      padding: 29px 0 8px 10px;
      border-top: 1px solid #ebebeb;
      display: flex;
      align-items: center;
    }
    .buy {
      position: relative;
      border-top: 1px solid #ebebeb;
      padding: 30px 0 0 10px;
    }
  }
}

.item-info {
  .gray-box {
    padding: 0;
    display: block;
  }
  .img-item {
    width: 1220px;
    // padding: 1vw;
    text-align: center;
    img {
      width: 100%;
      height: auto;
      display: block;
    }
  }
}

.no-info {
  padding: 200px 0;
  text-align: center;
  font-size: 30px;
}

.price {
  display: block;
  color: #d44d44;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  text-align: right;
  i {
    padding-left: 2px;
    font-size: 24px;
  }
}
</style>