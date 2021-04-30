<template>
  <Description id='description-seeallcards'>
    <template v-slot:header>
      <h2>
        <div class='prev'
          @click='nextCard("prev")'>
          &lt;
        </div>
        {{ name }}
        <transition name='fade'>
          <span v-if='reversed'>
            (Reversed)
          </span>
        </transition>
        <div class='next'
          @click='nextCard()'>
          &gt;
        </div>
      </h2>
    </template>
    <template v-slot:card>
      <div class='card'
        :class='{ reversed: reversed }'>
        <img :src='img' :alt='name'/>
      </div>
      <div class='seereversemeaning'
        @click='reverseMeaning()'>
        see
        <span v-if='reversed'>
          ↑ upright
        </span>
        <span v-else>
          ↓ reverse
        </span>
        meaning</div>
    </template>
    <template v-slot:content-header>
      <h3>
        <transition name='fade'>
          <span v-if='reversed'>
            Reversed
          </span>
        </transition>
        Meaning
      </h3>
    </template>
  </Description>
</template>

<script>
import Description from '@/components/Description'
import eventBus from '@/assets/js/eventBus'
import cards from '@/assets/js/cards'

export default {
  name: 'DescriptionSeeAllCards',
  data () {
    return {
      img: '',
      key: '',
      keys: [],
      name: '',
      card: {},
      cards: cards,
      reversed: false
    }
  },
  created () {
    eventBus.$on('fireDescribeCard', (p) => {
      if (this.$route.name === 'AllCards') {
        this.describeCard(p)
      }
    })
  },
  components: {
    Description
  },
  methods: {
    nextCard (dir) {
      let index = this.keys.indexOf(this.key)

      dir === 'prev' ? index-- : index++

      const cardkey = this.keys[index]
      const name = this.cards[cardkey].name
      const image = this.cards[cardkey].image

      const p = {
        cardkey: cardkey,
        name: name,
        image: image,
        reversed: this.reversed
      }

      eventBus.$emit('fireDescribeCard', p)
    },
    describeCard (p) {
      const c = this.cards[p.cardkey]
      this.reversed = p.reversed

      this.name = c.name

      this.img = require('@/assets/images/cards/' + p.image)

      this.key = p.cardkey

      this.keys = Object.keys(this.cards)
    },
    reverseMeaning () {
      this.reversed = !this.reversed
      eventBus.$emit('fireReverseMeaning', this.reversed)
    }
  }
}
</script>

<style lang='sass'>
  .description#description-seeallcards
      .card-container
        display: flex
        flex-direction: column

</style>
