<template>
  <div class='menu-content menu-settings'>
    <h2>Settings</h2>
    <Toggle
      :name='useReversals'
      title='Use Reversals'
      />
  </div>
</template>
<script>
import Toggle from '@/components/Toggle'
import { mapState } from 'vuex'

export default {
  name: 'MenuSettings',
  components: {
    Toggle
  },
  computed: {
    ...mapState(['useReversals'])
  }
}
</script>
<style scoped lang='sass'>
  @import '../assets/sass/menu'
</style>
