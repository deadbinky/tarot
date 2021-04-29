<template>
  <div class='home'>
    <ReadingNewSpread/>
    <DescriptionCard/>
    <BookmarkSaveReading />
  </div>
</template>

<script>
// @ is an alias to /src
import BookmarkSaveReading from '@/components/BookmarkSaveReading'
import ReadingNewSpread from '@/components/ReadingNewSpread'
import DescriptionCard from '@/components/DescriptionCard'
import { mapState } from 'vuex'

export default {
  name: 'Home',
  components: {
    BookmarkSaveReading,
    ReadingNewSpread,
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
