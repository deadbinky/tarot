<template>
  <div></div>
</template>

<script>
import eventBus from '@/assets/js/eventBus'

export default {
  name: 'Card',
  props: {
    id: {
      type: String,
      required: false
    },
    image: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    cardkey: {
      type: String,
      required: true
    }
  },
  computed: {
    bg () {
      const bg = require('@/assets/images/cards/' + this.image)
      return {
        'background-image': 'url(' + bg + ')'
      }
    }
  },
  created () {
    eventBus.$on('fireOpenDescription', () => {
      console.log('fireOpenDescription')
      this.openDescription()
    })
  },
  methods: {
    openDescription () {
      const p = {
        cardkey: this.cardkey,
        name: this.name,
        image: this.image,
        reversed: this.reversed,
        position: this.position
      }
      eventBus.$emit('fireDescribeCard', p)
    }
  }
}
</script>
