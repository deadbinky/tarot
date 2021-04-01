import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    spreadType: 'celticcross'
  },
  mutations: {
    changeSpread (state, spreadType) {
      state.spreadType = spreadType
    }
  },
  actions: {
  },
  modules: {
  }
})
