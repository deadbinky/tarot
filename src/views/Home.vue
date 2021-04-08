<template>
  <div class='home'>
    <Menu />
    <Spread v-if='showSpread'/>
    <SeeAllCards v-if='!showSpread'/>
    <Description />
  </div>
</template>

<script>
// @ is an alias to /src
import Spread from '@/components/Spread'
import SeeAllCards from '@/components/SeeAllCards'
import Description from '@/components/Description'
import Menu from '@/components/Menu'
import eventBus from '@/assets/js/eventBus'
import { mapState } from 'vuex'

export default {
  name: 'Home',
  components: {
    Menu,
    Spread,
    SeeAllCards,
    Description
  },
  data () {
    return {
      showSpread: true
    }
  },
  created () {
    eventBus.$on('fireChangeSpread', () => {
      this.checkSpread()
    })
  },
  computed: {
   ...mapState(['spreadType'])
  },
  methods: {
    checkSpread () {
      this.showSpread = true

      if (this.spreadType === 'seeallcards') {
        this.showSpread = false
      }
      console.log('home: show spread component:', this.showSpread)
    }
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
