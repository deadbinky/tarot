<template>
  <div class='description'
    :class='{open: open}'>
    <div class='close'
      @click='close'>x</div>
    <header>
      <h2>
        Zodiac and Life Path Cards
      </h2>
    </header>
    <div class='card-container'>
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
    </div>
    <div class='content'>
      <h3 id='h3-zodiac'>
        {{ zodiacSign }} & {{ zodiacName }}
      </h3>
        <p>{{ zodiacDescription }}</p>

      <h3 id='h3-lifepath'>
        {{ lifePathName }}
      </h3>
      <p>{{ lifePathDescription }}</p>
    </div>
  </div>
</template>

<script>
import cards from '@/assets/js/cards'
import lifepath from '@/assets/js/lifepath'
import eventBus from '@/assets/js/eventBus'
import { mapState } from 'vuex'

export default {
  name: 'Description',
  data () {
    return {
      card: {},
      cards: cards,
      imgs: [],
      lifepath: lifepath,
      lifePathName: '',
      zodiacDescription: '',
      lifePathDescription: '',
      zodiacName: '',
      open: false,
    }
  },
  created () {
    eventBus.$on('fireDescribeLifePath', (p) => {
      this.open = true
      this.describeCard(p)
    })
    eventBus.$on('fireCloseDescription', () => {
      this.close()
    })
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

      //get p length
      //make v the same length - maybe just check for one that has 3 somehow

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
      const z = this.cards[p].name
      this.zodiacName = z
      this.zodiacDescription =
      this.cards[p].description.upright.text
      //this.cards[p].description.zodiac
    },
    setLine (id1, id2, color, d1, d2) {
      const start = document.getElementById(id1)
      const end = document.getElementById(id2)
      this.$nextTick(function () {
        new window.LeaderLine(start, end, {
          color: color,
          startSocket: d1,
          endSocket: d2
        })
      })
    },
    close () {
      this.open = false
      eventBus.$emit('fireDismissDescription')
    }
  }
}
</script>

<style scoped lang='sass'>
  @import '../assets/sass/_colours'
  @import '../assets/sass/_easing'
  @import '../assets/sass/_decorations'

  .description
    align-items: top
    background: $brown
    box-sizing: border-box
    color: #fff
    height: 100vh
    left: 0
    margin: auto
    opacity: 0
    overflow: hidden
    padding: 30px
    position: absolute
    right: 0
    text-align: left
    top: 0
    width: 100%
    z-index: -1
    transition: opacity 0.5s ease-in, z-index 0s .6s

    &.open
      height: auto
      opacity: 1
      overflow: visible
      z-index: 6
      transition: opacity 0.5s ease-in

      header:after
        @include little-border-expand(.75s)

      .card
        transition: transform .75s $easeInBack .25s

    header
      margin-bottom: 10px
      padding-bottom: 10px
      position: relative
      text-align: center
      width: 100%

      &:after
        @include little-border-collapsed($lightbrown)

      h2
        color: $lightbrown

      p
        font-style: italic

    .card-container
      display: flex
      flex-direction: row

    .card
      margin: 0 10px
      max-width: 100px
      position: relative
      top: -5px
      width: 50%
      transition: transform 0s ease-out 1s

      &:before
        content: ' '
        padding-top: 153.25%

      &:nth-child(1) img
        border: 3px solid $orange

      &:nth-child(n+2) img
        border: 3px solid $mediumpink

      img
        border-radius: 10px
        height: 100%
        width: 100%

    h3
      border-radius: 20px 20px 0 0
      box-sizing: border-box
      margin-bottom: 0
      margin-top: 1.5em
      padding: 10px
      text-align: center
      text-transform: capitalize
      width: 100%

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

    p
      border-radius: 0 0 20px 20px
      border-style: solid
      border-width: 3px
      margin-top: 0
      padding: 15px

  .close
    cursor: pointer
    font-size: 50px
    grid-column: 1
    grid-row: 1
    text-align: center

  @media (min-width: 520px)
    .description
      align-items: center
      border-radius: 30px
      bottom: 0
      display: flex
      flex-direction: column
      max-width: 600px
      position: fixed
      top: 0
      width: 90vw

      header
        margin-top: 20px

      .card
        top: 0

      .content
        margin-top: 0
        width: 100%

      .close
        grid-column: none
        grid-row: none
        position: absolute
        left: 0
        margin: auto
        right: 0
        top: 0

    @media (min-width: 640px)
      .description
        height: 80vh
        min-height: auto
        width: 80vw
</style>
<style lang='sass'>
  .leader-line
    z-index: 9999
</style>
