<template>
  <div class='spread'
    :class="{ 'description-open': descriptionOpen }">
    <Card
      v-for='(card, index) in this.c'
      :id='card'
      :name='cards[card].name'
      :image='cards[card].image'
      :position='index'
      :cardkey='card'
      :key='index' />
   </div>
</template>

 <script>
 import Card from '@/components/Card'
 import cards from '@/assets/js/cards'
 import eventBus from '@/assets/js/eventBus'

 export default {
   name: 'SeeAllCards',
   components: {
     Card
   },
   created () {
    this.c = Object.keys(this.cards)
    eventBus.$on('fireDescribeCard', () => {
      this.toggleDescription()
    })
    eventBus.$on('fireDismissDescription', () => {
      this.toggleDescription()
    })
   },
   data () {
     return {
       c: [],
       cards: cards,
       y: 0,
       descriptionOpen: false,
     }
   },
   methods: {
     toggleDescription () {
       this.descriptionOpen = !this.descriptionOpen
       this.getPosition()
     },

     getPosition () {
       if (window.innerWidth > 520 ) {
         return
       }
       if (this.descriptionOpen) {
         this.y = window.scrollY
       }
       else {
         this.$nextTick(() => window.scrollTo(0, this.y))
       }
     }
   }
 }
 </script>

<style scoped lang='sass'>
  @import '../assets/sass/_measurements'

  .spread
    align-items: center
    display: grid
    grid-template: repeat(20, 1fr) / repeat(4, 1fr)
    height: auto
    min-height: $height100
    justify-content: center
    margin: auto
    max-width: 600px
    padding-top: $bodyPaddingTop
    position: relative
    vertical-align: middle
    width: 95vw

    .card
      margin: 5px auto
      max-width: 200px
      width: 95%

      &:before
        content: ' '
        display: block
        padding-top: 166%

  @media (max-width: 520px)
    .spread.description-open
      height: 0
      opacity: 0
      overflow: hidden

      transition: opacity 0.5s ease-in, height 0s 1.5s

</style>
