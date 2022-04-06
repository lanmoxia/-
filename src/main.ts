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
// 第一步 $store 绑定到 Vue 原型上
Vue.prototype.$store = store
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
