import {EntityStates} from "@/domain/game/GameTypes";
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
                -translate-y-1/2"
         :class="{'shadow-hoverTarget': isHover}">
      <div class="absolute
                  transform -translate-y-1.5em">
        <button @click="moveToRandomCard">
          card
        </button>
      </div>
      <img class="h-cardItem w-cardItem
                  rounded-cardItem"
           :src="item.getImageUrl()">
      <div class="pointer-events-none
                  absolute
                  top-0
                  h-cardItem w-cardItem
                  rounded-cardItem"
           :class="[{'bg-green-100': isHover},
                    {'bg-opacity-25': isHover}]"></div>
    </div>
  </Moveable>
</template>

<script lang="ts">
  import {Component} from 'vue-property-decorator';
  import {ItemType} from "@/domain/game/GameTypes";
  import Card from "@/domain/game/item/Card";
  import ItemComponent from "@/components/game/item/ItemComponent";
  import {mixins} from "vue-class-component";
  import HoverableComponent from "@/components/game/item/HoverableComponent";
  import Hoverable from "@/domain/game/hoverable/Hoverable";
  import Hand from "@/domain/game/hoverable/Hand";
  import {Timeouts} from "@/domain/game/Timeouts";

  @Component
  export default class CardComponent extends mixins<ItemComponent<Card>, HoverableComponent<Card>>(ItemComponent, HoverableComponent) {

    private moveTime: number = Timeouts.SMALL_MS.valueOf();

    get isHover(): boolean {
      return this.item.isHover();
    }

    get isMovingAnimate(): boolean {
      return this.item.isMovingAnimate();
    }

    get isNonePointerEvents(): boolean {
      return this.item.isNonePointerEvents();
    }

    get isDragged(): boolean {
      return this.item.isDragged();
    }

    protected onDrop(target: Hoverable): void {
      switch (target.constructor) {
        case Card:
          this.onDropOnCard(target as Card);
          break;
        case Hand:
          this.onDropOnHand(target as Hand);
          break;
        default:
          throw `Invalid CardComponent::onDrop invocation with target: ${JSON.stringify(target)}`;
      }
    }

    private moveToRandomCard(): void {
      const other = this.items
      .find(i => i.getItemType() === ItemType.CARD &&
          i.getId() !== this.id) as Card;

      this.item.moveItem(other.getTranslate())
    }

    private onDropOnCard(card: Card): void {
      this.item.animateMoveItem(card.getTranslate());
    }

    private onDropOnHand(hand: Hand): void {
      const handCard = this.item.toHandCard(hand);
      this.store.replaceEntity(this.item.getId(), handCard);
    }
  }
</script>

<style scoped>

</style>
