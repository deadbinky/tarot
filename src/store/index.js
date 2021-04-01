import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    spreadtype: 'celticcross'
  },
  mutations: {
    changeSpread (state, spreadtype) {
      state.spreadtype = spreadtype
    }
  },
  actions: {
  },
  modules: {
  }
})
