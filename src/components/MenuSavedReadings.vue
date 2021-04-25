<template>
  <div class='menu-saved'>
    <h2>Saved Readings</h2>
    <Button v-for='(read, index) in savedReadings'
      :saved=true
      :name='index'
      :key='index'
      />
  </div>
</template>
<script>
// @ is an alias to /src
import Button from '@/components/Button'
import { mapState } from 'vuex'

export default {
  name: 'Menu',
  components: {
    Button
  },
  computed: {
    ...mapState(['savedReadings'])
  },
  mounted () {
    console.log('from menu', this.savedReadings)
  },
  methods: {

  }
}
</script>
<style scoped lang='sass'>
  @import '../assets/sass/menu'

</style>
