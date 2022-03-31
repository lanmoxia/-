import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Ledger from '@/views/Ledger.vue';
import Statistics from '@/views/Statistics.vue';
import NotFount from '@/views/NotFount.vue';
import Labels from '@/views/Labels.vue';
import EditLabel from '@/views/EditLabel.vue';
Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/ledger'
  },
  {
    path: '/ledger',
    component: Ledger
  },
  {
    path: '/labels',
    component: Labels
  },
  {
    path: '/labels/edit/:id',
    component: EditLabel
  },
  {
    path: '/statistics',
    component: Statistics
  },
  {
    path: '*',
    component: NotFount
  },
]

const router = new VueRouter({
  routes
})

export default router
