<template>
  <div class='menu-content menu-saved'>
    <h2>Saved Readings</h2>
    <Button v-for='(read, index) in savedReadings'
      :saved=true
      :name='index'
      :date='read.date'
      :title='read.title'
      :spreadKey='read.spread'
      :key='index'
      />
  </div>
</template>
<script>
// @ is an alias to /src
import Button from '@/components/ButtonSavedReading'
import { mapState } from 'vuex'

export default {
  name: 'Menu',
  components: {
    Button
  },
  computed: {
    ...mapState(['savedReadings'])
  },
  methods: {

  }
}
</script>
<style scoped lang='sass'>
  @import '../assets/sass/menu'
</style>
