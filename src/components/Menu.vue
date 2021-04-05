<template>
  <div class='menu' :class='{open: open}'>
    <div class='inner'>
      <div class='close' @click='toggleMenu'>X</div>
      <h2>New Reading</h2>
      <Button
        v-for='(spread, index) in spreads'
        :name='spread.name'
        :key='index'
        />
      </div>
      <div class='open-menu-button' @click='toggleMenu'></div>
    </div>
</template>

<script>
// @ is an alias to /src
import Button from '@/components/Button'
import spreads from '@/assets/js/spreads'
import eventBus from '@/assets/js/eventBus'

export default {
  name: 'Menu',
  components: {
    Button
  },
  data () {
    return {
      open: false,
      spreads: spreads
    }
  },
  created () {
    eventBus.$on('fireCloseMenu', () => {
      if (this.open) {
        this.toggleMenu()
      }
    })
  },
  methods: {
    toggleMenu () {
      this.open = !this.open
      console.log(this.open)
    }
  }
}
</script>

<style scoped lang='sass'>
  @import '../assets/sass/_colours'
  @import '../assets/sass/_easing'

  .menu
    color: #fff
    max-width: 100%
    position: absolute
    width: 100vw
    z-index: 10

    .inner
      height: 0
      overflow: hidden
      position: relative
      text-align: center
      transition: height .5s cubic-bezier(0, 0.55, 0.45, 1)

      &:before
        background: $brown
        bottom: 0
        content: ' '
        display: block
        height: 100%
        left: 0
        opacity: 0
        position: absolute
        right: 0
        top: 0
        width: 100%
        z-index: -1
        transition: opacity .25s cubic-bezier(0, 0.55, 0.45, 1);

    .open-menu-button
      cursor: pointer
      opacity: 1
      transition: all .75s ease-in .5s

      &:before
        content: '☰'
        color: #fff
        font-size: 30px

    h2
      color: $lightpink
      font-size: 2em
      &:after
        border-bottom: 1px solid $lightpink
        content: ' '
        display: block
        margin: auto
        opacity: 0
        padding-top: 10px
        width: 0
        transition: all .5s $easeOutCirc

    &.open
      .inner
        height: 100vh
        transition: height 2s $easeOutCirc .25s

        &:before
          opacity: 1
          transition: opacity 2.5s $easeOutCirc .25s

      h2:after
        opacity: 1
        width: 50%
        transition: all .5s $easeOutCirc .75s

      .open-menu-button
        opacity: 0
        transition: all .25s ease-in

    .close
      cursor: pointer
      font-size: 50px
      text-align: center

  @media (min-width: 640px)
    .close
      position: absolute
      right: 5vw
      top: 3vh

</style>
