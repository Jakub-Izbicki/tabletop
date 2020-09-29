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
            @drag="onDeckDrag"
            @dragEnd="onDeckDragEnd">
    <div :id="id"
         class="h-cardItem
                w-cardItem
                rounded-cardItem
                transform
                -translate-x-1/2
                -translate-y-1/2
                flex items-center justify-center"
         :class="{'shadow-hoverTarget': isHover}">
      <img v-if="secondCard"
           :id="draggableId"
           class="h-cardItem w-cardItem
                  rounded-cardItem"
           :src="secondCard.getImageUrl()">
      <div class="pointer-events-none
                    absolute
                    top-0
                    h-cardItem w-cardItem
                    rounded-cardItem"
           :class="[{'bg-green-100': isHover},
                    {'bg-opacity-25': isHover}]">
      </div>

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
  import {mixins} from "vue-class-component";
  import HoverableComponent from "@/components/game/interface/HoverableComponent";

  @Component({
    components: {DeckCardComponent}
  })
  export default class DeckComponent extends mixins<ItemComponent<Deck>, HoverableComponent<Deck>>(ItemComponent, HoverableComponent) {

    private draggableId = this.id + "-deck-draggable-img";

    get topCard(): DeckCard | null {
      return this.item.getTopCard();
    }

    get secondCard(): DeckCard | null {
      return this.item.getSecondCard();
    }

    // eslint-disable-next-line
    protected onDeckDrag(movableEvent: any) {
      if (movableEvent.inputEvent.target.id === this.draggableId) {
        this.onItemDrag(movableEvent);
      }
    }

    // eslint-disable-next-line
    protected onDeckDragEnd(movableEvent: any) {
      if (movableEvent.inputEvent.target.id === this.draggableId) {
        this.onItemDragEnd();
      }
    }
  }

</script>

<style scoped>

</style>
