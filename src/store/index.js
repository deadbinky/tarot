import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    reading: {},
    readingID: '',
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
    createReading (state, id) {
      const spread = state.spreadType
      state.readingID = id
      console.log(spread, state.reading)
      state.reading[spread] = {}
      state.reading[spread].cards = {}
      console.log('HOLUP',state.reading)
    },
    updateReadingDate (state, date) {
      const spread = state.spreadType
      state.reading[spread].date = date
    },
    updateReading (state, a) {
      const spread = state.spreadType
      const position = a[0]
      state.reading[spread].cards[position] = {}
      state.reading[spread].cards[position].cardkey = a[1]
      state.reading[spread].cards[position].reversed = a[2]
    }
  },
  actions: {
    clearReading (context) {
      for (const prop of Object.getOwnPropertyNames(context.state.reading)) {
        delete context.state.reading[prop]
      }
    },

    removeReading (context) {
      const sr = localStorage.getItem('savedReadings')
      const id = context.state.readingID

      delete sr[id]

      const save = JSON.stringify(sr)
      localStorage.setItem('savedReadings', save)
    },

    saveReading (context) {
      const id = context.state.readingID

      let r = {}

      const sr = localStorage.getItem('savedReadings')

      if (sr && sr.length > 0) {
        r = JSON.parse(sr)
      }

      r[id] = context.state.reading

      const save = JSON.stringify(r)

      localStorage.setItem('savedReadings', save)

      console.log('store save reading', JSON.parse(localStorage.getItem('savedReadings')))

      console.log(context.state.reading)
    }
  },
  modules: {
  }
})
