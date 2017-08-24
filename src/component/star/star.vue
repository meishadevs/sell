<template>
  <div class="star" :class="starType">
    <span v-for="itemClass in itemClasses" :class="itemClass" class="star-item"></span>
  </div>
</template>

<script type="text/ecmascript-6">

  // 一共有5颗星星
  const LENGTH = 5;

  // 表示全星
  const CLS_ON = 'on';

  // 表示半星
  const CLS_HALF = 'half';

  // 表示没有星星
  const CLS_OFF = 'off';

  export default {

    // 传递到star组件中的参数
    props: {

      // 星星的大小
      size: {
        type: Number
      },

      // 商家的评分
      score: {
        type: Number
      }
    },

    // 计算属性
    computed: {
      starType() {
        return 'star-' + this.size;
      },

      itemClasses() {

        // 创建数组保存每颗星星的状态
        let result = [];

        let score = Math.floor(this.score * 2) / 2;

        // 用于判断是否有半星
        let hasDecimal = score % 1 !== 0;

        // 全星的个数
        let integer = Math.floor(score);

        // 将全星的标志位保存到数组中
        for (let i = 0; i < integer; i++) {
          result.push(CLS_ON);
        }

        // 如果存在半星
        if (hasDecimal) {

          // 将半星的标志位保存到数组中
          result.push(CLS_HALF);
        }

        // 将没有星星的标志位保存到数组中
        while (result.length < LENGTH) {
          result.push(CLS_OFF);
        }

        return result;
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .star
    font-size: 0
    .star-item
      display: inline-block
      background-repeat: no-repeat
    &.star-48
      .star-item
        width: 20px
        height: 20px
        margin-right: 22px
        background-size: 20px 20px
        &:last-child
          margin-right: 0
        &.on
          bg-image('star48_on')
        &.half
          bg-image('star48_half')
        &.off
          bg-image('star48_off')
    &.star-36
      .star-item
        width: 15px
        height: 15px
        margin-right: 6px
        background-size: 15px 15px
        &:last-child
          margin-right: 0
        &.on
          bg-image('star36_on')
        &.half
          bg-image('star36_half')
        &.off
          bg-image('star36_off')
    &.star-24
      .star-item
        width: 10px
        height: 10px
        margin-right: 3px
        background-size: 10px 10px
        &:last-child
          margin-right: 0
        &.on
          bg-image('star24_on')
        &.half
          bg-image('star24_half')
        &.off
          bg-image('star24_off')
</style>
