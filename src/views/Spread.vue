<template>
  <div class='home'>
    <ReadingSpread/>
    <DescriptionCard/>
    <BookmarkSaveReading />
  </div>
</template>

<script>
// @ is an alias to /src
import BookmarkSaveReading from '@/components/BookmarkSaveReading'
import ReadingSpread from '@/components/ReadingSpread'
import DescriptionCard from '@/components/DescriptionCard'
import { mapState } from 'vuex'

export default {
  name: 'Home',
  components: {
    BookmarkSaveReading,
    ReadingSpread,
    DescriptionCard
  },
  data () {
    return {

    }
  },
  computed: {
    ...mapState(['spreadType'])
  }
}
</script>

<style scoped lang='sass'>
  @import '../assets/sass/_measurements'
  @import '../assets/sass/_colours'

  .home
    display: flex
    height: 100vh
    max-width: 100%
    position: relative
    text-align: center
    width: 100vw

</style>
