<template>
  <div class='spread'>
    <Datepicker
      class='datepicker'
      format='MM dd yyyy'
      @selected='compileLifePath'
      >
      <div slot="afterDateInput" class="calendar-header">
        Enter Your Birthday
      </div>
    </Datepicker>
    <Card
      v-for='(card, index) in this.cardArray'
      :name='cards[card].name'
      :image='cards[card].image'
      :cardArray='cardArray'
      :position='index'
      :cardkey='card'
      :key='card' />
   </div>
</template>

 <script>
 import Card from '@/components/CardLifePath'
 import cards from '@/assets/js/cards'
 import zodiac from '@/assets/js/zodiac'
 import utility from '@/assets/js/utilityFunctions'
 import Datepicker from 'vuejs-datepicker';

 export default {
   name: 'LifePath',
   components: {
     Card,
     Datepicker
   },
   data () {
     return {
       zodiac: zodiac,
       zodiacCard: '',
       lifePathCard1: '',
       lifePathCard2: '',
       lifePathCard3: '',
       cardArray: [],
       yourSign: '',
       month: 0,
       day: 0,
       year: 0,
       cards: cards,
       z: [],
       c: []
     }
   },
   created () {
     this.z = Object.keys(this.zodiac)
     this.c = Object.keys(this.cards).slice(0, 22)
   },
   methods: {
     compileLifePath (date) {
       this.cardArray = []
       this.date = utility.formatDate(date)
       this.month = this.date[0]
       this.day = this.date[1]
       this.year = this.date[2]
       this.zodiacCard = this.getZodiacSign()
       this.getLifePathNumbers()
     },
     getZodiacSign () {
       let card = ''

       for (let v of this.z) {
         let y1 = '/2000'
         let y2 = y1
         let yy = y1

         const sign = this.zodiac[v]
         const ss = sign.start + yy

         if (v === 'capricorn') {
           y2 = '/2001'
           if (this.month == 1) {
             yy = y2
           }
         }

         const se = sign.end + y2
         const cd = this.month + '/' + this.day + yy

         const signStart = new Date(ss)
         const signEnd = new Date(se)
         const compareDate = new Date (cd)

         if ( compareDate >= signStart && compareDate <= signEnd ) {
           this.$store.commit('changeSign', v)
           card = sign.card
           break
         }
       }
       this.cardArray.push(card)
       return card
     },
     getLifePathNumbers () {
       let lpn = 0
       let lpn1 = 0
       const y1 = this.year.slice(0,2)
       const y2 = this.year.slice(2,4)
       const dateArr = [y1, y2, this.month, this.day]

       for (let x of dateArr) {
         lpn += parseInt(x)
       }

       lpn1 = this.getCards(lpn, false, this.lifePathCard1)
       this.getCards(lpn1, true, this.lifePathCard2)

       if (this.lifePathCard3) {
         this.cardArray.push(this.lifePathCard3)
       }
     },
     getCards (n, extrapolate, card) {
         const x = this.getNumber(n, extrapolate)
         card = this.c[+x]
         this.cardArray.push(card)
         return x
     },
     getNumber (n, extrapolate) {
       const length = n.toString().length
       let nn1
       let nn2

       switch (length) {
         case 1:
          nn1 = this.extrapolate(n, extrapolate)
          return nn1
         case 2:
          if (n === 19){
            this.lifePathCard3 = this.c[n]
          }
          nn1 = this.reduce(n)
          nn2 = +nn1[0] + +nn1[1]
          return nn2
         case 3:
          nn1 = this.reduce(n)
          nn2 = +nn1[0] + +nn1[1]
          return this.getNumber(nn2)
       }
     },
     reduce (n) {
       const length = n.toString().length
       let s1 = 1
       let s2 = 2
       if (length > 2) {
         s1 = 2
         s2 = 3
       }
       const n1 = String(n).slice(0,s1)
       const n2 = String(n).slice(s1,s2)
       return [ n1, n2 ]
     },
     extrapolate (n, extrapolate) {
       let newNumber
       if (!extrapolate) {
         newNumber = n
       }
       else {
         const nn = +n - 1
         newNumber = parseInt('1' + nn)
       }
       return newNumber
     }
   }
 }
 </script>

<style scoped lang='sass'>
  @import '../assets/sass/_measurements'

  .spread
    align-items: center
    display: grid
    grid-template-rows: auto 1fr 1fr auto
    grid-template-columns: repeat(2, 1fr)
    justify-content: center
    margin: auto
    max-width: 500px
    position: relative
    vertical-align: middle
    width: 100vw

    .card
      margin: 5px auto
      max-width: 100px
      width: 95%

      &:before
        content: ' '
        display: block
        padding-top: 166%

      &:nth-of-type(2)
        grid-column: 1/3
        grid-row: 2
        width: 47.5%

      &:nth-of-type(3)
        grid-column: 1
        grid-row: 3

      &:nth-of-type(4)
        grid-column: 2
        grid-row: 3

      &:nth-of-type(5)
        grid-column: 1/3
        grid-row: 4
        width: 47.5%
</style>
<style lang='sass'>
  @import '../assets/sass/_colours'

  .vdp-datepicker
    grid-column: 1/3
    grid-row: 1
    margin: auto

    .vdp-datepicker__calendar .cell.selected
      background: $orange
      border-radius: 50px
      color: #fff

    .vdp-datepicker__calendar
      background: $mediumpink
      border: 3px solid $orange
      border-radius: 20px
      color: #fff
      left: -45px
      width: 250px

    .vdp-datepicker__calendar .month, .vdp-datepicker__calendar .year
    min-width: 160px
    width: 33%
    text-transform: uppercase

    .vdp-datepicker__calendar .month
      font-size: 0.7em

    .vdp-datepicker__calendar .year
      font-size: 1em

    .vdp-datepicker__calendar header .next:after
      border-left: 10px solid $brown

    .vdp-datepicker__calendar header .prev:after
      border-right: 10px solid $brown

    .vdp-datepicker__calendar header .prev:not(.disabled):hover, .vdp-datepicker__calendar header .next:not(.disabled):hover, .vdp-datepicker__calendar header .up:not(.disabled):hover
      background: $orange
      border-radius: 20px

    .vdp-datepicker__calendar .cell.selected:hover
      background: $brown

    .vdp-datepicker__calendar .cell:not(.blank):not(.disabled).day:hover, .vdp-datepicker__calendar .cell:not(.blank):not(.disabled).month:hover, .vdp-datepicker__calendar .cell:not(.blank):not(.disabled).year:hover
      border: 1px solid $brown


    .vdp-datepicker__calendar .cell:not(.blank):not(.disabled).day:hover, .vdp-datepicker__calendar .cell:not(.blank):not(.disabled).month:hover, .vdp-datepicker__calendar .cell:not(.blank):not(.disabled).year:hover
      border-color: $orange
      border-radius: 50px

  .calendar-header
    background: $mediumpink
    border-radius: 30px 30px 0 0
    color: #fff
    font-size: .5em
    padding: 5px
    position: absolute
    text-align: center
    text-transform: uppercase
    top: -2em
    width: 160px

  input[type="text"], textarea
    background-color: $orange
    border: 2px solid $mediumpink
    border-radius: 0 0 30px 30px
    color: $mediumpink
    font-family: 'Comfortaa'
    font-size: 1.5em
    font-weight: bold
    padding: 10px 5px 5px 5px
    text-align: center
    width: 160px

    &:focus
      outline: none



</style>
