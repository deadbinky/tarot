<template>
  <div class='card'
    :id='id'
    :class='{
      reversed: reversed,
      flipped: flipped,
      click: click
    }'
    @click='reveal'>
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
      spread: true,
      flipped: false
    }
  },
  mounted () {
    this.checkSpread()

    eventBus.$on('fireNextCard', () => {
      this.activeCard++
      this.revealInOrder()
    })
  },
  computed: {
    ...mapState([
      'spreadType',
      'useReversals'
    ]),
    bg () {
      const bg = require('@/assets/images/cards/' + this.image)
      return {
        'background-image': 'url(' + bg + ')'
      }
    },
    reversed () {
      let reversed = false

      if ( !this.spread || !this.useReversals) {
        return reversed
      }

      let d = Math.random();
      if (d < .3) {
        reversed = true
      }

      return reversed
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
    position: {
      type: Number,
      required: false
    },
    cardkey: {
      type: String,
      required: true
    }
  },
  methods: {
    checkSpread () {
      this.celticcross = this.spreadType === 'celticcross'
      this.spread = this.$route.name !== 'AllCards'

      if (this.celticcross && this.spread) {
        this.revealInOrder()
        return
      }
      if (!this.spread) {
        this.flipped = true
      }
      if (this.$route.name === 'Spread') {
        this.updateReading()
      }
      this.holder = this.bg
    },

    revealInOrder () {
      const active = this.position <= this.activeCard

      this.click = true

      if (this.celticcross && !active) {
        this.click = false
        return
      }
      this.holder = this.bg
    },

    reveal () {
      if (!this.click) {
        return
      }
      if (!this.flipped) {
        this.flipped = true
        if (this.celticcross) {
          eventBus.$emit('fireNextCard')
        }
        return
      }
      this.openDescription()
    },

    openDescription () {
      const p = {
        cardkey: this.cardkey,
        name: this.name,
        image: this.image,
        reversed: this.reversed,
        position: this.position
      }
      eventBus.$emit('fireDescribeCard', p)
    },

    updateReading () {
      const a = [this.position, this.cardkey, this.reversed]
      console.log(this.spreadType, a)
      this.$store.commit('updateReading', a)
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
