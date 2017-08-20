/**
 * 页面的入口文件
 */

// 引入依赖的文件
import Vue from 'vue';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
