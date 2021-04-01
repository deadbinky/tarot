<template>
  <div class='card'
    :class='name'
    >
    <div class='inner'>
      <div class='front'>
      card:
      {{ name }}
      </div>
      <div class='back'>
      </div>
    </div>
  </div>
</template>

<script>
import cards from '@/assets/js/cards'

export default {
  name: 'Card',
  data () {
    return {
      cards: cards
    }
  },
  props: {
    name: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped lang='sass'>
  .card
    display: inline-block
    height: 200px
    perspective: 1000px
    width: 150px

    &:hover .inner
      transform: rotateY(180deg)

    .inner
      height: 100%
      position: relative
      transform-style: preserve-3d
      transition: transform 0.8s
      width: 100%

      .front,
      .back
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
