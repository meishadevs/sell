<template>
  <div id="app">

    <!-- header组件 s -->
    <v-header></v-header>
    <!-- header组件 e -->

    <div class="tab">
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

<script>
  // 引入header组件
  import header from './component/header/header.vue';

  export default {
    // 注册 header 组件
    components: {
      'v-header': header
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #app
    .tab
      width: 100%
      height: 40px
      line-height 40px
      display flex
      .tab-item
        flex: 1
        text-align: center
</style>
