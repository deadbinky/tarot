<template>
  <div class='spread'
    :class='spreadtype'
    >
    <Card
      v-for='card in this.deck.slice(0, this.limit)'
      :name='cards[card].name'
      :image='cards[card].image'
      :key='cards[card].name' />
      <p>{{ this.spread.name }}</p>
   </div>
</template>

 <script>
 import Card from '@/components/Card'
 import cards from '@/assets/js/cards'
 import spreads from '@/assets/js/spreads'
 import { mapState } from 'vuex'
 import eventBus from '@/assets/js/eventBus'


 export default {
   name: 'Spread',
   components: {
     Card
   },
   created () {
     eventBus.$on('fireChangeSpread', () => {
       this.shuffle()
     }),
     this.shuffle()
   },
   data () {
     return {
       deck: [],
       cards: cards,
       spreads: spreads
     }
   },
   computed: {
    ...mapState(['spreadtype']),
    limit () {
      const s = this.spreads
      const t = this.spreadtype
      const limit = s[t].limit
      console.log(limit)
      return limit
    },
    spread () {
      return this.spreads[this.spreadtype]
    }
  },
  methods: {
    shuffle () {
      console.log('shuffle')
      const c = Object.keys(this.cards)
      this.deck =  c.sort(function(){
        return 0.5 - Math.random()
      })
    }
  }
 }
 </script>
