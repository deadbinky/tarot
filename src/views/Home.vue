<template>
  <div class='home'>
    <Button
      v-for='(spread, index) in spreads'
      :name='spread.name'
      :key='index'
      />
    <Spread />
    <Description :img='describeImg'/>
  </div>
</template>

<script>
// @ is an alias to /src
import Button from '@/components/Button'
import Spread from '@/components/Spread'
import Description from '@/components/Description'
import spreads from '@/assets/js/spreads'
import eventBus from '@/assets/js/eventBus'

export default {
  name: 'Home',
  components: {
    Button,
    Spread,
    Description
  },
  data () {
    return {
      spreads: spreads,
      describeImg: ''
    }
  },
  created () {
    eventBus.$on('fireDescribeCard', (p) => {
      this.describeImg = p.image
    })
  }
}
</script>

<style scoped lang='sass'>
  .home
    height: 100%
    position: relative
    text-align: center
    width: 100%
</style>
