<template>
  <div :id="hoverableAreaElId"
       class="h-cardItem
              flex flex-col justify-center items-center"
       :class="{'bg-purple-200': isHover}">
    <div :id="id"
         class="relative
                h-0
                w-0">
      <HandCardComponent v-for="card in handCards"
                         :key="card.getId()"
                         :id="card.getId()"
                         :game-instance-id="gameInstanceId">
      </HandCardComponent>
    </div>
  </div>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import HandCardComponent from "@/components/game/card/HandCardComponent.vue";
import HoverableComponent from "@/components/game/interface/HoverableComponent";
import Hand from "@/domain/game/hoverable/Hand";
import HandCard from "@/domain/game/item/HandCard";

@Component({
  components: {HandCardComponent}
})
export default class HandComponent extends HoverableComponent<Hand> {

  private hoverableAreaElId = `${this.id}-area`;

  get handCards(): HandCard[] {
    return this.store.getHandCards();
  }

  get isHover(): boolean {
    return this.hoverable?.isHover();
  }

  protected getHoverableToRegister(): Hand {
    return new Hand(this.id, this.gameInstanceId, this.hoverableAreaElId);
  }
}
</script>

<style scoped>

</style>
