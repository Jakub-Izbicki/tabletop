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
                     {'cursor-grabbing': isDragged},
                     {'z-onTop': isDragged}]"
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
                -translate-y-1/2"
         @mouseover="onMouseOver"
         @mouseout="onMouseOut"
         v-hotkey="keymap">
      <div class="transform
                  transition-transform
                  transition-shadow
                  duration-200
                  h-cardItem
                  w-cardItem
                  card-flip-perspective"
           :class="[{'-translate-y-itemHover': isMouseOver && !isDragged},
                    {'-translate-y-itemDrag': isMouseOver && isDragged}]">
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
                      border-cardBack border-black
                      card-face-down hidden-backface">
            <p class="text-cardBackLabel">Card Back</p>
          </div>
          <div class="absolute
                      pointer-events-none
                      top-0
                      h-cardItem w-cardItem
                      rounded-cardItem
                      transition-shadow
                      duration-200"
               :class="[{'shadow-card': !isMouseOver},
                        {'shadow-cardHover': isMouseOver && !isDragged},
                        {'shadow-cardDrag': isMouseOver && isDragged}]">
            <div class="h-cardItem w-cardItem
                        rounded-cardItem"
                 :class="{'shadow-hoverTarget': isMouseOver}">
            </div>
          </div>
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
            throw `Invalid HandCardComponent.onDrop() invocation with target: ${JSON.stringify(target)}`;
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
