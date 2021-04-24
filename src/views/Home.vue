<template>
  <div class='home'>
    <ReadingSpread/>
    <DescriptionCard/>
  </div>
</template>

<script>
// @ is an alias to /src
import ReadingSpread from '@/components/ReadingSpread'
import DescriptionCard from '@/components/DescriptionCard'

export default {
  name: 'Home',
  components: {
    ReadingSpread,
    DescriptionCard
  }
}
</script>

<style scoped lang='sass'>
  .home
    display: flex
    height: 100vh
    max-width: 100%
    position: relative
    text-align: center
    width: 100vw
</style>
