<template>
  <div id="app">
    <Home/>
  </div>
</template>

<script>
import Home from './views/Home.vue'

export default {
  name: 'App',
  components: {
    Home
  }
}
</script>

<style lang='sass'>
  @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@400;700&display=swap')
  @import 'assets/sass/_colours'

  html, body
    height: 100%
    width: 100%

  body
    background-color: $lightbrown;
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

</style>

<style scoped lang='sass'>
  #app
    font-family: 'Comfortaa'
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    height: 100%
    margin: 0
    padding: 0
    width: 100%

</style>
