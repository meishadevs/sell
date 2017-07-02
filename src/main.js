/**
 * 页面的入口文件
 */

// 依赖的文件
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// 实例化了一个Vue实例
/* eslint-disable no-new */
new Vue({
  // 挂载点
  el: '#app',
  template: '<App/>',

  // 注册了一个App组件
  components: { App }
});
