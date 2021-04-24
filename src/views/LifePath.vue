<template>
  <div class='lifepath'>
    <ReadingLifePath/>
    <DescriptionLifePath/>
  </div>
</template>

<script>
// @ is an alias to /src
import ReadingLifePath from '@/components/ReadingLifePath'
import DescriptionLifePath from '@/components/DescriptionLifePath'

export default {
  name: 'LifePath',
  components: {
    ReadingLifePath,
    DescriptionLifePath,
  }
}
</script>

<style scoped lang='sass'>
  .lifepath
    display: flex
    height: 100vh
    max-width: 100%
    position: relative
    text-align: center
    width: 100vw
</style>
