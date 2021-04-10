import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    component: 'LifePath',
    spreadType: 'celticcross',
    useReversals: true
  },
  mutations: {
    changeComponent (state, component) {
      state.component = component
      console.log(state.component)
    },
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
