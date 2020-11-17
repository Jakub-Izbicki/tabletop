<template>
  <div v-if="!isNone"
       class="absolute
              pointer-events-none
              flex flex-col items-center justify-center
              h-cardItem w-cardItem
              p-cardInfo
              rounded-cardItem
              bg-orange-300
              text-center
              opacity-95">
    <p class="text-cardInfo">Press</p>
    <p class="inline
              font-keyboard
              text-cardInfoKeyboard
              my-cardInfoKeyboard">
      X
    </p>
    <p class="text-cardInfo">again to remove</p>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {CardInfoMode} from "@/domain/game/GameTypes";

@Component
export default class CardInfo extends Vue {

  @Prop({required: true})
  private cardInfoMode!: CardInfoMode;

  get isNone(): boolean {
    return this.cardInfoMode === CardInfoMode.NONE;
  }
}
</script>

<style scoped>

</style>
