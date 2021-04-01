<template>
  <div class='home'>
    <Button
      v-for='(spread, index) in spreads'
      :name='spread.name'
      :key='index'
      />
    <Spread />
    <Description />
  </div>
</template>

<script>
// @ is an alias to /src
import Button from '@/components/Button'
import Spread from '@/components/Spread'
import Description from '@/components/Description'
import spreads from '@/assets/js/spreads'

export default {
  name: 'Home',
  components: {
    Button,
    Spread,
    Description
  },
  data () {
    return {
      spreads: spreads
    }
  }
}
</script>

<style scoped lang='sass'>
  .home
    height: 100%
    position: relative
    width: 100%
