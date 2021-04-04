<template>
  <div class='description'
    :class='{open: open}'>
    <div class='close'
      @click='close'>x</div>
    <h2>{{ position.name }}</h2>
    <p>{{ position.description }}</p>
    <img width='100%' :src='img'/>
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
      img: '',
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
      const card = this.cards[p.cardkey]
      const spread = this.spreads[this.spreadType]
      const pos = spread.positions[p.position]
      this.name = card.name
      this.description = card.description[p.direction]
      this.position = {
        name: pos.name,
        description: pos.description
      }
      this.img = require('@/assets/images/cards/' + card.image)
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
    box-sizing: border-box
    color: #fff
    height: 0
    left: 0
    opacity: 0
    right: 0
    text-align: center
    top: 100%
    transition: all .5s ease-out
    width: 100%

    &.open
      bottom: 0
      height: 100%
      opacity: 1
      padding: 40px 20px
      position: absolute
      top: 0
      transition: all .5s ease-in

      img
        max-width: 250px

  .close
    cursor: pointer
    font-size: 50px
</style>
