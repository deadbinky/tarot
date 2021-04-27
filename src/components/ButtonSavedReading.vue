<template>
  <Button
    :saved='saved'
    :name='name'
    :spreadKey='spreadKey'>
    <template v-slot:title>
      <h4>{{ readDate }}</h4>
      <span>{{ spreadKey }}</span>
    </template>
  </Button>
</template>

<script>
import Button from '@/components/Button'

export default {
  name: 'ButtonSavedReading',
  components: {
    Button
  },
  props: {
    name: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: false
    },
    saved: {
      type: Boolean,
      required: true
    },
    spreadKey: {
      type: String,
      required: true
    }
  },
  computed: {
    readDate () {
      const d = new Date(this.date)
      const e = new Intl.DateTimeFormat('en').format(d)

      return e
    },
    title () {
      let title = this.name

      return title
    }
  },
  methods: {

  }
}
</script>

<style scoped lang='sass'>
  @import '../assets/sass/_colours'

  .button
    align-items: center
    border-bottom: 1px solid $lightpink
    cursor: pointer
    display: flex
    flex-direction: row
    font-size: 1em
    justify-content: space-between
    margin-top: 1em
    width: 90%

    h4
      display:inline-block

    span
      background: $orange
      border-radius: 20px
      color: $brown
      display: inline-block
      font-size: .5em
      font-weight: bold
      margin-bottom: 5px
      padding: 5px 15px
      text-transform: uppercase
</style>
