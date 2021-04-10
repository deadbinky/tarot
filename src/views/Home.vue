<template>
  <div class='home'>
    <Menu />
    <component v-if='component'
      :is='component'/>
    <Description />
  </div>
</template>

<script>
// @ is an alias to /src
import Spread from '@/components/Spread'
import LifePath from '@/components/LifePath'
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
    LifePath,
    SeeAllCards,
    Description
  },
  data () {
    return {
    }
  },
  created () {
    eventBus.$on('fireChangeSpread', () => {
      this.checkSpread()
    })
  },
  computed: {
   ...mapState(['spreadType', 'component'])
  },
  methods: {
    checkSpread () {

    }
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
