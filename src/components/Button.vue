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
    },
    id: {
      type: String,
      required: true
    }
  },
  methods: {
    changeSpread () {
      eventBus.$emit('fireChangeSpread')
      this.$store.commit('changeSpread', this.$vnode.key)
    }
  }
}
</script>

<style scoped lang='sass'>
  .button
    cursor: pointer
</style>
