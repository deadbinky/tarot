<template>
  <Button
    :name='name'
    :spreadKey='spreadKey'
    @clickAction='changeSpread()'>
  </Button>
</template>

<script>
import Button from '@/components/Button'

export default {
  name: 'ButtonNewReading',
  components: {
    Button
  },
  props: {
    name: {
      type: String,
      required: true
    },
    spreadKey: {
      type: String,
      required: true
    }
  },
  methods: {
    changeSpread () {
      this.$store.commit( 'changeSpreadType', this.spreadKey )

      this.$store.commit( 'changeReadingType', 'New' )

      this.$store.commit( 'toggleMenu' )

      if ( this.$route.name !== 'Spread' ) {
        this.$router.push('/')
      }

      this.$root.$emit('reshuffle')

    }
  }
}
</script>
