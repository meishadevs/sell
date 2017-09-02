
<template>
  <div class="goods">
    <div class="menu-wrapper" v-el:menu-wrapper>
      <ul>
        <li class="menu-item" v-for="item in goods">
          <span class="icon" v-show="item.type > 0" :class="classMap[item.type]"></span>
          <span class="text border-1px">{{ item.name }}</span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" v-el:foods-wrapper>
      <ul>
        <li v-for="item in goods" class="food-list">
          <h1 class="title">{{ item.name }}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item border-1px">
              <div class="icon">
                <img width="57" height="57" :src="food.icon" alt="">
              </div>
              <div class="content">
                <h2 class="name">{{ food.name }}</h2>
                <p class="desc">{{ food.description }}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';

  export default {
    props: {
      seller: {
        type: Object
      }
    },

    data() {
      return {
        goods: []
      };
    },

    created() {

      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];

      //使用axios发送get请求，获得商品的数据
      this.axios.get('/api/goods', {
      })
      .then(response => {
        response = response.data;

        if (response.errno === this.ERR_OK) {
          this.goods = response.data;
          this.$nextTick(() => {
            this._initScroll();
          });
        }
      })
      .catch(error => {
        console.log('error:', error);
      });
    },

    methods: {
      _initScroll() {
        this.menuScroll = new BScroll(this.$els.menuWrapper, {});
        this.foodsScroll = new BScroll(this.$els.foodWrapper, {});
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .goods
    width: 100%
    overflow: hidden
    display: flex
    position: absolute
    top: 174px
    bottom: 46px
    .menu-wrapper
      width: 80px
      background: #f3f5f7
      flex: 0 0 80px
      .menu-item
        width: 56px
        height: 54px
        line-height: 14px
        padding: 0 12px
        display: table
        .icon
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
          vertical-align: top
          display: inline-block
          &.decrease
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')
          &.guarantee
            bg-image('guarantee_3')
          &.invoice
            bg-image('invoice_3')
          &.special
            bg-image('special_3')
        .text
          width: 56px
          font-size: 12px
          border-1px(rgba(7, 17, 27, 0.1))
          vertical-align: middle
          display: table-cell
    .foods-wrapper
      flex: 1
      .title
        height: 26px
        line-height: 26px
        padding-left: 14px
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
        border-left: 2px solid #d9dde1
      .food-item
        margin: 18px
        padding-bottom: 18px
        border-1px(rgba(7, 17, 27, 0.1))
        display: flex
        &:last-child
          margin-bottom: 0
          border-none()
        .icon
          margin-right: 10px
          flex: 0 0 57px
        .content
          flex: 1
          .name
            height: 14px
            line-height: 14px
            margin: 2px 0 8px 0
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            margin-bottom: 8px
          .extra
            &.count
              margin-right: 12px
          .price
            line-height: 24px
            font-weight: 700
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 30, 20)
            .old
              font-size: 10px
              color: rgb(147, 153, 159)
              text-decoration: line-through
</style>
