<template>
  <div class='card'
    :class='{
      flipped: flipped,
      click: click
    }'
    @click='reveal'>
    <div class='inner'>
      <div class='front'>
        <img width="100%" :src='img' />
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
      activeCard: 0,
      flipped: false,
      direction: 'upright'
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
    ...mapState(['spreadType']),
    img () {
      return require('@/assets/images/cards/' + this.image)
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
    position: {
      type: Number,
      required: true
    }
  },
  methods: {

    checkSpread () {
      this.celticcross = this.spreadType === 'celticcross'

      if (this.celticcross) {
        this.revealInOrder()
      }
    },

    revealInOrder () {
      const active = this.position <= this.activeCard

      this.click = true

      if (this.celticcross && !active) {
        this.click = false
        return
      }
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
        cardkey: this.$vnode.cardkey,
        name: this.name,
        image: this.image,
        direction: this.direction,
        position: this.position
      }
      eventBus.$emit('fireDescribeCard', p)
    }
  }
}
</script>

<style scoped lang='sass'>
  .card
    height: 250px
    margin: auto
    opacity: .5
    perspective: 1000px
    width: 150px

    &.click
      opacity: 1
      transition: opacity ease-in .5s

    &.flipped .inner
      transform: rotateY(180deg)
      transition: transform 0.8s


    .inner
      height: 100%
      position: relative
      transform-style: preserve-3d
      transition: none
      width: 100%

      .front,
      .back
        border: 1px solid #ccc
        border-radius: 5px
        backface-visibility: hidden
        height: 100%
        position: absolute
        width: 100%

      .front
        background: #f00
        transform: rotateY(180deg)

      .back
        background: #000
</style>
