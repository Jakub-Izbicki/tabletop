import {EntityStates} from "@/domain/game/GameTypes";
import {TranslateUnit} from "@/domain/game/GameTypes";
<template>
  <div :id="hoverableAreaElId"
       class="h-cardItem
              flex flex-col justify-center items-center"
       :class="[{'bg-green-400': !isHover},
                {'bg-green-100': isHover}]">
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
  import HandCardComponent from "@/components/game/item/card/HandCardComponent.vue";
  import Card from "@/domain/game/item/Card";
  import HoverableComponent from "@/components/game/item/HoverableComponent";
  import Hand from "@/domain/game/hoverable/Hand";

  @Component({
    components: {HandCardComponent}
  })
  export default class HandComponent extends HoverableComponent<Hand> {

    private hoverableAreaElId = `${this.id}-area`;

    get handCards(): Card[] {
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
