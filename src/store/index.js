import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    spreadType: 'single',
    useReversals: true
  },
  mutations: {
    changeSpread (state, spreadType) {
      state.spreadType = spreadType
      console.log('store: changing spread type:', state.spreadType)
    },
    changeUseReversals (state, useReversals) {
      state.useReversals = useReversals
      console.log('store: changing useReversals:', state.useReversals)
    }
  },
  actions: {
  },
  modules: {
  }
})
