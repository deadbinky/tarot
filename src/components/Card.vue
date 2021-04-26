<template>
  <div class='card'
    :id='id'
    @click='$emit("clickAction")'>
    <div class='inner'>
      <div class='front' :style='bg'>
      </div>
      <div class='back'>
      </div>
    </div>
  </div>
</template>

<script>
import eventBus from '@/assets/js/eventBus'
import CardMixins from '@/components/CardMixins'

export default {
  name: 'Card',
  mixins: [ CardMixins ],
  created () {
    eventBus.$on('fireOpenDescription', () => {
      console.log('fireOpenDescription')
      this.openDescription()
    })
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
