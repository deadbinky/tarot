<template>
  <div class='home'>
    <Menu />
    <component v-if='component'
      :is='component'/>
    <component v-if='description'
      :is='description'/>
  </div>
</template>

<script>
// @ is an alias to /src
import Spread from '@/components/Spread'
import LifePath from '@/components/LifePath'
import SeeAllCards from '@/components/SeeAllCards'
import Description from '@/components/Description'
import DescriptionLifePath from '@/components/DescriptionLifePath'
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
    Description,
    DescriptionLifePath
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
   ...mapState([
     'spreadType',
     'component',
     'description'
   ])
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
