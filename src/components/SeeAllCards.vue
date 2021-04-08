<template>
  <div class='spread'>
    <Card
      v-for='(card, index) in this.c'
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

 export default {
   name: 'SeeAllCards',
   components: {
     Card
   },
   created () {
    this.c = Object.keys(this.cards)
    console.log(this.c)
   },
   data () {
     return {
       c: [],
       cards: cards
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
    padding-top: 1.15em
    position: relative
    vertical-align: middle
    width: 100vw

    .card
      margin: 5px auto
      max-width: 200px
      width: 95%

      &:before
        content: ' '
        display: block
        padding-top: 166%

      &:nth-child(1),
      &:nth-child(2),
      &:nth-child(3),
      &:nth-child(4)
        grid-row: 1/2

      &:nth-child(5),
      &:nth-child(6),
      &:nth-child(7),
      &:nth-child(8)
        grid-row: 2/3

      &:nth-child(9),
      &:nth-child(10),
      &:nth-child(11),
      &:nth-child(12)
        grid-row: 3/4

      &:nth-child(13),
      &:nth-child(14),
      &:nth-child(15),
      &:nth-child(16)
        grid-row: 4/5

      &:nth-child(17),
      &:nth-child(18),
      &:nth-child(19),
      &:nth-child(20)
        grid-row: 4/5


      &:nth-child(4n + 1)
        grid-column: 1/2

      &:nth-child(4n + 2)
        grid-column: 2/3

      &:nth-child(4n + 3)
        grid-column: 3/4

      &:nth-child(4n + 4)
        grid-column: 4/5

</style>
