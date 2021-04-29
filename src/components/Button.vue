<template>
  <div class='button'
    :saved='saved'
    @click='$emit("clickAction")'>
    <slot name='title'>{{ name }}</slot>
  </div>
</template>

<script>
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
  }
}
</script>

<style scoped lang='sass'>
  .button
    cursor: pointer
    font-size: 1em
    margin-top: 1em
</style>
