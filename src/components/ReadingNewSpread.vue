<template>
  <div class='spread'
    :class='spreadClass'>
    <Card
      v-for='(card, index) in this.d'
      :name='cards[card].name'
      :image='cards[card].image'
      :position='index'
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
   name: 'ReadingNewSpread',
   components: {
     Card
   },
   created () {
     this.shuffle()
     eventBus.$on('fireUseReversals', () => {
       this.shuffle()
     })
   },
   mounted () {
     this.$root.$on('reshuffle', () => {
       this.shuffle()
     })
   },
   data () {
     return {
       c: [],
       d: [],
       sr: [],
       deck: [],
       cards: cards,
       spreads: spreads,
       clickable: true,
       componentKey: 0
     }
   },
   computed: {
    ...mapState(['spreadType']),

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
      console.log("SHUFFLE", this.spreadType)

      this.$store.dispatch( 'createReading', this.spreadType )

      this.c = Object.keys(this.cards)
      this.deck = this.randomizeArray(this.c)

      const l = this.setLimit()
      const s = this.getSplit(l)
      const e = this.getEndSplit(s, l)

      this.d = this.deck.slice(s, e)
      console.log(this.d)

      this.forceRerender()
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
    }
  }
 }
 </script>

<style scoped lang='sass'>
  @import '../assets/sass/spreads'
</style>
