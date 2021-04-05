<template>
  <div class='spread'
    :class='spreadType'
    >
    <Card
      v-for='(card, index) in this.deck.slice(this.split, this.endSplit)'
      :name='cards[card].name'
      :image='cards[card].image'
      :position='index'
      :cardkey='card'
      :key='`${componentKey}-${index}`' />
      <Description />
   </div>
</template>

 <script>
 import Card from '@/components/Card'
 import Description from '@/components/Description'
 import cards from '@/assets/js/cards'
 import spreads from '@/assets/js/spreads'
 import eventBus from '@/assets/js/eventBus'
 import { mapState } from 'vuex'


 export default {
   name: 'Spread',
   components: {
     Card,
     Description
   },
   created () {
    this.c = Object.keys(this.cards)
     eventBus.$on('fireChangeSpread', () => {
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
      console.log(limit)
      return limit
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
  .spread
    align-items: center
    display: grid
    height: 100vh
    justify-content: center
    margin: auto
    overflow: hidden
    max-width: 800px
    position: relative
    width: 100vw

    .card
      margin: 5px auto

    &.pastpresentfuture
      grid-template-columns: repeat(3, 1fr);

    &.celticcross
      grid-template-columns: repeat(4, 1fr);
      //grid-template-columns: repeat(auto-fill, minmax(250px, 1fr))

      .card
        &:nth-child(1)
          grid-column-start: 2
          grid-column-end: 3
          grid-row-start: 2
          grid-row-end: 3

        &:nth-child(2)
          grid-column-start: 2
          grid-column-end: 3
          grid-row-start: 2
          grid-row-end: 3
          transform: rotate(-90deg)

        &:nth-child(3)
          grid-column-start: 1
          grid-column-end: 2
          grid-row-start: 2
          grid-row-end: 3

        &:nth-child(4)
          grid-column-start: 3
          grid-column-end: 4
          grid-row-start: 2
          grid-row-end: 3

        &:nth-child(5)
          grid-column-start: 2
          grid-column-end: 3
          grid-row-start: 1
          grid-row-end: 2

        &:nth-child(6)
          grid-column-start: 2
          grid-column-end: 3
          grid-row-start: 3
          grid-row-end: 4

        &:nth-child(7)
          grid-column-start: 4
          grid-column-end: 5
          grid-row-start: 4
          grid-row-end: 5

        &:nth-child(8)
          grid-column-start: 4
          grid-column-end: 5
          grid-row-start: 3
          grid-row-end: 4

        &:nth-child(9)
          grid-column-start: 4
          grid-column-end: 5
          grid-row-start: 2
          grid-row-end: 3

        &:nth-child(10)
          grid-column-start: 4
          grid-column-end: 5
          grid-row-start: 1
          grid-row-end: 2
</style>
