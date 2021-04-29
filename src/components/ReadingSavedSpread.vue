<template>
  <div class='spread'
    :class='spreadClass'
    >
    <Card
      v-for='(card, index) in this.d'
      :name='cards[card].name'
      :image='cards[card].image'
      :position='index'
      saved='saved'
      :savedReverse='sr[index]'
      :cardkey='card'
      :key='`${componentKey}-${index}`' />

   </div>
</template>

 <script>
 import Card from '@/components/CardSpread'
 import cards from '@/assets/js/cards'
 import spreads from '@/assets/js/spreads'
 //import eventBus from '@/assets/js/eventBus'
 import { mapState } from 'vuex'


 export default {
   name: 'ReadingSavedSpread',
   components: {
     Card
   },
   created () {
     this.readSavedReading()
   },
   mounted () {
     this.$root.$on('readSavedReading', () => {
       this.readSavedReading()
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
    ...mapState(['spreadType', 'reading']),
    spreadClass () {
      const spreadClass = this.spreads[this.spreadType].class
      return spreadClass
    },
    spread () {
      return this.spreads[this.spreadType]
    }
  },
  methods: {
    forceRerender() {
      console.log('force rerender')
      this.componentKey += 1;
    },

    readSavedReading () {
      this.$store.commit('changeShowBookmark', true)

      this.d = []
      this.sr = []

      const c = this.reading.cards
      console.log('readSavedReading', c)

      for (const prop of Object.keys(c)) {
        this.d[prop] = c[prop].cardkey
        this.sr[prop] = c[prop].reversed
      }

      this.forceRerender()
    }
  }
 }
 </script>

<style scoped lang='sass'>
  @import '../assets/sass/spreads'
</style>
