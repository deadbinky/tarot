import Vue from 'vue'
import Router from 'vue-router'
import Spread from '@/views/Spread'
import LifePath from '@/views/LifePath'
import AllCards from '@/views/AllCards'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Spread',
      component: Spread
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
