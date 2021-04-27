<template>
  <div class='home'>
    <div class='save-reading'
      :class='{
        saved: saved,
        show: savedShow
      }'
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
      saved: false,
      savedShow: false
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
    eventBus.$on('fireEndReading', () => {
      this.savedShow = true
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
        this.savedShow = false
        this.saved = false
        this.createReadingID()
      }
      else {
        this.savedShow = true
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
  @import '../assets/sass/_colours'

  .home
    display: flex
    height: 100vh
    max-width: 100%
    position: relative
    text-align: center
    width: 100vw

  .save-reading
    background: $mediumpink
    border-radius: 0 0 20px 20px
    color: #fff
    cursor: pointer
    font-size: 30px
    padding-top: 10px
    position: absolute
    right: 5px
    text-align: center
    top: -100px
    width: 60px
    z-index: 4
    transition: all 0 ease-in

    &.saved
      background: $darkpink
      top: 0
      transition: all .5s ease-in

    &.show
      top: 0
      transition: all .5s ease-in

    &:before
      border: 30px solid $mediumpink
      border-bottom: 30px solid transparent
      border-top-width: 75px
      bottom: -30px
      content: ''
      left: 0
      position: absolute
      right: 0
      transition: all 0 ease-in

    &.saved:before
      border-color: $darkpink
      border-bottom-color: transparent
      transition: all .5s ease-in

    &:after
      content: '♡'
      position: relative

    &.saved:after
      content: '♥'


    //  &:after
    //    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath strokeLinecap='round' strokeLinejoin='round' strokeWidth=%7B2%7D d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' /%3E%3C/svg%3E")
    //    content: ''
    //    position: relative

    //  &.saved:after
    //    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='currentColor' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath strokeLinecap='round' strokeLinejoin='round' strokeWidth=%7B2%7D d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' /%3E%3C/svg%3E")

    //    content: ''

</style>
