<template>
  <div class='menu' :class='{open: open}'>
    <div class='content'>
      <div class='menu-options'>
        <div class='menu-button'
          :class='{ active: (component === "New")}'
          @click='setMenu("New")'>
          New Readings
        </div>
        <div class='menu-button'
          :class='{ active: (component === "Saved")}'
          @click='setMenu("Saved")'>
          Saved Readings
        </div>
        <a class='menu-button'
        :class='{ active: (this.$router.name === "AllCards")}'
          @click='goTo("AllCards")'>
          All Cards
        </a>
        <div class='menu-button'
          :class='{ active: (component === "Settings")}'
          @click='setMenu("Settings")'>
          Settings
        </div>
      </div>
      <component v-if='component'
        :is='component'/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import New from '@/components/MenuNewReadings'
import Saved from '@/components/MenuSavedReadings'
import Settings from '@/components/MenuSettings'
import eventBus from '@/assets/js/eventBus'

export default {
  name: 'Menu',
  components: {
    Settings,
    Saved,
    New
  },
  data () {
    return {
      component: 'New',
      open: false
    }
  },
  created () {
    eventBus.$on('fireToggleMenu', () => {
      this.toggleMenu()
    }),
    eventBus.$on('fireCloseMenu', () => {
      if (this.open) {
        this.toggleMenu()
      }
    })
  },
  methods: {
    setMenu (c) {
      this.component = c
    },
    toggleMenu () {
      this.open = !this.open
    },
    goTo (link) {
      if (this.$router.name !== link) {
        this.$router.push(link)
      }
      eventBus.$emit('fireCloseMenu')
    }
  }
}
</script>

<style scoped lang='sass'>
  @import '../assets/sass/_svgs'
  @import '../assets/sass/_colours'
  @import '../assets/sass/_easing'
  @import '../assets/sass/_decorations'

  .menu
    background-color: $brown
    background-image: url($churchTile)
    box-sizing: border-box
    color: #fff
    height: auto!important
    left: -100%
    min-height: 100vh
    position: absolute
    text-align: left
    top: 0
    width: 100%
    z-index: 5
    transition: left .5s $easeOutCirc, opacity .35s $easeInCirc

    .content
      box-sizing: border-box
      opacity: 0
      margin: auto
      padding: 60px 0
      width: 90%

      a
        text-decoration: none

    &.open
      left: 0
      transition: left .35s $easeInCirc .25s

      &:before
        opacity: 1
        transition: opacity .55s $easeOutCirc .35s

      .content
        opacity: 1
        transition: opacity .25s ease-out .55s

      h2:after, .seeallcards:before
        @include little-border-expand(1s)

    .menu-options
      align-items: top
      display: flex
      flex-direction: row
      margin: auto
      margin-bottom: 30px
      width: 100%

      .menu-button
        align-items: center
        background: $mediumpink
        border-radius: 10px
        color: #fff
        cursor: pointer
        display: flex
        font-size: .75em
        font-weight: bold
        height: 50px
        justify-content: center
        max-width: 200px
        text-align: center
        text-transform: uppercase
        width: 45%

        &.active
          background: $darkpink

        & + .menu-button
          margin-left: 10px

  @media (min-width: 520px)
    .menu
      .menu-options
        width: 80%

</style>
