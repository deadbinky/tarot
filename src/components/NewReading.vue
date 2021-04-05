<template>
  <div class='menu' :class='{open: open}'>
    <div class='inner'>
      <div class='close' @click='toggleMenu'>X</div>
      <Button
        v-for='(spread, index) in spreads'
        :name='spread.name'
        :key='index'
        />
      </div>
      <div class='open-menu-button' @click='toggleMenu'>+ New Reading</div>
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
  .menu
    background: #fff
    position: absolute
    width: 100vw
    z-index: 999

    .inner
      height: 0
      overflow: hidden
      position: relative
      text-align: center
      transition: height .5s ease-in

    .open-menu-button
      cursor: pointer
      opacity: 1
      transition: all .75s ease-in .5s

    &.open
      height: 100vh

      .inner
        height: 100vh

      .open-menu-button
        opacity: 0
        transition: all .25s ease-in

    .close
      cursor: pointer
      font-size: 50px
      position: absolute
      right: 1em
      top: 1em
</style>
