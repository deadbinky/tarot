<template>
  <div class='description'
    :class='{open: open}'>
    <div class='close'
      @click='close'>x</div>
    <header>
      <h2 v-if='!this.seeallcards'>
        {{ position.name }}
      </h2>
      <h2 v-else>
        {{ name }}
        <transition name='fade'>
          <span v-if='this.reversed'>
            (Reversed)
          </span>
        </transition>
      </h2>
      <p v-if='!this.seeallcards'>{{ position.description }}</p>
    </header>
    <div class='card-container'>
      <div class='card'
        :class='{ reversed: reversed }'>
        <img :src='img' :alt='name'/>
      </div>
      <div v-if='this.seeallcards'
        class='seereversemeaning'
        @click='reverseMeaning()'>
        see
        <span v-if='this.reversed'>
          ↑ upright
        </span>
        <span v-else>
          ↓ reverse
        </span>
        meaning</div>
    </div>
    <div class='content'>
      <h3 v-if='!this.seeallcards'>
        {{ name }}
        <span v-if='this.reversed'
        transition="fade">
          (Reversed)
        </span>
      </h3>
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
      card: {},
      cards: cards,
      name: '',
      img: '',
      description: '',
      position: {},
      reversed: false,
      open: false,
      seeallcards: false,
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
  },
  computed: {
    ...mapState(['spreadType'])
  },
  methods: {
    describeCard (p) {
      this.seeallcards = this.spreadType === 'seeallcards'

      const dir = p.reversed
      const direction = this.getDirection(dir)
      this.card = this.cards[p.cardkey]

      this.name = this.card.name
      this.description = this.card.description[direction]

      this.img = require('@/assets/images/cards/' + this.card.image)

      if (this.seeallcards) {
        return
      }

      const spread = this.spreads[this.spreadType]
      const pos = spread.positions[p.position]
      this.position = {
        name: pos.name,
        description: pos.description
      }
    },
    getDirection (dir) {
      this.reversed = false
      let direction = 'upright'

      if (dir) {
        this.reversed = true
        direction = 'reversed'
      }
      return direction
    },
    reverseMeaning () {
      const dir = !this.reversed
      const direction = this.getDirection(dir)
      this.description = this.card.description[direction]
    },
    close () {
      this.open = false
      this.reversed = false
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
    display: grid
    height: 100vh
    left: 0
    margin: auto
    opacity: 0
    overflow: hidden
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
      grid-area: header
      grid-column: 1
      grid-row: 2
      margin-bottom: 10px
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
      grid-column: 1
      grid-row: 3

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

      &.reversed
        transform: rotate(180deg)

      img
        border-radius: 10px
        height: 100%
        width: 100%

    .content
      grid-column: 1
      grid-row: 4
      margin-top: 20px
      width: 100%

  .close
    cursor: pointer
    font-size: 50px
    grid-column: 1
    grid-row: 1
    text-align: center

  .seereversemeaning
    cursor: pointer
    font-size: .75em
    margin-top: 10px
    text-align: center
    top: 100%

  .fade-enter, .fade-leave-to
    opacity: 0

  .fade-enter-to, .fade-leave
    opacity: 1

  .fade-enter-active, .fade-leave-active
    transition: opacity .5s

  @media (min-width: 520px)
    .description
      align-items: center
      border-radius: 30px
      bottom: 0
      grid-template: repeat(4, 1fr) / repeat(3, 1fr)
      height: 90vh
      max-height: 600px
      max-width: 600px
      position: fixed
      top: 0
      width: 90vw

      header
        grid-column: 1/4
        grid-row: 1

      .card-container
        grid-column: 1/2
        grid-row: 2

      .card
        top: 0
        width: 100%

      .content
        grid-column: 2/4
        grid-row: 2
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
