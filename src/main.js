/**
 * 页面的入口文件
 */

// 引入依赖的文件
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import qs from 'qs';
import './js/config';
import './common/stylus/index.styl';

Vue.config.productionTip = false;
Vue.prototype.axios = axios;
Vue.prototype.qs = qs;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
