<template>
  <div class='menu-content menu-new-readings'>
    <h2>New Reading</h2>
    <Button v-for='(spread, index) in spreads'
      :name='spread.name'
      :spreadKey='index'
      :key='index'
      />
    <a href='/#/LifePath'
      class='lifepath button'
      @click='toggleMenu'>Life Path</a>
  </div>
</template>

<script>
// @ is an alias to /src
import Button from '@/components/ButtonNewReading'
import spreads from '@/assets/js/spreads'

export default {
  name: 'Menu',
  components: {
    Button
  },
  data () {
    return {
      spreads: spreads
    }
  },
  methods: {
    toggleMenu () {
      this.$store.commit('toggleMenu')
    }
  }
}
</script>

<style scoped lang='sass'>
  @import '../assets/sass/menu'

  .lifepath
    display: inline-block
    &:before
      @include little-border-collapsed($lightpink)
      margin-bottom: 20px
      margin-left: 0

  .button
    color: #fff
    cursor: pointer
    display: block
    font-size: 1em
    margin-top: 1em
    text-decoration: none

  .open
    .lifepath:before
      @include little-border-expand(1s)

</style>
