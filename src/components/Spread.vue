<template>
  <div class='spread'
    :class='spreadClass'
    >
    <Card
      v-for='(card, index) in this.deck.slice(this.split, this.endSplit)'
      :name='cards[card].name'
      :image='cards[card].image'
      :position='index'
      :cardkey='card'
      :key='`${componentKey}-${index}`' />
   </div>
</template>

 <script>
 import Card from '@/components/Card'
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
     eventBus.$on('fireChangeSpread', () => {
       this.shuffle(this.c)
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
       deck: [],
       cards: cards,
       spreads: spreads,
       clickable: true,
       componentKey: 0
     }
   },
   computed: {
    ...mapState(['spreadType']),
    limit () {
      const s = this.spreads
      const t = this.spreadType
      const limit = s[t].limit
      return limit
    },
    spreadClass () {
      const spreadClass = this.spreads[this.spreadType].class
      return spreadClass
    },
    split () {
      const max = 78 - this.limit
      const split = Math.floor(Math.random() * max)
      return split
    },
    endSplit () {
      const endSplit = this.split + this.limit
      return endSplit
    },
    spread () {
      return this.spreads[this.spreadType]
    }
  },
  methods: {
    shuffle () {
      this.deck =  this.c.sort(function(){
        return 0.5 - Math.random()
      })
      this.forceRerender()
    },
    forceRerender() {
      this.componentKey += 1;
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
    min-height: $height100
    justify-content: center
    max-width: 100%
    padding-top: $bodyPaddingTop
    position: relative
    vertical-align: middle
    width: 100vw

    .card
      margin: 5px auto
      max-width: 200px
      width: 55vw

      &:before
        content: ' '
        display: block
        padding-top: 166%

    &.threecard, &.single
      height: 500px
      min-height: 500px
      margin: auto

    &.threecard
      grid-template-columns: repeat(3, 1fr);

      .card
        width: 30vw

    &.jobinterview
      height: auto
      min-height: auto
      grid-template: repeat(2, 1fr) / repeat(3, 1fr)
      max-width: 600px
      margin: auto

      .card
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
