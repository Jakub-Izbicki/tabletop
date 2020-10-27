<template>
  <Moveable class="moveable
                   absolute
                   h-0 w-0
                   transform"
            :class="[{'transition-transform': isMovingAnimate},
                     {'duration-200' : isMovingAnimate},
                     {'pointer-events-none': isNonePointerEvents},
                     {'cursor-grab': !isDragged},
                     {'cursor-grabbing': isDragged},
                     {'z-onTop': isDragged}]"
            :style="transformStyle"
            v-bind="moveable"
            @drag="onDeckCardDrag"
            @dragEnd="onDeckCardDragEnd">
    <div class="absolute
                pointer-events-none
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
                  transition-transform
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-cardItem
                  card-flip-perspective"
           :class="{'duration-200': !isSkipAnimation}"
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
            <p class="text-cardBackLabel
                      font-wizard">w</p>
          </div>
          <div class="absolute
                      pointer-events-none
                      h-cardItem w-cardItem
                      rounded-cardItem"
               :class="[{'bg-green-100': isHover},
                        {'bg-opacity-25': isHover},
                        {'shadow-hoverTarget': isHover || isMouseOver}]">
          </div>
        </div>
      </div>
    </div>
    <div :id="id"
         class="absolute
                pointer-events-none
                h-cardItem
                w-cardItem
                rounded-cardItem
                transform
                -translate-x-1/2
                -translate-y-1/2"
         :style="rotationStyle"
         @mouseover.stop="onMouseOver"
         @mouseout.stop="onMouseOut"
         v-hotkey="keymap">
      <div class="pointer-events-auto
                  h-cardItemHalf
                  w-cardItem">
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
import Hand from "@/domain/game/hoverable/Hand";

@Component
export default class DeckCardComponent extends mixins<BaseCardComponent<DeckCard>, HoverableComponent<DeckCard>>(BaseCardComponent, HoverableComponent) {

  @Prop({type: String, required: true})
  private readonly deckId!: string;

  protected triggerOnNoHoverable = true;

  // eslint-disable-next-line
  protected onDeckCardDrag(movableEvent: any) {
    movableEvent.inputEvent.preventDefault();
    this.onItemDrag(movableEvent);
  }

  // eslint-disable-next-line
  protected onDeckCardDragEnd(movableEvent: any) {
    movableEvent.inputEvent.preventDefault();
    this.onItemDragEnd();
  }

  protected onDrop(target: Hoverable | undefined): void {
    if (!target) {
      this.moveOntoBoard();
    } else {
      switch (target.constructor) {
        case Deck:
          this.onDropOnDeck(target as Deck);
          break;
        case Hand:
          this.onDropOnHand(target as Hand);
          break;
        default:
          throw `Invalid DeckCardComponent.onDrop() invocation with target: ${JSON.stringify(target)}`;
      }
    }
  }

  private onDropOnDeck(deck: Deck): void {
    if (deck.getId() === this.item.getDeckId()) {
      this.animateMoveToOwnDeck();
    }
  }

  private moveOntoBoard(): void {
    const card = this.item.toCard();
    card.setIsSkipAnimation(true);
    card.setDragged(true);

    this.store.getDecks().find(deck => deck.getId() === this.deckId)?.remove(this.id);
    this.store.addItem(card);
    setTimeout(() => {
      card.setIsSkipAnimation(false);
      card.setDragged(false);
    }, 0);
  }

  private animateMoveToOwnDeck() {
    this.item.animateMoveItem({x: 0, y: 0, unit: TranslateUnit.EM});
  }

  private onDropOnHand(hand: Hand): void {
    const handCard = this.item.toHandCard(hand);
    this.store.getDecks().find(deck => deck.getId() === this.deckId)?.remove(this.id);
    this.store.addItem(handCard);

    this.$nextTick(() =>
        this.store.getHandCards().forEach(hc => hc.animateMoveToHandPosition()));
  }
}

</script>

<style scoped>

</style>
