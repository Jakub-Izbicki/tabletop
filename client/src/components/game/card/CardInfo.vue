<template>
  <div v-if="!isNone"
       class="absolute
              pointer-events-none
              flex items-center justify-center
              h-cardItem w-cardItem
              p-cardInfo
              rounded-cardItem
              bg-orange-300
              text-center
              opacity-95">
    <p class="text-cardInfo">{{ deleteMsg }}</p>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {CardInfoMode} from "@/domain/game/GameTypes";

@Component
export default class CardInfo extends Vue {

  @Prop({required: true})
  private cardInfoMode!: CardInfoMode;

  @Prop({type: String, required: true})
  private deleteMsg!: string;

  get isNone(): boolean {
    return this.cardInfoMode === CardInfoMode.NONE;
  }
}
</script>

<style scoped>

</style>
