<template>
  <div class='description'
    :class='{open: open}'>
    <div class='close'
      @click='close'>x</div>
    <h2>{{ position.name }}</h2>
    <p>{{ position.description }}</p>
    <img :src='{ image }'/>
    <h3>{{ name }}</h3>
    <p>{{ description }}</p>
  </div>
</template>

<script>
import eventBus from '@/assets/js/eventBus'
import cards from '@/assets/js/cards'
import spreads from '@/assets/js/spreads'
import { mapState } from 'vuex'

export default {
  name: 'Description',
  data () {
    return {
      cards: cards,
      name: '',
      image: '',
      description: '',
      position: {},
      open: false,
      spreads: spreads
    }
  },
  created () {
    eventBus.$on('fireDescribeCard', (p) => {
      this.describeCard(p)
    })
    eventBus.$on('fireCloseDescription', () => {
      this.close()
    })
    console.log(this.spreadType, this.spreads[this.spreadType])
  },
  computed: {
    ...mapState(['spreadType'])
  },
  methods: {
    describeCard (p) {
      this.open = true
      const card = this.cards[p.key]
      const spread = this.spreads[this.spreadType]
      const pos = spread.positions[p.position]

      console.log(pos)
      this.name = card.name
      this.image = card.image
      this.description = card.description[p.direction]
      this.position = {
        name: pos.name,
        description: pos.description
      }
    },
    close () {
      this.open = false
    }
  }
}
</script>

<style scoped lang='sass'>
  .description
    background: #000
    color: #fff
    opacity: 0
    text-align: center

    &.open
      bottom: 0
      height: 100%
      left: 0
      opacity: 1
      position: absolute
      right: 0
      top: 0
      width: 100%

  .close
    cursor: pointer
</style>
