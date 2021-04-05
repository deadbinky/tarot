<template>
  <div class='description'
    :class='{open: open}'>
    <img :src='img'/>
    <div class='close'
      @click='close'>x</div>
    <h2>{{ position.name }}</h2>
    <p>{{ position.description }}</p>
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
    height: 100%
    left: 0
    margin-left: auto
    margin-right: auto
    opacity: 0
    overflow: hidden
    padding: 40px 20px
    position: absolute
    right: 0
    text-align: left
    top: 0
    width: 80%
    z-index: -9999
    transition: opacity 0.5s ease-in, z-index 0s .6s

    &.open
      opacity: 1
      z-index: 5
      transition: opacity 0.5s ease-in

    img
      float: left
      margin-right: 10px
      width: 175px

  .close
    cursor: pointer
    font-size: 50px
    position: absolute
    right: 1em
    top: 1em
</style>
