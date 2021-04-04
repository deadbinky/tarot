<template>
  <div class='spread'
    :class='spreadType'
    >
    <Card
      v-for='(card, index) in this.deck.slice(0, this.limit)'
      :name='cards[card].name'
      :image='cards[card].image'
      :position='index'
      :key='card' />
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
     const c = Object.keys(this.cards)
     eventBus.$on('fireChangeSpread', () => {
       this.shuffle(c)
     }),
     this.shuffle(c)
   },
   data () {
     return {
       deck: [],
       cards: cards,
       spreads: spreads,
       descriptionImg: '',
       descriptionName: ''
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
    spread () {
      return this.spreads[this.spreadType]
    }
  },
  methods: {
    shuffle (c) {
      console.log('shuffle')
      this.deck =  c.sort(function(){
        return 0.5 - Math.random()
      })
    }
  }
 }
 </script>

<style scoped lang='sass'>
  .spread
    align-items: center
    display: flex
    justify-content: center
    margin: auto
    position: relative

    &.celticcross
      display: grid
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr))
      max-width: 800px

      .card
        margin: 5px auto
        opacity: .5

        &.flipped + .card
          opacity: 1
          transition: opacity ease-in .5s

        &:nth-child(1)
          opacity: 1
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
