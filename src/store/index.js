import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    spreadType: 'celticcross',
    useReversals: true
  },
  mutations: {
    changeSpread (state, spreadType) {
      state.spreadType = spreadType
    },
    changeUseReversals (state, useReversals) {
      state.useReversals = useReversals
    }
  },
  actions: {
  },
  modules: {
  }
})
