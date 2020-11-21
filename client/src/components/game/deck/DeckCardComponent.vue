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
        <DeckInfo :deck-size="deckSize"
                  :is-dragged-card-or-deck="isDraggedCardOrDeck">
        </DeckInfo>
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
          <CardBack></CardBack>

          <CardInfo :card-info-mode="deckCardInfoModeSynced"></CardInfo>
          <div class="card-face-down hidden-backface">
            <CardInfo :card-info-mode="deckCardInfoModeSynced"></CardInfo>
          </div>

          <div class="absolute
                      h-cardItem w-cardItem
                      rounded-cardItem
                      hidden-backface"
               :class="[{'bg-green-100': isHover},
                        {'bg-opacity-25': isHover},
                        {'shadow-hoverTarget': isHover || isMouseOver}]">
          </div>
          <div class="absolute
                      h-cardItem w-cardItem
                      rounded-cardItem
                      card-face-down hidden-backface"
               :class="[{'bg-green-100': isHover},
                        {'bg-opacity-25': isHover}]">
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
         @mouseout.stop="onMouseOutDeckCard"
         v-hotkey="keymap">
      <div class="h-cardItemHalf
                  w-cardItem"
           :class="[{'pointer-events-auto': !isNonePointerEvents},
                    {'pointer-events-none': isNonePointerEvents}]">
      </div>
    </div>
  </Moveable>
</template>

<script lang="ts">
import {mixins} from "vue-class-component";
import BaseCardComponent from "../interface/BaseCardComponent";
import HoverableComponent from "../interface/HoverableComponent";
import {Component, Prop, PropSync} from "vue-property-decorator";
import DeckCard from "@/domain/game/item/DeckCard";
import Hoverable from "@/domain/game/interface/Hoverable";
import Deck from "@/domain/game/item/Deck";
import {CardInfoMode, TranslateUnit} from "@/domain/game/GameTypes";
import Hand from "@/domain/game/hoverable/Hand";
import CardInfo from "@/components/game/card/CardInfo.vue";
import CardBack from "@/components/game/card/CardBack.vue";
import DeckInfo from "@/components/game/deck/DeckInfo.vue";

@Component({
  components: {DeckInfo, CardBack, CardInfo}
})
export default class DeckCardComponent extends mixins<BaseCardComponent<DeckCard>, HoverableComponent<DeckCard>>(BaseCardComponent, HoverableComponent) {

  @Prop({type: String, required: true})
  private readonly deckId!: string;

  @PropSync('deckCardInfoMode', {required: true})
  private deckCardInfoModeSynced!: CardInfoMode;

  protected triggerOnNoHoverable = true;

  get deck(): Deck | undefined {
    return this.store.getDecks().find(deck => deck.getId() === this.deckId);
  }

  get deckSize(): number | undefined {
    return this.deck?.getCards()?.length;
  }

  get isDraggedCardOrDeck(): boolean {
    return this.deck?.isDragged() || this.isDragged;
  }

  // eslint-disable-next-line
  protected onDeckCardDrag(movableEvent: any) {
    movableEvent.inputEvent.preventDefault();
    this.resetDeckCardInfo();
    this.onItemDrag(movableEvent);
  }

  // eslint-disable-next-line
  protected onDeckCardDragEnd(movableEvent: any) {
    movableEvent.inputEvent.preventDefault();
    this.resetDeckCardInfo();
    this.onItemDragEnd();
  }

  protected onMouseOutDeckCard(): void {
    this.resetDeckCardInfo();
    this.onMouseOut()
  }

  protected onDrop(target: Hoverable | undefined): void {
    if (!target) {
      this.onDropOnBoard();
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

  private onDropOnBoard(): void {
    const card = this.item.toCard();
    card.setIsSkipAnimation(true);
    card.setDragged(true);

    this.removeCardFromDeckAndCheckRemainingCards();
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

    this.removeCardFromDeckAndCheckRemainingCards();
    this.store.addItem(handCard);

    this.$nextTick(() =>
        this.store.getHandCards().forEach(hc => hc.animateMoveToHandPosition()));
  }

  private removeCardFromDeckAndCheckRemainingCards(): void {
    const deck = this.deck;

    deck?.remove(this.id);
    this.removeDeckIdNoCardsLeft(deck);
  }

  private removeDeckIdNoCardsLeft(deck: Deck | undefined): void {
    if (deck && !deck.getCards().length) {
      this.store.removeEntity(deck.getId());
    }
  }

  private resetDeckCardInfo(): void {
    this.deckCardInfoModeSynced = CardInfoMode.NONE;
  }
}

</script>

<style scoped>

</style>
