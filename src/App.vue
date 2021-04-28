<template>
  <div id="app" :class='{ menuOpen: menuOpen }'>
    <MenuButton />
    <Menu />
    <transition name='fade'>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import Menu from '@/components/Menu'
  import MenuButton from '@/components/MenuButton'
  import eventBus from '@/assets/js/eventBus'

  export default {
    name: 'App',
    components: {
      Menu,
      MenuButton
    },
    data () {
      return {
        menuOpen: false
      }
    },
    created () {
      eventBus.$on('fireToggleMenu', () => {
        this.menuOpen = !this.menuOpen
      })
    }
  }
</script>

<style lang='sass'>
  @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@400;700&display=swap')
  @import 'assets/sass/_colours'
  @import 'assets/sass/_svgs'

  html, body
    min-height: 100%
    height: 100%!important
    width: 100%

  body
    background-color: #ec998e
    background-image: url($skulls)
    font-family: 'Comfortaa'
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    margin: 0
    padding: 0

    &:before
      background-image: $bodyShadow
      bottom: 0
      content: ''
      display: block
      left: 0
      position: absolute
      right: 0
      top: 0

    h1,h2,h3,h4,h5,h6,p
      margin-bottom: .5em
      margin-top: .5em
      padding: 0

    p
      font-size: .9em

  .menuOpen
    max-height: 100%
    height: 100%;
    overflow: hidden

</style>

<style scoped lang='sass'>
  .fade-enter-active, .fade-leave-active
    transition: opacity .5s;

  .fade-enter, .fade-leave-to
    opacity: 0;

</style>
