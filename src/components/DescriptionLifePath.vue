<template>
  <div class='description'
    :class='{open: open}'>
    <div class='close'
      @click='close'>x</div>
    <header>
      <h2>
        Life Path and Zodiac Cards
      </h2>
    </header>
    <div class='card-container'>
      <div class='card'>
        <img :src='imgs[0]'/>
      </div>
      <div class='card'>
        <img :src='imgs[1]'/>
      </div>
      <div class='card'>
        <img :src='imgs[2]'/>
      </div>
      <div class='card' v-if='imgs[3]'>
        <img :src='imgs[3]'/>
      </div>
    </div>
  <div class='content'>
      <h3>
        Zodiac: {{ zodiacName }}
      </h3>
        <p>{{ zodiacDescription }}</p>
      <h3>
        LifePath: {{ lifePathName }}
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
    ...mapState(['spreadType','component'])
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
      console.log(p)
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
      const z = this.cards[p].name
      this.zodiacName = z
      this.zodiacDescription = this.cards[p].description.zodiac
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
    display: flex
    flex-direction: column
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
    z-index: -1
    transition: opacity 0.5s ease-in, z-index 0s .6s

    &:after
      content: ' '
      clear: both
      display: block

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
      order: 1
      padding-bottom: 10px
      text-align: center
      width: 100%

      &:after
        @include little-border-collapsed($lightbrown)

      h2
        color: $lightbrown

      p
        font-style: italic

    .card-container
      display: grid
      grid-template: repeat(2, 1fr) / repeat(3, 1fr)
      order: 2
      max-width: 300px

    .card
      margin: auto
      max-width: 200px
      position: relative
      top: -5px
      width: 75%
      transition: transform 0s ease-out 1s

      &:before
        content: ' '
        padding-top: 153.25%

      &:nth-child(1)
        grid-column: 2
        grid-row: 1

      &:nth-child(2)
        grid-column: 1
        grid-row: 2

      &:nth-child(3)
        grid-column: 3
        grid-row: 2

      &:nth-child(4)
        grid-column: 2
        grid-row: 2

      img
        border-radius: 10px
        height: 100%
        width: 100%

    .content
      margin-top: 20px
      order: 3
      width: 100%

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
      height: 90vh
      max-width: 600px
      position: fixed
      top: 0
      width: 90vw

      .card
        top: 0
        width: 100%

      .content
        margin-top: 0
        padding-left: 5%
        width: 95%

      .close
        grid-column: none
        grid-row: none
        position: absolute
        right: 15px
        top: 5px

    @media (min-width: 640px)
      .description
        height: 80vh
        min-height: auto
        width: 80vw
</style>
