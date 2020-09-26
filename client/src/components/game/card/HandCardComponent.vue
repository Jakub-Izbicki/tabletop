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
                -translate-y-1/2">
      <img v-if="isFaceUp"
           class="h-cardItem
                  w-cardItem
                  rounded-cardItem"
           :src="item.getImageUrl()">
      <div v-if="!isFaceUp"
           class="h-cardItem w-cardItem
                  rounded-cardItem
                  bg-purple-400
                  flex justify-center items-center
                  border-4 border-black">
        <p class="text-3xl">Card Back</p>
      </div>
    </div>
  </Moveable>
</template>

<script lang="ts">
  import {Component} from 'vue-property-decorator';
  import ItemComponent from "@/components/game/interface/ItemComponent";
  import HandCard from "@/domain/game/item/HandCard";
  import Hoverable from "@/domain/game/interface/Hoverable";
  import Hand from "@/domain/game/hoverable/Hand";

  @Component
  export default class HandCardComponent extends ItemComponent<HandCard> {

    protected triggerOnNoHoverable = true;

    get isFaceUp(): boolean {
      return this.item.getIsFaceUp();
    }

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
