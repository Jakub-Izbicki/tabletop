import {TranslateUnit} from "@/domain/game/GameTypes";
<template>
  <Moveable class="moveable
                   absolute
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
         :class="{'shadow-hoverTarget': isHover}"
         @mouseover.stop="onMouseOver"
         @mouseout.stop="onMouseOut"
         v-hotkey="keymap">
      <div class="card-flip-container"
           :class="{'card-face-down': !isFaceUp}">
        <img class="absolute
                    h-cardItem w-cardItem
                    rounded-cardItem
                    hidden-backface"
             :src="item ? item.getImageUrl() : ''">
        <div class="absolute
                    h-cardItem w-cardItem
                    rounded-cardItem
                    bg-purple-400
                    flex justify-center items-center
                    border-cardBack border-black
                    card-face-down hidden-backface">
          <p class="text-cardBackLabel">Card Back</p>
        </div>
        <div class="pointer-events-none
                    absolute
                    top-0
                    h-cardItem w-cardItem
                    rounded-cardItem"
             :class="[{'bg-green-100': isHover},
                      {'bg-opacity-25': isHover}]">
        </div>
      </div>
    </div>
  </Moveable>
</template>

<script lang="ts">
  import {mixins} from "vue-class-component";
  import BaseCardComponent from "../interface/BaseCardComponent";
  import HoverableComponent from "../interface/HoverableComponent";
  import {Component, Prop} from "vue-property-decorator";
  import DeckCard from "@/domain/game/item/DeckCard";
  import Hoverable from "@/domain/game/interface/Hoverable";
  import Deck from "@/domain/game/item/Deck";
  import {TranslateUnit} from "@/domain/game/GameTypes";

  @Component
  export default class DeckCardComponent extends mixins<BaseCardComponent<DeckCard>, HoverableComponent<DeckCard>>(BaseCardComponent, HoverableComponent) {

    @Prop({type: String, required: true})
    private readonly handId!: string;

    protected triggerOnNoHoverable = true;

    protected onDrop(target: Hoverable | undefined): void {
      if (!target) {
        console.info('drop on no target')
      } else {
        switch (target.constructor) {
          case Deck:
            this.onDropOnDeck(target as Deck);
            break;
          default:
            throw `Invalid DeckComponent.onDrop() invocation with target: ${JSON.stringify(target)}`;
        }
      }
    }

    private onDropOnDeck(deck: Deck): void {
      if (deck.getId() === this.item.getDeckId()) {
        this.animateMoveToOwnDeck();
      }
    }

    private animateMoveToOwnDeck() {
      this.item.animateMoveItem({x: 0, y: 0, unit: TranslateUnit.EM});
    }
  }

</script>

<style scoped>

</style>
