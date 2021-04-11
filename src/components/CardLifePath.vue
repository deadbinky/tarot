<template>
  <div class='card'
    :id='id'
    :cardArray='cardArray'
    :class='{
      flipped: flipped,
      click: click
    }'
    @click='openDescription'>
    <div class='inner'>
      <div class='front' :style=holder>
      </div>
      <div class='back'>
      </div>
    </div>
  </div>
</template>

<script>

import eventBus from '@/assets/js/eventBus'
import { mapState } from 'vuex'

export default {
  name: 'Card',
  data () {
    return {
      click: true,
      celticcross: false,
      holder: '',
      activeCard: 0,
      flipped: false
    }
  },
  mounted () {
    this.flipCards()
  },
  computed: {
    ...mapState([ 'component' ]),
    bg () {
      const bg = require('@/assets/images/cards/' + this.image)
      return {
        'background-image': 'url(' + bg + ')'
      }
    }
  },
  props: {
    name: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: false
    },
    cardArray: {
      type: Array,
      required: true
    },
    cardkey: {
      type: String,
      required: true
    }
  },
  methods: {
    flipCards () {
      this.flipped = true
      this.holder = this.bg
    },
    openDescription () {
      console.log(this.cardArray)
      eventBus.$emit('fireDescribeLifePath', this.cardArray)
    }
  }
}
</script>

<style scoped lang='sass'>
  .card
    margin: auto
    opacity: .5
    perspective: 1000px
    position: relative

    &.click
      opacity: 1
      transition: opacity ease-in .5s

    &.flipped .inner
      transform: rotateY(180deg)
      transition: transform 0.8s

    &.reversed
      transform: rotate(180deg)

      &.flipped .inner
        transform: rotateY(-180deg)

    .inner
      bottom: 0
      left: 0
      position: absolute
      right: 0
      top: 0
      z-index: 1
      transform-style: preserve-3d
      transition: none

      .front,
      .back
        border-radius: 10px
        box-shadow: 0 0 10px RGB(0 0 0 / 15%)
        backface-visibility: hidden
        height: 100%
        overflow: hidden
        position: absolute
        width: 100%

      .front
        background-color: #fff
        background-size: cover
        background-repeat: no-repeat
        background-position: center
        transform: rotateY(180deg)

      .back
        background-image: url(~@/assets/images/cards/Card_back.jpg)
        background-position: center center
        background-repeat: no-repeat
        background-size: cover

</style>
