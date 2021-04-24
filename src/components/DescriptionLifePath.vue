<template>
  <Description>
    <template v-slot:header>
      <h2>Zodiac and Life Path Cards</h2>
    </template>
    <template v-slot:card>
      <div class='card' id='zodiac-card'>
        <img :src='imgs[0]'/>
      </div>
      <div class='card' id='lifepath-card1'>
        <img :src='imgs[1]'/>
      </div>
      <div class='card' id='lifepath-card2'>
        <img :src='imgs[2]'/>
      </div>
      <div class='card' v-if='imgs[3]' id='lifepath-card3'>
        <img :src='imgs[3]'/>
      </div>
    </template>
    <template v-slot:content>
      <h3>
        {{ zodiacSign }} & {{ zodiacName }}
      </h3>
        <p>{{ zodiacDescription }}</p>

      <h3>
        {{ lifePathName }}
      </h3>
      <p>{{ lifePathDescription }}</p>
    </template>
  </Description>
</template>

<script>
import Description from '@/components/Description'
import cards from '@/assets/js/cards'
import lifepath from '@/assets/js/lifepath'
import eventBus from '@/assets/js/eventBus'
import utility from '@/assets/js/utilityFunctions'
import { mapState } from 'vuex'

export default {
  name: 'DescriptionLifePath',
  data () {
    return {
      card: {},
      cards: cards,
      imgs: [],
      lifepath: lifepath,
      lifePathName: '',
      zodiacDescription: '',
      lifePathDescription: '',
      zodiacName: ''
    }
  },
  created () {
    eventBus.$on('fireDescribeCard', (p) => {
      if (this.$route.name === 'LifePath') {
        this.describeCard(p)
      }
    })
  },
  components: {
    Description
  },
  computed: {
    ...mapState(['zodiacSign'])
  },
  methods: {
    describeCard (p) {
      const q = p.slice()
      this.getCards(q)
      const z = q.shift()
      this.getZodiac(z)
      this.getLifePath(q)
    },
    getCards (p) {
      console.log(p)
      p.forEach((z, i) => {
          if (!z) {
            return
          }

          const url = this.cards[z].image
          this.imgs[i] = require('@/assets/images/cards/' + url)
      })
    },
    getLifePath (p) {
      let key
      const lps = Object.keys(this.lifepath)

      lps.some((x) => {
        const v = [
          this.lifepath[x].card1,
          this.lifepath[x].card2
        ]
        const filter = v.filter(value => p.includes(value))

        if (filter.length > 0) {
          key = x
          return key
        }
      })
      this.lifePathName = this.lifepath[key].title
      this.lifePathDescription = this.lifepath[key].description
    },
    getZodiac (p) {
      const z =  this.cards[p].name
      const title = this.cards[p].title
      this.zodiacName = utility.replace(/%TITLE%/g, title, z)
      this.zodiacDescription = utility.replace(/%TITLE%/g, title,
      this.cards[p].description.upright.text)
      //this.cards[p].description.zodiac
    }
  }
}
</script>

<style scoped lang='sass'>
  @import '../assets/sass/_colours'
  @import '../assets/sass/_easing'
  @import '../assets/sass/_decorations'

  .description
    align-items: center
    display: flex
    flex-direction: column

    .content
      margin-top: 20px

    .card
      margin: 0 10px
      max-width: 100px
      width: 50%

      &:nth-child(1)
        order: 1

      &:nth-child(2)
        order: 2

      &:nth-child(3)
        order: 3

      &:nth-child(1) img
        border: 3px solid $orange

      &:nth-child(n+2) img
        border: 3px solid $mediumpink

    .content h3
      margin-top: 20px
      text-transform: capitalize

      &:nth-of-type(1)
        background-color: $orange
        color: #fff

        + p
          border-color: $orange

      &:nth-of-type(2)
        background-color: $mediumpink
        color: #fff

        + p
          border-color: $mediumpink
</style>
<style lang='sass'>


  @media (min-width: 520px)
    .description
      .card-container
        margin-bottom: 0
        margin-top: 0
</style>
