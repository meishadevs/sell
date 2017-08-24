/**
 * 项目的路由文件
 */

// 添加依赖
import Vue from 'vue';
import VueRouter from 'vue-router';

// 引入组件，供路由使用
import goods from '../component/goods/goods.vue';
import ratings from '../component/ratings/ratings.vue';
import seller from '../component/seller/seller.vue';

Vue.use(VueRouter);

export default new VueRouter({
  linkActiveClass: 'active',
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
