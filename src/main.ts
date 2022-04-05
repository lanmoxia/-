import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Nav from '@/components/Nav.vue';
import Layout from '@/components/Layout.vue';
import Icons from '@/components/Icons.vue';
import tagListModel from '@/models/tagListModel';

Vue.config.productionTip = false
Vue.component('Nav', Nav)
Vue.component('Layout',Layout)
Vue.component('Icons', Icons)

// 由于 ledger 和 labels tag 各自为政 把 tagList 提到最顶层 main.js 这里
window.tagList = tagListModel.fetch()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
