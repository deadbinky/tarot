<template>
  <div class='description'
    :class='{open: open}'>
    <div class='close'
      @click='close'>x</div>
    <header>
      <h2>{{ position.name }}</h2>
      <p>{{ position.description }}</p>
    </header>
    <div class='card'
      :class='{ reversed: reversed }'>
      <img :src='img'/>
    </div>
    <div class='content'>
      <h3>{{ name }}</h3>
      <p>{{ description }}</p>
    </div>
  </div>
</template>

<script>
import eventBus from '@/assets/js/eventBus'
import cards from '@/assets/js/cards'
import spreads from '@/assets/js/spreads'
import { mapState } from 'vuex'

export default {
  name: 'Description',
  data () {
    return {
      cards: cards,
      name: '',
      img: '',
      description: '',
      position: {},
      reversed: false,
      open: false,
      spreads: spreads
    }
  },
  created () {
    eventBus.$on('fireDescribeCard', (p) => {
      this.open = true
      this.describeCard(p)
    })
    eventBus.$on('fireCloseDescription', () => {
      this.close()
    })
    console.log(this.spreadType, this.spreads[this.spreadType])
  },
  computed: {
    ...mapState(['spreadType'])
  },
  methods: {
    describeCard (p) {
      const card = this.cards[p.cardkey]
      const spread = this.spreads[this.spreadType]
      const pos = spread.positions[p.position]
      const dir = p.reversed
      let direction = this.getDirection(dir)

      this.name = card.name
      this.description = card.description[direction]
      this.position = {
        name: pos.name,
        description: pos.description
      }

      this.img = require('@/assets/images/cards/' + card.image)
    },
    getDirection (dir) {
      console.log(dir)
      this.reversed = false
      let direction = 'upright'
      if (dir) {
        this.reversed = true
        direction = 'reversed'
      }
      console.log(this.reversed,direction)
      return direction
    },
    close () {
      this.open = false
    }
  }
}
</script>

<style scoped lang='sass'>
  @import '../assets/sass/_colours'
  @import '../assets/sass/_easing'

  .description
    align-items: top
    background: $brown
    box-sizing: border-box
    color: #fff
    display: grid
    left: 0
    margin: auto
    opacity: 0
    padding: 5vw
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
      opacity: 1
      z-index: 6
      transition: opacity 0.5s ease-in

      header:after
        opacity: 1
        width: 50%
        transition: all .5s $easeOutCirc .75s

    header
      grid-area: header
      grid-column: 1
      grid-row: 2
      padding-bottom: 10px
      text-align: center
      width: 100%

      &:after
        border-bottom: 1px solid $lightbrown
        content: ' '
        display: block
        margin: auto
        opacity: 0
        padding-top: 10px
        width: 0
        transition: all .5s $easeOutCirc

      h2
        color: $lightbrown

      p
        font-style: italic

    .card
      grid-column: 1
      grid-row: 3
      margin: auto
      max-width: 200px
      width: 80%

      &:before
        content: ' '
        padding-top: 153.25%

      &.reversed
        transform: rotate(180deg)

      img
        border-radius: 10px
        height: 100%
        width: 100%

    .content
      grid-column: 1
      grid-row: 4
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
      grid-template: repeat(4, 1fr) / repeat(3, 1fr)
      height: 90vh
      position: fixed
      top: 0
      width: 90vw

      header
        grid-column: 1/4
        grid-row: 1

      .card
        grid-column: 1/2
        grid-row: 2
        width: 100%

      .content
        grid-column: 2/4
        grid-row: 2
        padding-left: 2vw

      .close
        grid-column: none
        grid-row: none
        position: absolute
        right: 15px
        top: 5px

    @media (min-width: 640px)
      .description
        height: 80vh
        width: 80vw
</style>
