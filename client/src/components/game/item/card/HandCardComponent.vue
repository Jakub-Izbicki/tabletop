<template>
  <Moveable class="moveable
                   absolute
                   top-0 left-0
                   h-0 w-0
                   transform"
            :class="[{'cursor-grab': !isDragged},
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
      <div class="absolute
                  transform -translate-y-1.5em">
        <button @click="moveToHand">
          handcard
        </button>
      </div>
      <img class="h-cardItem
                  w-cardItem
                  rounded-cardItem"
           :src="item.getImageUrl()">
    </div>
  </Moveable>
</template>

<script lang="ts">
  import {Component} from 'vue-property-decorator';
  import ItemComponent from "@/components/game/item/ItemComponent";
  import HandCard from "@/domain/game/item/HandCard";
  import Hoverable from "@/domain/game/hoverable/Hoverable";
  import Hand from "@/domain/game/hoverable/Hand";

  @Component
  export default class HandCardComponent extends ItemComponent<HandCard> {

    protected onDrop(target: Hoverable): void {
      switch (target.constructor) {
        case Hand:
          this.onDropOnHand();
          break;
        default:
          throw `Invalid CardComponent.onDrop() invocation with target: ${JSON.stringify(target)}`;
      }
    }

    private moveToHand(): void {
      this.item.moveToHandPosition();
    }

    private onDropOnHand() {
      this.moveToHand();
    }
  }
</script>

<style scoped>

</style>
