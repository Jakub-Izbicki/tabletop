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
         class="relative
                h-cardItem
                w-cardItem
                rounded-cardItem
                transform
                -translate-x-1/2
                -translate-y-1/2
                card-flip-perspective"
         @mouseover="onMouseOver"
         @mouseout="onMouseOut"
         v-hotkey="keymap">
      <div class="card-flip-container"
           :class="{'card-face-down': !isFaceUp}">
        <img class="absolute
                    h-cardItem
                    w-cardItem
                    rounded-cardItem
                    hidden-backface"
             :src="item.getImageUrl()">
        <div class="absolute
                    h-cardItem w-cardItem
                    rounded-cardItem
                    bg-purple-400
                    flex justify-center items-center
                    border-4 border-black
                    card-face-down hidden-backface">
          <p class="text-3xl">Card Back</p>
        </div>
      </div>
    </div>
  </Moveable>
</template>

<script lang="ts">
  import {Component} from 'vue-property-decorator';
  import HandCard from "@/domain/game/item/HandCard";
  import Hoverable from "@/domain/game/interface/Hoverable";
  import Hand from "@/domain/game/hoverable/Hand";
  import BaseCardComponent from "@/components/game/interface/BaseCardComponent";

  @Component
  export default class HandCardComponent extends BaseCardComponent<HandCard> {

    protected triggerOnNoHoverable = true;

    protected onDrop(target: Hoverable | undefined): void {
      if (!target) {
        this.moveOntoBoard();
      } else {
        switch (target.constructor) {
          case Hand:
            this.onDropOnHand();
            break;
          default:
            throw `Invalid CardComponent.onDrop() invocation with target: ${JSON.stringify(target)}`;
        }
      }
    }

    private onDropOnHand() {
      this.moveToHand();
    }

    private moveToHand(): void {
      this.item.animateMoveToHandPosition();
    }

    private moveOntoBoard() {
      const card = this.item.toCard();
      this.store.replaceEntity(this.item.getId(), card);
      this.store.getHandCards().forEach(handCard => handCard.animateMoveToHandPosition());
    }
  }
</script>

<style scoped>

</style>
