<template>
  <Description>
    <template v-slot:header>
      <h2>{{ position.name }}</h2>
      <p>{{ position.description }}</p>
    </template>
    <template v-slot:card>
      <div class='card'
        :class='{ reversed: reversed }'>
        <img :src='img' :alt='name'/>
      </div>
    </template>
    <template v-slot:content-header>
      <h3>
        {{ name }}
        <transition name='fade'>
          <span v-if='reversed'>
            (Reversed)
          </span>
        </transition>
      </h3>
    </template>
  </Description>
</template>

<script>
import Description from '@/components/Description'
import eventBus from '@/assets/js/eventBus'
import spreads from '@/assets/js/spreads'
import cards from '@/assets/js/cards'
import utility from '@/assets/js/utilityFunctions'
import { mapState } from 'vuex'

export default {
  name: 'DescriptionCard',
  data () {
    return {
      reversed: false,
      spreads: spreads,
      position: {},
      cards: cards,
      name: '',
      img: ''
    }
  },
  components: {
    Description
  },
  computed: {
    ...mapState(['spreadType'])
  },
  created () {
    eventBus.$on('fireDescribeCard', (p) => {
      if (this.$route.name === 'Spread') {
        this.describeCard(p)
      }
    })
  },
  methods: {
    describeCard (p) {
      const c = this.cards[p.cardkey]
      this.reversed = p.reversed

      this.name = utility.replace(/%TITLE%/g, c.title, c.name)

      this.img = require('@/assets/images/cards/' + p.image)

      const spread = this.spreads[this.spreadType]
      const pos = spread.positions[p.position]

      this.position = {
        name: pos.name,
        description: pos.description
      }
    }
  }
}
</script>
