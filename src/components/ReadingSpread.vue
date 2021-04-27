<template>
  <div class='spread'
    :class='spreadClass'
    >
    <Card
      v-for='(card, index) in this.d'
      :name='cards[card].name'
      :image='cards[card].image'
      :position='index'
      :saved='saved'
      :savedReverse='sr[index]'
      :cardkey='card'
      :key='`${componentKey}-${index}`' />

   </div>
</template>

 <script>
 import Card from '@/components/CardSpread'
 import cards from '@/assets/js/cards'
 import spreads from '@/assets/js/spreads'
 import eventBus from '@/assets/js/eventBus'
 import { mapState } from 'vuex'


 export default {
   name: 'Spread',
   components: {
     Card
   },
   created () {
    this.c = Object.keys(this.cards)
     eventBus.$on('fireChangeSpread', (p) => {
       this.readSavedReading(p)
     })
     eventBus.$on('fireUseReversals', () => {
       this.shuffle(this.c)
     })
   },
   mounted () {
     this.shuffle(this.c)
   },
   data () {
     return {
       c: [],
       d: [],
       sr: [],
       deck: [],
       cards: cards,
       saved: false,
       savedRead: {},
       spreads: spreads,
       clickable: true,
       componentKey: 0
     }
   },
   computed: {
    ...mapState(['spreadType', 'savedReadings']),
    spreadClass () {
      const spreadClass = this.spreads[this.spreadType].class
      return spreadClass
    },
    spread () {
      return this.spreads[this.spreadType]
    }
  },
  methods: {
    shuffle () {
      this.resetReading()

      const x = this.randomizeArray(this.c)
      this.deck = this.randomizeArray(x)

      const l = this.setLimit()
      const s = this.getSplit(l)
      const e = this.getEndSplit(s, l)

      this.d = this.deck.slice(s, e)

      console.log(this.d)
      this.forceRerender()
    },

    resetReading () {
      this.saved = false
      this.sr = []
      this.d = []
      this.savedRead = {}
      this.clickable = true
    },

    randomizeArray (array) {
      return array.sort(function(){
        return 0.5 - Math.random()
      })
    },

    forceRerender() {
      console.log('force rerender')
      this.componentKey += 1;
    },

    setLimit () {
      const s = this.spreads
      const t = this.spreadType
      return s[t].limit
    },

    getSplit (limit) {
      const max = 78 - limit
      const split = Math.floor(Math.random() * max)
      console.log(split)
      return split
    },

    getEndSplit (split, limit) {
      const endSplit = split + limit
      console.log(endSplit)
      return endSplit
    },

    readSavedReading (p) {
      this.saved = false

      if (!p.saved) {
        this.shuffle(this.c)
        return
      }

      this.saved = p.saved

      this.d = []
      this.sr = []
      this.savedRead = this.savedReadings[p.name]

      for (const prop of Object.keys(this.savedRead.cards)) {
        const x = this.savedRead.cards
        this.d[prop] = x[prop].cardkey
        this.sr[prop] = x[prop].reversed
      }

      this.forceRerender()
    }
  }
 }
 </script>

<style scoped lang='sass'>
  @import '../assets/sass/_measurements'

  .spread
    align-items: center
    display: grid
    height: $height100
    justify-content: center
    padding: 10px
    position: relative
    vertical-align: middle
    width: 100%

    .card
      margin: auto
      max-width: 200px
      width: 100%

      &:before
        content: ' '
        display: block
        padding-top: 166%

    &.single
      grid-template-columns: repeat(1, 1fr)

    &.threecard
      grid-template-columns: repeat(3, 1fr)

      .card
        width: 95%

    &.jobinterview
      height: auto
      min-height: auto
      grid-template: repeat(2, 1fr) / repeat(3, 1fr)
      max-width: 600px
      margin: auto

      .card
        margin-bottom: 5px
        width: 95%

        &:nth-child(1)
          grid-column: 1
          grid-row: 1
          left: 55%

        &:nth-child(2)
          grid-column: 2
          grid-row: 1
          left: 55%

        &:nth-child(3)
          grid-column: 1
          grid-row: 2

        &:nth-child(4)
          grid-column: 2
          grid-row: 2

        &:nth-child(5)
          grid-column: 3
          grid-row: 2

    &.horseshoe
      height: auto
      grid-template: repeat(3, 1fr) / repeat(4, 1fr)
      max-width: 600px
      margin: auto

      .card
        width: 95%

        &:nth-child(1)
          grid-column: 1/2
          grid-row: 1/2

        &:nth-child(2)
          grid-column: 1/2
          grid-row: 1/2
          left: 25%
          top: 75%

        &:nth-child(3)
          grid-column: 1/2
          grid-row: 2/3
          left: 55%
          top: 45%

        &:nth-child(4)
          grid-column: 2/3
          grid-row: 3/4
          left: 40%

        &:nth-child(5)
          grid-column: 3/4
          grid-row: 2/3
          left: 25%
          top: 45%

        &:nth-child(6)
          grid-column: 3/4
          grid-row: 1/2
          left: 55%
          top: 75%

        &:nth-child(7)
          grid-column: 4/5
          grid-row: 1/2

    &.celticcross
      height: auto
      grid-template: repeat(4, 1fr) / repeat(4, 1fr)
      max-width: 600px
      margin: auto

      .card
        width: 95%

        &.click:not(.flipped)
          border: 2px solid #fff
          border-radius: 10px

        &:nth-child(1)
          grid-column: 2/3
          grid-row: 2/3
          top: 55%

        &:nth-child(2)
          grid-column: 2/3
          grid-row: 2/3
          top: 73%
          transform: rotate(-90deg)
          z-index: 2
          &.reversed
            transform: rotate(90deg)

        &:nth-child(3)
          grid-column: 1/2
          grid-row: 2/3
          top: 55%

          &.flipped
            z-index: 3

        &:nth-child(4)
          grid-column: 3/4
          grid-row: 2/3
          top: 55%

          &.flipped
            z-index: 3

        &:nth-child(5)
          grid-column: 2/3
          grid-row: 1/2
          top: 55%

        &:nth-child(6)
          grid-column: 2/3
          grid-row: 3/4
          top: 55%

        &:nth-child(7)
          grid-column: 4/5
          grid-row: 4/5

        &:nth-child(8)
          grid-column: 4/5
          grid-row: 3/4

        &:nth-child(9)
          grid-column: 4/5
          grid-row: 2/3

        &:nth-child(10)
          grid-column: 4/5
          grid-row: 1/2
</style>
