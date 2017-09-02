<template>
  <div id="app">

    <!-- header组件 s -->
    <v-header v-bind:seller="seller"></v-header>
    <!-- header组件 e -->

    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  // 引入header组件
  import header from './component/header/header.vue';

  export default {

    data() {
      return {
        seller: {}
      };
    },

    created() {
      //发送get请求获得商家数据
      this.axios.get('api/seller', {
      })
      .then(response => {
        response = response.data;
        if (response.errno === this.ERR_OK) {
          this.seller = response.data;
        }
      })
      .catch(error => {
        console.log('error:', error);
      });
    },

    // 注册 header 组件
    components: {
      'v-header': header
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mixin.styl"
  #app
    .tab
      width: 100%
      height: 40px
      line-height 40px
      border-1px(rgba(7, 17, 27, 0.1))
      display flex
      .tab-item
        flex: 1
        text-align: center
        & > a
          font-size: 14px
          color: rgb(77, 85, 93)
          display: block
          &.active
            color: rgb(240, 20, 20)
</style>
