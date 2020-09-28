<template>
  <Moveable class="moveable
                   absolute
                   top-0 left-0
                   h-0 w-0
                   transform"
            :class="[{'transition-transform': isMovingAnimate},
                     {'duration-100' : isMovingAnimate},
                     {'pointer-events-none': isNonePointerEvents},
                     {'cursor-grab': !isDragged},
                     {'cursor-grabbing': isDragged}]"
            :style="transformStyle"
            v-bind="moveable"
            @drag="onItemDrag"
            @dragEnd="onItemDragEnd">
    <div :id="id"
         class="h-cardItem
                w-cardItem
                rounded-cardItem
                transform
                -translate-x-1/2
                -translate-y-1/2
                flex items-center justify-center">
      <img v-if="secondCard"
           class="h-cardItem w-cardItem
                  rounded-cardItem"
           :src="secondCard.getImageUrl()">
      <DeckCardComponent v-if="topCard"
                         :deck-card="topCard"
                         :id="topCard.getId()"
                         :game-instance-id="item.getGameInstanceId()"
                         :hand-id="id">
      </DeckCardComponent>
    </div>
  </Moveable>
</template>

<script lang="ts">
  import {Component} from "vue-property-decorator";
  import ItemComponent from "@/components/game/interface/ItemComponent";
  import Deck from "@/domain/game/item/Deck";
  import DeckCard from "@/domain/game/item/DeckCard";
  import DeckCardComponent from "@/components/game/deck/DeckCardComponent.vue";

  @Component({
    components: {DeckCardComponent}
  })
  export default class DeckComponent extends ItemComponent<Deck> {

    get topCard(): DeckCard | null {
      const topCard = this.item.getTopCard();
      return topCard;
    }

    get secondCard(): DeckCard | null {
      return this.item.getSecondCard();
    }
  }

</script>

<style scoped>

</style>
