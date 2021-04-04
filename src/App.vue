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

<style scoped lang='sass'>
  @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@400;700&display=swap');

  #app
    font-family: 'Comfortaa';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0
    padding: 0

</style>
