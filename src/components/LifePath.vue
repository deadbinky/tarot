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
      :position='index'
      :cardkey='card'
      :key='card' />
   </div>
</template>

 <script>
 import Card from '@/components/Card'
 import cards from '@/assets/js/cards'
 import zodiac from '@/assets/js/zodiac'
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
       this.date = this.formatDate(date)
       this.zodiacCard = this.getZodiacSign()
       this.getLifePathNumbers()
     },
     formatDate (date) {
       const d = new Date(date)
       const f = new Intl.DateTimeFormat('en').format(d)
       const a = f.split('/')
       this.month = a[0]
       this.day = a[1]
       this.year = a[2]
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

         //console.log(ss, se)
         const signStart = new Date(ss)
         const signEnd = new Date(se)
         const compareDate = new Date (cd)

         if ( compareDate >= signStart && compareDate <= signEnd ) {
           console.clear()
           console.log('your birthday is', this.month, '/', this.day, 'you are', v, 'your card is', sign.card)
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
    grid-template-rows: auto 1fr 1fr
    grid-template-columns: repeat(3, 1fr)
    justify-content: center
    margin: auto
    padding-top: 0
    max-width: 500px
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

      &:nth-of-type(2)
        grid-column: 2
        grid-row: 2

      &:nth-of-type(3)
        grid-column: 1
        grid-row: 3

      &:nth-of-type(4)
        grid-column: 3
        grid-row: 3

      &:nth-of-type(5)
        grid-column: 2
        grid-row: 3
</style>
<style lang='sass'>
  @import '../assets/sass/_colours'

  .vdp-datepicker
    grid-column: 2
    grid-row: 1

    .vdp-datepicker__calendar .cell.selected
      background: $mediumpink
      color: #fff

    .vdp-datepicker__calendar .cell:not(.blank):not(.disabled).day:hover, .vdp-datepicker__calendar .cell:not(.blank):not(.disabled).month:hover, .vdp-datepicker__calendar .cell:not(.blank):not(.disabled).year:hover
      border-color: $mediumpink

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

  input[type="text"]
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
