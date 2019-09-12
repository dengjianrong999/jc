// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import echarts from 'echarts'


import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.min.js';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


// import 'swiper/dist/css/swiper.css';

Vue.use(ElementUI);
//过滤时间
Vue.filter('time', function(value) {
  if(!value)return;
  return value.slice(0,10);
});
// /axios配置/
import axios from 'axios'
Vue.prototype.$http = axios,
// Vue.prototype.baseurl = 'http://192.168.4.20:8080/bjsy-jdc/fs/',
// Vue.prototype.baseurl = 'http://183.6.158.26:8090/bjsy-jdc/fs/',
// Vue.prototype.baseurl = 'http://124.42.41.43:9001/bjsy-jdc/fs/',
Vue.prototype.baseurl = 'http://117.121.97.120:9001/bjsy-jdc/fs/',
axios.defaults.withCredentials = true ,
Vue.config.productionTip = false,

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
