<template>
  <div class='button'
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
    }
  },
  methods: {
    changeSpread () {
      this.$store.commit('changeSpread', this.$vnode.key)
      eventBus.$emit('fireCloseMenu')
      eventBus.$emit('fireCloseDescription')
      eventBus.$emit('fireChangeSpread')
    }
  }
}
</script>

<style scoped lang='sass'>
  .button
    cursor: pointer
    font-size: 1.5em
    margin-top: 5vh
</style>
