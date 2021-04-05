<template>
  <div class='home'>
    <Menu />
    <Spread />
    <Description />
  </div>
</template>

<script>
// @ is an alias to /src
import Spread from '@/components/Spread'
import Menu from '@/components/Menu'
import Description from '@/components/Description'

export default {
  name: 'Home',
  components: {
    Menu,
    Spread,
    Description
  }
}
</script>

<style scoped lang='sass'>
  .home
    height: 100vh
    max-width: 100%
    position: relative
    text-align: center
    width: 100vw
</style>
