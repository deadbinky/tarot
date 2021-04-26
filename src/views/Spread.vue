<template>
  <div class='home'>
    <div class='save-reading'
      :class='{ saved: saved }'
      @click='saveReading()'></div>
    <ReadingSpread/>
    <DescriptionCard/>
  </div>
</template>

<script>
// @ is an alias to /src
import ReadingSpread from '@/components/ReadingSpread'
import DescriptionCard from '@/components/DescriptionCard'
import utility from '@/assets/js/utilityFunctions'
import eventBus from '@/assets/js/eventBus'
import { mapState } from 'vuex'

export default {
  name: 'Home',
  components: {
    ReadingSpread,
    DescriptionCard
  },
  data () {
    return {
      saved: false
    }
  },
  computed: {
    ...mapState(['spreadType'])
  },
  created () {
    eventBus.$on('fireChangeSpread', (p) => {
      this.readSavedReading(p)
    })
    eventBus.$on('fireUseReversals', () => {
      this.saved = false
    })
    this.createReadingID()
  },
  methods: {
    createReadingID () {
      const date = Date()
      const d = utility.formatDate(date)
      const id = d.join('-')
      this.$store.dispatch('clearReading')
      this.$store.commit('createReading', id)
      this.$store.commit('updateReadingDate', date)
    },

    readSavedReading (p) {
      if (!p.saved) {
        this.saved = false
        this.createReadingID()
      }
      else {
        this.saved = true
        console.log('read saved reading')
      }
    },

    removeReading () {
      console.log('removeReading')
      this.$store.dispatch('removeReading')
    },

    saveReading () {
      console.log('saved')
      this.saved = !this.saved
      if (!this.saved) {
        this.removeReading()
        return
      }
      this.$store.dispatch('saveReading')
    }
  }
}
</script>

<style scoped lang='sass'>
  @import '../assets/sass/_measurements'

  .home
    display: flex
    height: 100vh
    max-width: 100%
    position: relative
    text-align: center
    width: 100vw

  .save-reading
    color: #fff
    cursor: pointer
    font-size: 30px
    position: absolute
    right: 20px
    text-align: center
    top: 10px
    width: 30px
    z-index: 9

    &:before
      content: '♡'

    &.saved:before
      content: '♥'

</style>
