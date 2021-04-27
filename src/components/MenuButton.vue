<template>
  <div class='menu-button'
    :class='{ open: open }'
    @click='toggleMenu'></div>
</template>

<script>
// @ is an alias to /src
import eventBus from '@/assets/js/eventBus'

export default {
  name: 'Menu',
  data () {
    return {
      open: false
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
      eventBus.$emit('fireToggleMenu')
    }
  }
}
</script>

<style scoped lang='sass'>
  @import '../assets/sass/_colours'

  .menu-button
    background: $brown
    border-radius: 50px
    cursor: pointer
    height: 50px
    opacity: 1
    margin-left: 5px
    position: absolute
    text-align: center
    top: 5px
    width: 50px
    z-index: 6
    transition: all .75s ease-in .25s

    &:before
      content: '+'
      color: #fff
      font-size: 55px
      line-height: 59px

    &.open
      transform: rotate(225deg)
      transition: all .5s ease-in .25s

</style>
