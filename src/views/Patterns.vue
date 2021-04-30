<template>
  <div class='stats'>
    <h1>Tarot Stats</h1>
    <h2>Reversals</h2>
    <p>Number of cards reversed, possibly indicating blocked energies</p>
    <h3>Reversed</h3>
    <p>{{ reversals.true }}</p>
    <h3>Upright</h3>
    <p>{{ reversals.false }}</p>

    <h2>Stalker Cards</h2>
    <p>Here are the cards that you keep seeing</p>
    <ul>
      <li v-for='( c, i ) in topKeys.slice(0, 5)' :key='i'>
        {{ cards[c].name }}
        {{ topCards[c] }}
      </li>
    </ul>

    <h2>Most Common Suits</h2>
    <p>Here are the cards that you keep seeing</p>
    <ul>
      <li v-for='( c, i ) in topSuits' :key='i'>
        {{ i }}
        {{ c }}
      </li>
    </ul>

    <h2>Most Common Numbers & Court Cards</h2>
    <p>Here are the cards that you keep seeing</p>
    <ul>
      <li v-for='( c, i ) in topNumberKeys.slice(0, 5)' :key='i'>
        {{ c }}
        {{ topNumbers[c] }}
      </li>
    </ul>

  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import cards from '@/assets/js/cards'

  export default {
    name: 'Patterns',

    data () {
      return {
        cards: cards,
        topCards: {},
        topKeys: [],
        topNumbers: {},
        topSuits: {},
        reversals: {}
      }
    },

    computed: {
      ...mapState(['savedReadings'])
    },

    created () {
      this.getStats()
    },

    methods: {
      getStats () {
        const c = this.savedReadings
        console.log('GETSTATS savedReadings', c)

        this.getTop5Cards(c)
        this.getReversals(c)

        this.topSuits = this.getTop5('suit')
        this.topSuitKeys = Object.keys(this.topSuits)

        this.topNumbers = this.getTop5('number')
        this.topNumberKeys = Object.keys(this.topNumbers)
      },

      getTop5Cards (c) {
        const t = this.extractStat(c, 'cardkey')

        const u = this.analyze(t)

        const v = this.orderResultsByValue(u)

        this.topCards = v
        this.topKeys = Object.keys(v)

        console.log(this.topCards, this.topKeys)
      },

      getReversals (c) {
        const r = this.extractStat(c, 'reversed')

        this.reversals = this.analyze(r)
        console.log(this.reversals)
      },

      getTop5 (a) {
        const t = this.buildData(this.topCards, this.cards, a)

        const u = this.analyze(t)

        const v = this.orderResultsByValue(u)

        return v
      },

      buildData (a, b, c) {
        const d = []
        for (const prop of Object.keys(a)) {
          console.log(b[prop][c])
          d.push(b[prop][c])
        }
        return d
      },

      extractStat (c, p) {
        const a = []
        for (const prop of Object.keys(c)) {
          const d = c[prop].cards
          const e = this.requestKey(d, p)
          a.push(e)
        }

        const b = [].concat.apply([], a)

        return b
      },

      requestKey (c, p) {
        const a = []

        for (const prop of Object.keys(c)) {
          a.push(c[prop][p])
        }

        return a
      },

      analyze (x) {
        const y = {}
        for (const z of x) {
          y[z] = (y[z]+1) || 1
        }
        return y
      },

      orderResultsByValue (c) {
        const result = Object
        .entries(c)
        .sort((a, b) => b[1] - a[1])
        .reduce((_sortedObj, [k,v]) => ({
          ..._sortedObj,
          [k]: v
        }), {})

        console.log('orderResultsByValue', result)
        return result
      }
    }
  }
</script>

<style scoped lang='sass'>
  .stats
    display: flex
    flex-direction: column
    height: 100vh
    max-width: 100%
    position: relative
    text-align: center
    width: 100vw

</style>
