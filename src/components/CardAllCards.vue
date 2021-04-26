<template>
  <Card
    :id='id'
    :name='name'
    :image='image'
    :cardkey='cardkey'
    :class='{
      click: true,
      flipped: true
    }'
    @clickAction='openDescription'/>
</template>

<script>
import Card from '@/components/Card'
import CardMixins from '@/components/CardMixins'

export default {
  name: 'CardAllCards',
  mixins: [ CardMixins ],
  components: {
    Card
  }
}
</script>
