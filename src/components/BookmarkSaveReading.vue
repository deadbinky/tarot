<template>
  <div>
    <div class='save-reading'
      :class='{
        saved: saved,
        show: savedShow
      }'
      @click='saveOrRemove()'>
    </div>
    <div class='notes'
      :class='{
        show: notesShow,
      }'
      @click='showNotes()'>
    </div>
    <div class='save-reading-modal'
      :class='{
        open: open,
        read: disabled
        }'>
      <div class='close' @click='toggleModal()'>+</div>
      <label v-if='disabled'>Date</label>
      <h2 v-if='disabled'>{{ this.date }}</h2>
      <label>Title</label>
      <input name='title'
        :disabled='disabled'
        maxlength='30'
        :class='{error: titleError}'
        v-model='title'
        type='text'/>
      <label>Notes</label>
      <textarea name='notes'
        :disabled='disabled'
        maxlength='280'
        :class='{error: notesError}'
        v-model='notes'
        type='text'/>
      <div class='button edit' v-if='disabled' @click='editSaveDetails'></div>
      <div class='button' v-if='!disabled' @click='submitSaveDetails'>save</div>
    </div>
  </div>
</template>

<script>
  import eventBus from '@/assets/js/eventBus'
  import utility from '@/assets/js/utilityFunctions'
  import { mapState } from 'vuex'

  export default {
    name: 'SaveReading',
    components: {
    },
    created () {
      eventBus.$on('fireChangeSpread', (p) => {
        this.readSavedReading(p)
      })
      eventBus.$on('fireEndReading', () => {
        this.savedShow = true
      }),
      eventBus.$on('fireUseReversals', () => {
        this.saved = false
      })
      eventBus.$on('fireCloseDescription', () => {
        this.open = false
      })
      this.createReadingID()
    },
    data () {
      return {
        name: '',
        open: false,
        saved: false,
        title: '',
        titleError: false,
        notes: '',
        notesError: false,
        savedShow: false,
        notesShow: false,
        disabled: false
      }
    },
    computed: {
      ...mapState(['savedReadings', 'reading']),
      date () {
        return utility.formatDateUS(this.reading.date)
      }
    },
    methods: {
      createReadingID () {
        const date = Date()
        const d = utility.formatDate(date)
        const id = d.join('-')
        this.$store.dispatch('clearReading')
        this.$store.commit('createReading', id)
        this.$store.commit('updateReadingDate', date)
      },

      readSavedReading (p) {
        if (!p.saved) {
          this.savedShow = false
          this.saved = false
          this.notesShow = false
          this.createReadingID()
        }
        else {
          this.savedShow = true
          this.name = p.name
          this.saved = true
          this.notesShow = true
          console.log('read saved reading')
        }
      },

      showNotes () {
        this.open = true
        this.disabled = true
        this.title = this.reading.title
        this.notes = this.reading.notes
      },

      saveOrRemove () {
        console.log('saved')
        this.saved = !this.saved
        if (!this.saved) {
          this.removeReading()
          return
        }
        this.toggleModal()
      },

      removeReading () {
        console.log('removeReading')
        this.reset(false)
        this.$store.dispatch('removeReading')
      },

      toggleModal () {
        this.open = !this.open

        console.log('this.showNotes', this.notesShow)

        if (!this.open && !this.notesShow) {
          console.log('do not save')
          this.reset(false)
        }
      },

      reset (saved) {
        this.disabled = false
        this.open = false
        this.title = ''
        this.notes = ''

        if (!saved) {
          this.saved = false
          this.notesShow = false
          return
        }
        console.log('show notes')
        this.notesShow = true
      },

      editSaveDetails () {
        this.disabled = false
      },

      submitSaveDetails () {
        if (this.title === '' || this.title === null || this.title.value === 0){
            this.titleError=true
            return
        }

        if (this.notes === '' || this.notes === null || this.notes.value === 0){
            this.notesError=true
            return
        }

        const p = {
          title: this.title,
          notes: this.notes
        }

        this.saveReading(p)

        this.reset(true)
      },

      saveReading (p) {
        this.$store.dispatch('saveReading', p)
      }
    }
  }
</script>

<style scoped lang='sass'>
  @import '../assets/sass/_colours'
  @import '../assets/sass/_svgs'

  @mixin icon()
    background-size: cover
    bottom: 0
    content: ''
    height: 30px
    left: 0
    margin: auto
    position: absolute
    right: 0
    top: 0
    width: 30px

  @mixin ribbon($color)
    border-radius: 0 0 20px 20px
    color: #fff
    cursor: pointer
    font-size: 30px
    height: 65px
    padding-top: 10px
    position: absolute
    right: 5px
    text-align: center
    top: -100px
    width: 60px
    z-index: 4
    transition: all 0 ease-in

    &:before
      border: 30px solid $color
      border-bottom: 30px solid transparent
      border-top-width: 75px
      bottom: -30px
      content: ''
      left: 0
      position: absolute
      right: 0
      transition: all 0 ease-in

    &:after
      @include icon()

  .save-reading
    @include ribbon($mediumpink)

    &:after
      background-image: url($heartStroke)

    &.saved
      top: 0
      transition: all .5s ease-in

      &:before
        border-color: $darkpink
        border-bottom-color: transparent
        transition: all .5s ease-in

      &:after
        background-image: url($heartFilled)

    &.show
      top: 0
      transition: all .5s ease-in


  .save-reading-modal
    background: $brown
    border-radius: 30px
    bottom: 0
    box-sizing: border-box
    height: 420px
    left: 0
    margin: auto
    opacity: 0
    position: fixed
    top: 0
    right: 0
    width: 300px
    z-index: 4
    transform: translateY(1000px)
    transition: all .5s ease-in

    &.open
      opacity: 1
      transform: translateY(0)

    &.read
      height: 480px

    h2
      color: $lightbrown
      font-size: 1.2em
      margin: 0
      padding: 0

    label
      color: #fff
      display: block
      font-size: .75em
      margin-bottom: 5px
      margin-top: 15px
      margin-left: 30px
      text-align: left
      text-transform: uppercase

      &:nth-of-type(1)
        margin-top: 30px


    input[type='text'], textarea
      border-radius: 30px
      display: block
      margin: auto
      width: 260px
      transition: all .25s ease-in

      &.error
        background-color: $darkpink

      &[disabled]
        background: $brown
        border-color: transparent
        color: $lightbrown

    input[type='text']
      font-size: 1.2em

    textarea
      font-size: 1em
      height: 190px

    .button
      background: $mediumpink
      border-radius: 30px
      color: #fff
      cursor: pointer
      display: inline-block
      font-size: .75em
      margin-top: 15px
      padding: 15px
      position: relative
      text-transform: uppercase

      &.edit
        height: 25px
        width: 25px

      &.edit:before
        @include icon()
        background-image: url($pencil)

    .close
      background: $brown
      border-radius: 40px
      color: #fff
      cursor: pointer
      font-size: 35px
      height: 40px
      line-height: 43px
      left: 50%
      position: absolute
      top: -20px
      width: 40px
      transform: translateX(-50%) rotate(45deg)

  .notes
    @include ribbon($orange)
    top: -100px
    z-index: 3

    &.show
      top: 75px
      transition: all .45s ease-in .25s

    &:after
      background-image: url($book)
      top: 20px


</style>
