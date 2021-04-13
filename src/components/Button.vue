<template>
  <div class='button'
    :class='name'
    :component='component'
    @click='changeSpread'>
    {{ name }}
  </div>
</template>

<script>
import eventBus from '@/assets/js/eventBus'

export default {
  name: 'Button',
  props: {
    component: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  methods: {
    changeSpread () {
      this.$store.commit('changeComponent', this.component)
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
    font-size: 1em
    margin-top: 1em
</style>
