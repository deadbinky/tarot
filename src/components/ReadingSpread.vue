<template>
  <component :is='component' v-if='component'/>
</template>

<script>
import ReadingNewSpread from '@/components/ReadingNewSpread'
import ReadingSavedSpread from '@/components/ReadingSavedSpread'
import { mapState } from 'vuex'


export default {
  name: 'Spread',
  components: {
    ReadingNewSpread,
    ReadingSavedSpread
  },
  computed: {
    ...mapState(['component'])
  },

 }
</script>
