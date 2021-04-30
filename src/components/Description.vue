<template>
  <div class='description'
    :class='{open: descriptionOpen}'>
    <div class='close'
      @click='close'>x</div>
    <header>
      <slot name='header'></slot>
    </header>
    <div class='card-container'>
        <slot name='card'></slot>
    </div>
    <div class='content'>
        <slot name='content-header'></slot>
        <slot name='content'>
          <p>
            <span class='keywords'>
              <span v-for='(keyword, index) in this.keywords'
                :key='index'>
                {{ keyword }}
              </span>
            </span>
            {{ cardDescription }}
          </p>
        </slot>
    </div>
  </div>
</template>

<script>
import utility from '@/assets/js/utilityFunctions'
import eventBus from '@/assets/js/eventBus'
import cards from '@/assets/js/cards'
import { mapState } from 'vuex'

export default {
  name: 'Description',
  data () {
    return {
      open: false,
      cards: cards,
      keywords: [],
      cardDescription: ''
    }
  },
  computed: {
    ...mapState(['descriptionOpen'])
  },
  created () {
    eventBus.$on('fireDescribeCard', (p) => {
      this.$store.commit('changeShowDescription', true)
      this.describeCard(p)
    })
    eventBus.$on('fireReverseMeaning', (r) => {
      this.reverseMeaning(r)
    })
  },
  methods: {
    describeCard (p) {
      if (this.$route.name === 'LifePath') {
        return
      }

      const c = this.cards[p.cardkey]
      const dir = p.reversed
      const d = utility.getDirection(dir)
      const direction = d.direction

      const desc = c.description[direction]
      this.card = c

      this.cardDescription = desc.text
      this.keywords = desc.keywords
    },
    reverseMeaning (r) {
      const d = utility.getDirection(r)
      const direction = d.direction

      const c = this.card
      const desc = c.description[direction]
      this.keywords = desc.keywords
      this.cardDescription = desc.text
    },
    close () {
      this.$store.commit('changeShowDescription', false)
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

    .card-container
      display: flex
      flex-direction: row
      justify-content: center
      margin-bottom: 20px
      margin-top: 20px
      width: 100%

    &.seeallcards
      .card-container
        flex-direction: column

    &.open
      opacity: 1
      overflow: visible
      z-index: 6
      transition: opacity 0.5s ease-in

      header:after
        @include little-border-expand(.75s)

      .card
        transition: transform .75s $easeInBack .25s

    .next, .prev
      color: white
      cursor: pointer
      font-size: 50px
      height: 50px
      position: absolute
      top: -50px
      width: 50px

    .prev
      left: -10px

    .next
      right: -10px

    header
      grid-area: header
      grid-column: 1
      grid-row: 2
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
      grid-column: 1
      grid-row: 3
      text-align: center

    .card
      margin-left: auto
      margin-right: auto
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
        border: 3px solid $lightbrown
        border-radius: 10px
        height: 100%
        width: 100%

    .content
      grid-column: 1
      grid-row: 4
      width: 100%

      h3
        background-color: $lightbrown
        border-radius: 20px 20px 0 0
        box-sizing: border-box
        color: #fff
        margin-bottom: 0
        margin-top: 0
        padding: 10px 10px 5px 10px
        text-align: center
        width: 100%

      p
        border-color: $lightbrown
        border-radius: 0 0 20px 20px
        border-style: solid
        border-width: 3px
        margin-top: 0
        padding: 15px

      .keywords
        display: block
        text-align: center
        margin-bottom: 10px

        span
          background: $mediumpink
          border-radius: 20px
          display: inline-block
          font-size: .75em
          font-weight: bold
          margin-bottom: 5px
          padding: 5px 15px
          text-transform: uppercase

          & + span
            margin-left: 5px

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
      border-radius: 30px
      bottom: 0
      grid-template: repeat(4, 1fr) / repeat(3, 1fr)
      max-width: 600px
      position: fixed
      top: 0
      width: 90vw

      .next, .prev
        top: 0

      header
        grid-column: 1/4
        grid-row: 1
        margin-top: 20px

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
        left: 0
        margin: auto
        right: 0
        top: 0

    @media (min-width: 640px)
      .description
        width: 80vw
</style>
