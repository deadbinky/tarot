<template>
  <div class='seeallcards'>
    <SeeAllCards/>
    <DescriptionSeeAllCards/>
  </div>
</template>
<script>
// @ is an alias to /src
import SeeAllCards from '@/components/SeeAllCards'
import DescriptionSeeAllCards from '@/components/DescriptionSeeAllCards'

export default {
  name: 'AllCards',
  components: {
    SeeAllCards,
    DescriptionSeeAllCards
  }
}
</script>

<style scoped lang='sass'>
  .seeallcards
    display: flex
    height: 100vh
    max-width: 100%
    position: relative
    text-align: center
    width: 100vw
</style>
