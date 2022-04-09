import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Nav from '@/components/Nav.vue';
import Layout from '@/components/Layout.vue';
import Icons from '@/components/Icons.vue';

Vue.config.productionTip = false
Vue.component('Nav', Nav)
Vue.component('Layout',Layout)
Vue.component('Icons', Icons)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

 // 移动端进入自动滚动显示底部导航
window.onload = function(){
  setTimeout(function(){
    window.scrollTo(0,1000)
  },0)
}