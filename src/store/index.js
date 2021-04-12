import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    component: 'Spread',
    description: 'Description',
    zodiacSign: '',
    spreadType: 'celticcross',
    useReversals: true
  },
  mutations: {
    changeComponent (state, component) {
      state.component = component
      if (component === 'LifePath') {
        state.description = 'DescriptionLifePath'
        return
      }
      state.description = 'Description'
      console.log(state.component, state.description)
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
