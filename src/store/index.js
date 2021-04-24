import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    component: 'Spread',
    zodiacSign: '',
    spreadType: 'celticcross',
    useReversals: true
  },
  mutations: {
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
