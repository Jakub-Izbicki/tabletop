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
    <div class="absolute
                transform
                h-0 w-0
                transition-transform"
         :class="[{'duration-200': !isSkipAnimation},
                  {'-translate-y-itemHover': isMouseOver && !isDragged},
                  {'-translate-y-itemDrag': isMouseOver && isDragged}]">
      <div class="absolute
                  pointer-events-none
                  h-cardItemShadow
                  w-cardItemShadow
                  rounded-cardItem
                  transform
                  transition-transform
                  -translate-x-1/2
                  card-flip-perspective"
           :class="[{'duration-200': !isSkipAnimation},
                    {'-translate-y-1/2': !isMouseOver},
                    {'-translate-y-shadowCardHover': isMouseOver && !isDragged},
                    {'-translate-y-shadowCardDrag': isMouseOver && isDragged}]"
           :style="rotationStyle">
        <div class="transition-transform-shadow
                    h-cardItemShadow
                    w-cardItemShadow
                    rounded-cardItem
                    card-flip-container"
             :class="[{'card-face-down': !isFaceUp},
                      {'duration-200': !isSkipAnimation},
                      {'shadow-card': !isMouseOver},
                      {'shadow-cardHover': isMouseOver && !isDragged},
                      {'shadow-cardDrag': isMouseOver && isDragged}]">
        </div>
      </div>
      <div class="h-cardItem
                  w-cardItem
                  transform
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-cardItem
                  card-flip-perspective"
           :style="rotationStyle">
        <div class="card-flip-container
                    transition-transform"
             :class="[{'card-face-down': !isFaceUp},
                      {'duration-200': !isSkipAnimation}]">
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
                      h-cardItem w-cardItem
                      rounded-cardItem"
               :class="[{'shadow-hoverTarget': isMouseOver}]">
          </div>
        </div>
      </div>
    </div>
    <div :id="id"
         class="absolute h-cardItem
                w-cardItem
                rounded-cardItem
                transform
                -translate-x-1/2
                -translate-y-1/2"
         :style="rotationStyle"
         @mouseover="onMouseOver"
         @mouseout="onMouseOut"
         v-hotkey="keymap">
    </div>
  </Moveable>
</template>

<script lang="ts">
  import {Component} from 'vue-property-decorator';
  import HandCard from "@/domain/game/item/HandCard";
  import Hoverable from "@/domain/game/interface/Hoverable";
  import Hand from "@/domain/game/hoverable/Hand";
  import BaseCardComponent from "@/components/game/interface/BaseCardComponent";
  import DeckCard from "@/domain/game/item/DeckCard";
  import {TranslateUnit} from "@/domain/game/GameTypes";

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
          case DeckCard:
            this.onDropOnDeck(target as DeckCard);
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
      card.setIsSkipAnimation(true);
      card.setDragged(true);

      this.store.replaceEntity(this.item.getId(), card);
      this.store.getHandCards().forEach(handCard => handCard.animateMoveToHandPosition());
      setTimeout(() => {
        card.setIsSkipAnimation(false);
        card.setDragged(false);
      }, 0);
    }

    private onDropOnDeck(currentDeckTopCard: DeckCard) {
      const newDeckCard = this.item.toDeckCard(currentDeckTopCard);
      this.store.removeEntity(this.id);
      this.store.getDecks().find(deck => deck.getId() === newDeckCard.getDeckId())
      ?.pushOnTop(newDeckCard);

      this.$nextTick(() => {
        newDeckCard.animateMoveItem({x: 0, y: 0, unit: TranslateUnit.EM});
        this.store.getHandCards().forEach(hc => hc.animateMoveToHandPosition());
      });
    }
  }
</script>

<style scoped>

</style>
