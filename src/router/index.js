/**
 * 项目的路由文件
 */

//引入依赖的库
import Vue from 'vue';
import VueRouter from 'vue-router';

//引入路由组件
import goods from '../component/goods/goods.vue';
import ratings from '../component/ratings/ratings.vue';
import seller from '../component/seller/seller.vue';

Vue.use(VueRouter);

//创建路由实例
export default new VueRouter({
  linkActiveClass: 'active',

  //定义路由
  routes: [
    {
      path: '/',
      component: goods
    },
    {
      path: '/goods',
      name: 'goods',
      component: goods
    },
    {
      path: '/ratings',
      name: 'ratings',
      component: ratings
    },
    {
      path: '/seller',
      name: 'seller',
      component: seller
    }
  ]
});
