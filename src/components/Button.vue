<template>
  <div class='button'
    :saved='saved'
    :class='name'
    @click='changeSpread'>
    {{ name }}
  </div>
</template>

<script>
import eventBus from '@/assets/js/eventBus'

export default {
  name: 'Button',
  props: {
    name: {
      type: String,
      required: true
    },
    saved: {
      type: Boolean,
      required: false
    },
    spreadKey: {
      type: String,
      required: true
    }
  },
  methods: {
    changeSpread () {
      if (this.$route.name !== 'Spread') {
        this.$router.push('/')
      }
      eventBus.$emit('fireCloseMenu')
      eventBus.$emit('fireCloseDescription')

      const p = {
        saved: this.saved,
        name: this.name
      }

      if ( this.saved ) {
        this.$store.commit('openReading', p.name)
      }

      this.$store.commit('changeSpread', this.spreadKey)
      eventBus.$emit('fireChangeSpread', p)
    }
  }
}
</script>

<style scoped lang='sass'>
  .button
    cursor: pointer
    font-size: 1em
    margin-top: 1em
</style>
