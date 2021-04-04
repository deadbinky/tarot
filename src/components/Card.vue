<template>
  <div class='card'
    :class='{ flipped: flipped }'
    @click='reveal'>
    <div class='inner'>
      <div class='front'>
        <img width="100%" :src= img />
      </div>
      <div class='back'>
      </div>
    </div>
  </div>
</template>

<script>
import eventBus from '@/assets/js/eventBus'

export default {
  name: 'Card',
  data () {
    return {
      flipped: false
    }
  },
  computed: {
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
    reveal () {
      if (!this.flipped) {
        this.flipped = true
        return
      }

      const p = {
        image: this.image,
        key: this.$vnode.key,
        direction: 'upright',
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
    perspective: 1000px
    width: 150px

    &.flipped .inner
      transform: rotateY(180deg)

    .inner
      height: 100%
      position: relative
      transform-style: preserve-3d
      transition: transform 0.8s
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
