<template>
  <Moveable class="moveable
                   absolute
                   top-0 left-0
                   h-0 w-0
                   transform"
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
           src="https://img.scryfall.com/cards/large/front/8/a/8a299a1e-1ce9-4668-a5f5-c587081acf6b.jpg?1594737787">
    </div>
  </Moveable>
</template>

<script lang="ts">
  import {Component} from 'vue-property-decorator';
  import ItemComponent from "@/components/game/item/ItemComponent";
  import HandCard from "@/domain/game/item/HandCard";
  import Hoverable from "@/domain/game/hoverable/Hoverable";
  import Hand from "@/domain/game/hoverable/Hand";
  import {Translate} from "@/domain/game/GameTypes";

  @Component
  export default class HandCardComponent extends ItemComponent<HandCard> {

    get handCardOffset(): number | undefined {
      return this.item?.handCardOffset();
    }

    get translate(): Translate {
      const translate = this.item?.getTranslate();
      const offset = this.handCardOffset;

      if (translate && offset) {
        return {
          x: translate.x + offset,
          y: translate.y,
          unit: translate.unit
        };
      } else {
        return translate;
      }
    }

    protected onDrop(target: Hoverable): void {
      switch (target.constructor) {
        case Hand:
          this.onDropOnHand(target as Hand);
          break;
        default:
          throw `Invalid CardComponent::onDrop invocation with target: ${JSON.stringify(target)}`;
      }
    }

    private moveToHand(): void {
      this.item.moveToHand();
    }

    private onDropOnHand(hand: Hand) {
      this.item.moveItemTo(hand.getId());
    }
  }
</script>

<style scoped>

</style>
