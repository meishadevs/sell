<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar" alt="">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{ seller.name }}</span>
        </div>
        <div class="description">
          {{ seller.description }}/{{ seller.deliveryTime }}分钟到达
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{ seller.supports[0].description }}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="showDetail()">
        <span class="count">{{ seller.supports.length }}</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper">
      <span class="bulletin-title"></span><span class="bulletin-text">{{ seller.bulletin }}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%" alt="">
    </div>
    <transition name="fade">
      <div v-show="detailShow" class="detail">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{ seller.name }}</h1>
            <div class="star-wrapper">
              <!-- 使用star组件 s -->
              <star :size="48" :score="seller.score"></star>
              <!-- 使用star组件 e -->
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if="seller.supports" class="supports">
              <li class="support-item" v-for="(item,index) in seller.supports">
                <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                <span class="text">{{seller.supports[index].description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p class="content">{{ seller.bulletin }}</p>
            </div>
          </div>
        </div>
        <div class="detail-close" @click="closeDetail()">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">

  // 引入star组件
  import star from '../star/star.vue';

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {

        // 标记不显示弹层
        detailShow: false
      };
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },

    // 方法
    methods: {

      // 显示弹层
      showDetail: function () {
        this.detailShow = true;
      },

      // 关闭弹层
      closeDetail: function () {
        this.detailShow = false;
      }
    },

    // 注册组件
    components: {
      star
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .header
    color: #fff
    background: rgba(7, 17, 27, 0.5)
    overflow: hidden
    position: relative
    .content-wrapper
      padding: 24px 12px 18px 24px
      font-size: 0px
      position: relative
      .avatar
        vertical-align: top
        display: inline-block
        img
          border-radius: 2px
      .content
        margin-left: 16px
        /*font-size: 14px*/
        display: inline-block
        .title
          margin: 2px 0 8px 0
          .brand
            width: 30px
            height: 18px
            bg-image('brand')
            background-size: 30px 18px
            background-repeat: no-repeat
            vertical-align: top
            display: inline-block
          .name
            margin-left: 6px
            line-height: 18px
            font-size: 16px
            font-weight: bold
        .description
          margin-bottom: 10px
          line-height: 12px
          font-size: 12px
        .support
          .icon
            width: 12px
            height: 12px
            margin-right: 4px
            background-size: 12px 12px
            background-repeat: no-repeat
            vertical-align: top
            display: inline-block
            &.decrease
              bg-image('decrease_1')
            &.discount
              bg-image('discount_1')
            &.guarantee
              bg-image('guarantee_1')
            &.invoice
              bg-image('invoice_1')
            &.special
              bg-image('special_1')
        .text
          line-height: 12px
          font-size: 10px
      .support-count
        height: 24px
        line-height: 24px
        padding: 0 8px
        border-radius: 14px
        background: rgba(0, 0, 0, 0.2)
        text-align: center
        position: absolute
        right: 12px;
        bottom: 14px
        .count
          font-size: 10px
          vertical-align: top
        .icon-keyboard_arrow_right
          line-height 24px
          margin-left: 2px
          font-size: 10px
    .bulletin-wrapper
      height: 28px
      line-height: 28px
      padding: 0 22px 0 12px
      background: rgba(7, 17, 27, 0.2)
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
      position: relative
      .bulletin-title
        width: 22px
        height: 12px
        margin-top: 8px
        bg-image('bulletin')
        background-size: 22px 12px
        background-repeat: no-repeat
        vertical-align: top
        display: inline-block
      .bulletin-text
        margin: 0 4px
        font-size: 10px
        vertical-align: top
      .icon-keyboard_arrow_right
        font-size: 10px
        position: absolute
        top: 8px
        right: 12px
    .background
      width: 100%
      height: 100%
      filter: bur(10px)
      z-index: -1
      position: absolute
      top: 0
      left: 0
    .detail
      width: 100%
      height: 100%
      overflow: auto
      z-index: 100
      backdrop-filter: blur(10px)
      opacity: 1
      background: rgba(7, 17, 27, 0.8)
      position: fixed
      top: 0
      left: 0
      &.fade-enter-active, &.fade-leave-active
        transition: all 0.5s
      &.fade-enter, &.fade-leave-active
        opacity: 0
        background: rgba(7, 17, 27, 0)
      .detail-wrapper
        width: 100%
        min-height: 100%
        .detail-main
          margin-top: 64px
          padding-bottom: 64px
          .name
            line-height: 16px
            font-size: 16px
            font-weight: 700
            text-align: center

          .star-wrapper
            margin-top: 18px
            padding: 2px 0
            text-align: center
          .title
            width: 80%
            margin: 28px auto 24px auto
            display: flex
            .line
              border-bottom: 1px solid rgba(255, 255, 255, 0.5)
              flex: 1
              position: relative
              top: -6px
            .text
              padding: 0 12px
              font-weight: 700
              font-size: 14px
          .supports
            width: 80%
            margin: 0 auto
            .support-item
              padding: 0 12px
              margin-bottom: 12px
              font-size: 0px
              &.last-child
                margin-bottom: 0
              .icon
                width: 16px
                height: 16px
                margin-right: 6px
                vertical-align: top
                background-size: 16px 16px
                background-repeat: no-repeat
                display: inline-block
                &.decrease
                  bg-image('decrease_2')
                &.discount
                  bg-image('discount_2')
                &.guarantee
                  bg-image('guarantee_2')
                &.invoice
                  bg-image('invoice_2')
                &.special
                  bg-image('special_2')
              .text
                line-height: 16px
                font-size: 12px
          .bulletin
            width: 80%
            margin: 0 auto
            .content
              padding: 0 12px
              line-height: 24px
              font-size: 12px
      .detail-close
        width: 32px
        height: 32px
        margin: -64px auto 0
        font-size: 32px
        clear: both
        position: relative

</style>
