/**
 * 页面的入口文件
 */

// 引入依赖的文件
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import qs from 'qs';
import config from './common/js/config';
import './common/stylus/index.styl';

//使用插件
Vue.use(config);

Vue.config.productionTip = false;
Vue.prototype.axios = axios;
Vue.prototype.qs = qs;

//创建Vue实例
var app = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
