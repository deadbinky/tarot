<template>
  <div class='home'>
    <NewReading />
    <Spread />
  </div>
</template>

<script>
// @ is an alias to /src
import Spread from '@/components/Spread'
import NewReading from '@/components/NewReading'

export default {
  name: 'Home',
  components: {
    NewReading,
    Spread
  }
}
</script>

<style scoped lang='sass'>
  .home
    height: 100vh
    position: relative
    text-align: center
    width: 100vw
</style>
