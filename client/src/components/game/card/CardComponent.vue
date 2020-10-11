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
         :class="{'shadow-hoverTarget': isHover}"
         @mouseover="onMouseOver"
         @mouseout="onMouseOut"
         v-hotkey="keymap">
      <div class="transform
                  transition-transform
                  duration-200
                  h-cardItem
                  w-cardItem
                  card-flip-perspective"
           :class="[{'-translate-y-itemHover': isMouseOver && !isDragged},
                    {'-translate-y-itemDrag': isMouseOver && isDragged}]">
        <div class="card-flip-container"
             :class="{'card-face-down': !isFaceUp}">
          <img class="absolute
                      h-cardItem w-cardItem
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
  import Card from "@/domain/game/item/Card";
  import {mixins} from "vue-class-component";
  import HoverableComponent from "@/components/game/interface/HoverableComponent";
  import Hoverable from "@/domain/game/interface/Hoverable";
  import Hand from "@/domain/game/hoverable/Hand";
  import BaseCardComponent from "@/components/game/interface/BaseCardComponent";
  import DeckCard from "@/domain/game/item/DeckCard";
  import {TranslateUnit} from "@/domain/game/GameTypes";

  @Component
  export default class CardComponent extends mixins<BaseCardComponent<Card>, HoverableComponent<Card>>(BaseCardComponent, HoverableComponent) {

    protected onDrop(target: Hoverable | undefined): void {
      if (target) {
        switch (target.constructor) {
          case Card:
            this.onDropOnCard(target as Card);
            break;
          case Hand:
            this.onDropOnHand(target as Hand);
            break;
          case DeckCard:
            this.onDropOnDeck(target as DeckCard);
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

    private onDropOnDeck(currentDeckTopCard: DeckCard): void {
      this.moveToDeck(currentDeckTopCard);
    }

    private moveToHand(hand: Hand): void {
      const handCard = this.item.toHandCard(hand);
      this.store.replaceEntity(this.item.getId(), handCard);

      // give vue time to render new HandCardComponent,
      // and only then start moving hand cards to position
      this.$nextTick(() =>
          this.store.getHandCards().forEach(hc => hc.animateMoveToHandPosition()));
    }

    private moveToDeck(currentDeckTopCard: DeckCard): void {
      const newDeckCard = this.item.toDeckCard(currentDeckTopCard);
      this.store.removeEntity(this.id);
      this.store.getDecks().find(deck => deck.getId() === newDeckCard.getDeckId())
        ?.pushOnTop(newDeckCard);

      this.$nextTick(
          () => {
            newDeckCard.animateMoveItem({x: 0, y: 0, unit: TranslateUnit.EM})});
    }
  }
</script>

<style scoped>
</style>
