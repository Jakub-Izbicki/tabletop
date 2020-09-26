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
         :class="{'shadow-hoverTarget': isHover}"
         @mouseover="onMouseOver"
         @mouseout="onMouseOut"
         v-hotkey="keymap">
      <img v-if="isFaceUp"
           class="h-cardItem w-cardItem
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
  import Card from "@/domain/game/item/Card";
  import ItemComponent from "@/components/game/interface/ItemComponent";
  import {mixins} from "vue-class-component";
  import HoverableComponent from "@/components/game/interface/HoverableComponent";
  import Hoverable from "@/domain/game/interface/Hoverable";
  import Hand from "@/domain/game/hoverable/Hand";
  import {Timeouts} from "@/domain/game/util/Timeouts";

  @Component
  export default class CardComponent extends mixins<ItemComponent<Card>, HoverableComponent<Card>>(ItemComponent, HoverableComponent) {

    private moveTime: number = Timeouts.SMALL_MS.valueOf();

    get isFaceUp(): boolean {
      return this.item.getIsFaceUp();
    }

    get keymap() {
      return {
        'f': {
          keyup: this.flipCard,
        }
      }
    }

    protected onDrop(target: Hoverable | undefined): void {
      if (target) {
        switch (target.constructor) {
          case Card:
            this.onDropOnCard(target as Card);
            break;
          case Hand:
            this.onDropOnHand(target as Hand);
            break;
        }
      } else {
        throw `Invalid CardComponent::onDrop invocation with target: ${JSON.stringify(target)}`;
      }
    }

    private onDropOnCard(card: Card): void {
      this.item.animateMoveItem(card.getTranslate());
    }

    private onDropOnHand(hand: Hand): void {
      this.moveToHand(hand);
    }

    private moveToHand(hand: Hand): void {
      const handCard = this.item.toHandCard(hand);
      this.store.replaceEntity(this.item.getId(), handCard);

      // give vue time to render new HandCardComponent,
      // and only then start moving hand cards to position
      this.$nextTick(() =>
          this.store.getHandCards().forEach(hc => hc.animateMoveToHandPosition()));
    }

    private flipCard(): void {
      if (this.isMouseOver()) {
        this.item.setFaceUp(!this.isFaceUp);
      }
    }
  }
</script>

<style scoped>

</style>
