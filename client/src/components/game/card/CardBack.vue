<template>
  <div class="absolute
              pointer-events-none
              h-cardItem w-cardItem
              rounded-cardItem
              bg-purple-400
              flex justify-center items-center
              border-cardBack border-black"
       :class="{'card-face-down': isFaceDown}">
    <p class="text-cardBackLabel
              font-wizard">w</p>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class CardBack extends Vue {

  @Prop({default: true, required: false})
  private isFaceDown!: boolean;
}
</script>

<style scoped>

</style>
