<template>
  <div id="app"
    :class='{ overlay:describeOn }'>
    <Home/>
  </div>
</template>

<script>
import Home from './views/Home.vue'
import eventBus from '@/assets/js/eventBus'

export default {
  name: 'App',
  components: {
    Home
  },
  created () {
    eventBus.$on('fireDescribeCard', () => {
      this.describeOn = true
    }),
    eventBus.$on('fireCloseDescription', () => {
      this.describeOn = false
    })
  }
}
</script>

<style scoped lang='sass'>
  @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@400;700&display=swap');

  #app
    font-family: 'Comfortaa';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0
    padding: 0

    &.overlay
      overflow: hidden
</style>
