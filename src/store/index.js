import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    reading: {},
    readingID: '',
    zodiacSign: '',
    savedReadings: {},
    spreadType: 'celticcross',
    useReversals: true
  },
  mutations: {
    changeSign (state, zodiacSign) {
      state.zodiacSign = zodiacSign
    },
    changeSpread (state, spreadType) {
      console.log('change spread')
      state.spreadType = spreadType
    },
    changeUseReversals (state, useReversals) {
      state.useReversals = useReversals
    },
    createReading (state, id) {
      const spread = state.spreadType
      state.readingID = id
      state.reading.spread = spread
      state.reading.cards = {}
    },
    openReading (state, id) {
      state.readingID = id
      console.log(state.savedReadings[id])
      state.reading = state.savedReadings[id]
      state.spreadType = state.reading.spread
      console.log('open reading', id, state.reading, state.spreadType)
    },
    getSavedReadings (state) {
      const r = localStorage.getItem('savedReadings')
      state.savedReadings = JSON.parse(r)
      console.log('savedReadings', state.savedReadings)
    },
    updateReadingDate (state, date) {
      state.reading.date = date
    },
    updateReading (state, a) {
      const position = a[0]
      state.reading.cards[position] = {}
      state.reading.cards[position].cardkey = a[1]
      state.reading.cards[position].reversed = a[2]
    }
  },
  actions: {
    clearReading (context) {
      for (const prop of Object.getOwnPropertyNames(context.state.reading)) {
        delete context.state.reading[prop]
      }
    },

    removeReading (context) {
      const sr = JSON.parse(localStorage.getItem('savedReadings'))
      const id = context.state.readingID

      delete sr[id]

      const save = JSON.stringify(sr)
      localStorage.setItem('savedReadings', save)
      this.commit('getSavedReadings')
    },

    saveReading (context, p) {
      const id = context.state.readingID
      context.state.reading.title = p.title
      context.state.reading.notes = p.notes

      let r = {}

      const sr = localStorage.getItem('savedReadings')

      if (sr && sr.length > 0) {
        r = JSON.parse(sr)
      }

      r[id] = context.state.reading

      const save = JSON.stringify(r)

      localStorage.setItem('savedReadings', save)
      this.commit('getSavedReadings')
    }
  },
  modules: {
  }
})
