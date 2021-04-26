<template>
  <Card
    :id='id'
    :image='image'
    :name='name'
    :cardkey='cardkey'
    :saved='saved'
    :class='{
      click: click,
      flipped: flipped,
      reversed: reversed
    }'
    @clickAction='reveal'/>
</template>

<script>

import Card from '@/components/Card'
import CardMixins from '@/components/CardMixins'
import eventBus from '@/assets/js/eventBus'
import { mapState } from 'vuex'

export default {
  name: 'CardSpread',
  mixins: [ CardMixins ],
  components: {
    Card
  },
  data () {
    return {
      click: true,
      cross: false,
      flipped: false,
      activeCard: 0
    }
  },
  mounted () {
    this.checkSpread()

    eventBus.$on('fireNextCard', () => {
      this.activeCard++
      this.revealInOrder()
    })
  },
  computed: {
    ...mapState([
      'spreadType',
      'useReversals'
    ]),
    reversed () {
      let reversed = this.savedReverse

      if ( this.saved ) {
        return reversed
      }

      if ( !this.useReversals ) {
        return reversed
      }

      let d = Math.random()
      if (d < .3) {
        reversed = true
      }

      return reversed
    }
  },
  props: {
    position: {
      type: Number,
      required: false
    },
    saved: {
      type: Boolean,
      required: false
    },
    savedReverse: {
      type: Boolean,
      required: false
    }
  },
  methods: {
    checkSpread () {
      const saved = this.$props.saved

      this.cross = this.spreadType === 'celticcross'

      console.log(saved)

      if ( saved ) {
        this.flipped = true
        return
      }

      this.updateReading()

      if ( this.cross ) {
        this.revealInOrder()
        return
      }
    },

    revealInOrder () {
      const active = this.position <= this.activeCard

      this.click = true

      if ( this.cross && !active ) {
        this.click = false
        return
      }
    },

    reveal () {
      if (!this.click) {
        return
      }
      if ( this.flipped ) {
        this.openDescription()
        return
      }

      this.flipped = true

      if (this.cross) {
        eventBus.$emit('fireNextCard')
      }
    },

    updateReading () {
      const a = [this.position, this.cardkey, this.reversed]
      this.$store.commit('updateReading', a)
    }
  }
}
</script>
