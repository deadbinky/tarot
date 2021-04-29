<template>
  <Button
    :saved='saved'
    :name='name'
    :spreadKey='spreadKey'
    @clickAction='openReading()'
    >
    <template v-slot:title>
      <h4>{{ readDate }}</h4>
      <span>{{ spreadKey }}</span>
      <h3>{{ title }}</h3>
    </template>
  </Button>
</template>

<script>
import Button from '@/components/Button'
import utility from '@/assets/js/utilityFunctions'

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
    title: {
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
      return utility.formatDateUS(this.date)
    }
  },
  methods: {
    openReading () {
      this.$store.commit( 'openReading', this.name )
      this.$store.commit( 'toggleMenu' )

      //bookmark stuff?


      if ( this.$route.name !== 'Spread' ) {
        this.$router.push('/')
      }

      this.$root.$emit( 'readSavedReading' )
    }
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
    flex-wrap: wrap
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

    h3
      color: $lightpink
      flex-basis: 100%
      flex-grow: 1
</style>
