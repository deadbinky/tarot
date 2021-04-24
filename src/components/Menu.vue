<template>
  <div class='menu' :class='{open: open}'>
    <div class='inner'>
      <div class='content'>
        <div class='close' @click='toggleMenu'>x</div>
        <h2>New Reading</h2>
        <Toggle
          :name='useReversals'
          title='Use Reversals'
          />
        <Button v-for='(spread, index) in spreads'
          component='Spread'
          :name='spread.name'
          :key='index'
          />
        <a href='/#/LifePath'
          class='lifepath button'
          @click='toggleMenu'>Life Path</a>
        <a href='/#/AllCards'
          class='seeallcards button'
          @click='toggleMenu'>See All Cards</a>
        </div>
      </div>
      <div class='open-menu-button' @click='toggleMenu'></div>
    </div>
</template>

<script>
// @ is an alias to /src
import Button from '@/components/Button'
import Toggle from '@/components/Toggle'
import spreads from '@/assets/js/spreads'
import eventBus from '@/assets/js/eventBus'
import { mapState } from 'vuex'

export default {
  name: 'Menu',
  components: {
    Button,
    Toggle
  },
  data () {
    return {
      open: false,
      spreads: spreads
    }
  },
  computed: {
    ...mapState(['useReversals'])
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
      if (this.open) {
        eventBus.$emit('fireCloseDescription')
      }
    }
  }
}
</script>

<style scoped lang='sass'>
  @import '../assets/sass/_colours'
  @import '../assets/sass/_easing'
  @import '../assets/sass/_decorations'

  .menu
    color: #fff
    height: 100vh
    max-height: 100%
    position: absolute
    text-align: left
    top: 0
    z-index: 5

    .inner
      height: 100%
      overflow: hidden
      position: relative
      width: 0
      transition: width .5s cubic-bezier(0, 0.55, 0.45, 1)

      &:before
        background-color: $brown
        background-image: url("data:image/svg+xml,%3Csvg width='84' height='84' viewBox='0 0 84 84' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ccb3af' fill-opacity='0.17'%3E%3Cpath d='M84 23c-4.417 0-8-3.584-8-7.998V8h-7.002C64.58 8 61 4.42 61 0H23c0 4.417-3.584 8-7.998 8H8v7.002C8 19.42 4.42 23 0 23v38c4.417 0 8 3.584 8 7.998V76h7.002C19.42 76 23 79.58 23 84h38c0-4.417 3.584-8 7.998-8H76v-7.002C76 64.58 79.58 61 84 61V23zM59.05 83H43V66.95c5.054-.5 9-4.764 9-9.948V52h5.002c5.18 0 9.446-3.947 9.95-9H83v16.05c-5.054.5-9 4.764-9 9.948V74h-5.002c-5.18 0-9.446 3.947-9.95 9zm-34.1 0H41V66.95c-5.053-.502-9-4.768-9-9.948V52h-5.002c-5.184 0-9.447-3.946-9.95-9H1v16.05c5.053.502 9 4.768 9 9.948V74h5.002c5.184 0 9.447 3.946 9.95 9zm0-82H41v16.05c-5.054.5-9 4.764-9 9.948V32h-5.002c-5.18 0-9.446 3.947-9.95 9H1V24.95c5.054-.5 9-4.764 9-9.948V10h5.002c5.18 0 9.446-3.947 9.95-9zm34.1 0H43v16.05c5.053.502 9 4.768 9 9.948V32h5.002c5.184 0 9.447 3.946 9.95 9H83V24.95c-5.053-.502-9-4.768-9-9.948V10h-5.002c-5.184 0-9.447-3.946-9.95-9zM50 50v7.002C50 61.42 46.42 65 42 65c-4.417 0-8-3.584-8-7.998V50h-7.002C22.58 50 19 46.42 19 42c0-4.417 3.584-8 7.998-8H34v-7.002C34 22.58 37.58 19 42 19c4.417 0 8 3.584 8 7.998V34h7.002C61.42 34 65 37.58 65 42c0 4.417-3.584 8-7.998 8H50z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
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
        transition: opacity .35s $easeOutCirc

      .content
        opacity: 0
        padding: 5vh

    .open-menu-button
      cursor: pointer
      opacity: 1
      margin-left: 10px
      position: absolute
      top: 0
      transition: all .75s ease-in .5s

      &:before
        content: '☰'
        color: #fff
        font-size: 55px

    h2
      color: $lightpink
      font-size: 2em
      &:after
        @include little-border-collapsed($lightpink)
        margin-left: 0
        margin-top: 10px

    .seeallcards
      display: inline-block
      &:before
        @include little-border-collapsed($lightpink)
        margin-bottom: 20px
        margin-left: 0

    &.open
      .inner
        width: 100vw
        transition: width .35s $easeInCirc .25s

        &:before
          opacity: 1
          transition: opacity .55s $easeOutCirc .35s

      .content
        opacity: 1
        transition: opacity .25s ease-out .55s

      h2:after, .seeallcards:before
        @include little-border-expand(1s)

      .open-menu-button
        opacity: 0
        transition: all .25s ease-in

    .button
      color: #fff
      cursor: pointer
      display: block
      font-size: 1em
      margin-top: 1em
      text-decoration: none

    .close
      cursor: pointer
      font-size: 50px

  @media (min-width: 640px)
    .menu
      z-index: 10

</style>
