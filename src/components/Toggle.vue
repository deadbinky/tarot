<template>
  <div class='toggle-switch'>
    <label class='switch'>
      <input type='checkbox'
      :checked='this.useReversals'
      @click='this.changeUseReversals'
      />
      <span class='slider'></span>
    </label>
    <span>
      {{ title }}
    </span>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import eventBus from '@/assets/js/eventBus.js'

  export default {
    name: 'Toggle',
    computed: {
      ...mapState(['useReversals'])
    },
    props: {
      title: {
        type: String,
        required: true
      }
    },
    methods: {
      changeUseReversals () {
        const r = !this.useReversals
        console.log('changing useReversals to', r)
        this.$store.commit('changeUseReversals', r)
        eventBus.$emit('fireUseReversals')
      }
    }
  }
</script>

<style scoped lang='sass'>
  @import '../assets/sass/_colours'
  @import '../assets/sass/_easing'

  .toggle-switch
    align-items: center
    flex-direction: row
    display: inline-flex
    justify-content: center

  .switch
    display: inline-block
    height: 34px
    order: 1
    position: relative
    width: 60px

  .switch input
    height: 0
    opacity: 0
    width: 0

  .slider
    background-color: $lightbrown
    border-radius: 34px
    bottom: 0
    cursor: pointer
    left: 0
    position: absolute
    right: 0
    top: 0
    transition: all .4s $easeOutCirc

    &:before
      background-color: #fff
      border-radius: 50%
      bottom: 4px
      content: ''
      height: 26px
      left: 4px
      position: absolute
      width: 26px
      transition: all .4s $easeOutCirc

  input:checked + .slider
    background-color: $mediumpink

    &:before
      transform: translateX(26px)

  span
    order: 2
    padding-left: 1em
</style>
