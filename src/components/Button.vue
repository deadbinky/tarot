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
    }
  },
  methods: {
    changeSpread () {
      if (this.$route.name !== 'Spread') {
        this.$router.push('/')
      }
      eventBus.$emit('fireCloseMenu')
      eventBus.$emit('fireCloseDescription')

      if (this.saved) {
        //do other shit
        return
      }
      this.$store.commit('changeSpread', this.$vnode.key)
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
