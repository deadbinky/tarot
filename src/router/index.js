import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import LifePath from '@/views/LifePath'
import AllCards from '@/views/AllCards'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Spread',
      component: Home
    },
    {
      path: '/allcards',
      name: 'AllCards',
      component: AllCards
    },
    {
      path: '/lifepath',
      name: 'LifePath',
      component: LifePath
    }
  ]
})
