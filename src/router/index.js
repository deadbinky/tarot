import Vue from 'vue'
import Router from 'vue-router'
import Spread from '@/views/Spread'
import LifePath from '@/views/LifePath'
import AllCards from '@/views/AllCards'
import Patterns from '@/views/Patterns'

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
      path: '/patterns',
      name: 'Patterns',
      component: Patterns
    },
    {
      path: '/lifepath',
      name: 'LifePath',
      component: LifePath
    }
  ]
})
