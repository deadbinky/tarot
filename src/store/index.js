import Vue from 'vue'
import Vuex from 'vuex'
import utility from '@/assets/js/utilityFunctions'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    reading: {},
    readingID: '',
    zodiacSign: '',
    component: 'ReadingNewSpread',
    readNewOrSaved: 'new',
    savedReadings: {},
    spreadType: 'celticcross',
    showBookmark: false,
    bookmarkSaved: false,
    showBookmarkNotes: false,
    menuOpen: false,
    descriptionOpen: false,
    useReversals: true,
    currentReversals: true
  },

  mutations: {
    changeSign (state, zodiacSign) {
      state.zodiacSign = zodiacSign
    },

    changeUseReversals (state, useReversals) {
      state.useReversals = useReversals
    },

    changeSpreadType (state, spread) {
      console.log('changing spread', spread)
      state.spreadType = spread
    },

    changeReadingType (state, type) {
      state.readNewOrSaved = type
      state.component = 'Reading' + type + 'Spread'
    },

    openReading (state, id) {
      this.commit( 'changeReadingType', 'Saved' )

      state.readingID = id

      state.reading = state.savedReadings[id]
      state.spreadType = state.reading.spread

      console.log('open reading', id, state.reading, state.spreadType, state.readNewOrSaved)
    },

    getSavedReadings (state) {
      const r = localStorage.getItem('savedReadings')
      state.savedReadings = JSON.parse(r)
      console.log('savedReadings', state.savedReadings)
    },

    updateReading (state, a) {
      const position = a[0]
      state.reading.cards[position] = {}
      state.reading.cards[position].cardkey = a[1]
      state.reading.cards[position].reversed = a[2]
    },

    changeShowDescription (state, x) {
      state.descriptionOpen = x
    },

    changeShowBookmark (state, x) {
      state.showBookmark = x
    },

    changeBookmarkSaved (state, x) {
      state.bookmarkSaved = x
    },

    changeShowBookmarkNotes (state, x) {
      state.showBookmarkNotes = x
    },

    toggleMenu (state) {
      state.menuOpen = !state.menuOpen

      if (state.menuOpen === true) {
        state.descriptionOpen = false
      }
    }
  },
  actions: {
    createReading (context) {
      this.dispatch('clearReading')
      this.dispatch('createReadingID')

      context.state.showBookmark = false
      context.state.showBookmarkNotes = false
      context.state.bookmarkSaved = false

      context.state.reading.spread = context.state.spreadType
      context.state.reading.cards = {}

      context.state.currentReversals = context.state.useReversals
      console.log(context.state.reading)
      
    },

    createReadingID (context) {
      const date = Date()
      const d = utility.formatDate(date)
      const id = d.join('-')

      context.state.readingID = id
      context.state.reading.date = date
    },

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
      console.log(id)

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
