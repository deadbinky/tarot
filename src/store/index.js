import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    component: 'Spread',
    description: 'DescriptionCard',
    zodiacSign: '',
    spreadType: 'celticcross',
    useReversals: true
  },
  mutations: {
    changeComponent (state, component) {
      state.component = component

      let d
      switch (component) {
        case 'LifePath':
          d = 'DescriptionLifePath'
          break
        case 'SeeAllCards':
          d = 'DescriptionSeeAllCards'
          break
        default:
          d = 'DescriptionCard'
      }
      console.log(d)
      state.description = d
    },
    changeSpread (state, spreadType) {
      state.spreadType = spreadType
    },
    changeUseReversals (state, useReversals) {
      state.useReversals = useReversals
    },
    changeSign (state, zodiacSign) {
      state.zodiacSign = zodiacSign
    },
  },
  actions: {
  },
  modules: {
  }
})
