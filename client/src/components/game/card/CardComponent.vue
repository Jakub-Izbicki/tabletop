<template>
  <Moveable class="moveable
                   absolute
                   top-0 left-0
                   h-0 w-0
                   transform"
            :class="[{'transition': isMovingAnimate},
                     {'duration-200' : isMovingAnimate},
                     {'pointer-events-none': isNonePointerEvents},
                     {'cursor-grab': !isDragged},
                     {'cursor-grabbing': isDragged},
                     {'z-onTop': isDragged}]"
            :style="transformStyle"
            v-bind="moveable"
            @drag="onCardDrag"
            @dragEnd="onCardDragEnd">
    <div class="transform
                transition-transform-shadow-opacity"
         :class="[{'duration-200': !isSkipAnimation},
                  {'opacity-0': isDisappeared},
                  {'-translate-y-itemHover': isMouseOver && !isDragged},
                  {'-translate-y-itemDrag': (isMouseOver && isDragged) || isDisappeared}]">
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
                    {'-translate-y-shadowCardDrag': (isMouseOver && isDragged) || isDisappeared}]"
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
                      {'shadow-cardDrag': (isMouseOver && isDragged) || isDisappeared}]">
        </div>
      </div>
      <div :id="id"
           class="h-cardItem
                  w-cardItem
                  rounded-cardItem
                  transform
                  transition-transform
                  -translate-x-1/2
                  -translate-y-1/2"
           :class="{'duration-200': !isSkipAnimation}"
           :style="rotationStyle"
           @mouseover="onMouseOver"
           @mouseout="onMouseOutCard"
           v-hotkey="keymap">
        <div class="h-cardItem
                    w-cardItem
                    card-flip-perspective">
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

            <CardInfo :card-info-mode="cardInfoMode"></CardInfo>
            <div class="card-face-down hidden-backface">
              <CardInfo :card-info-mode="cardInfoMode"></CardInfo>
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
import {CardInfoMode, Rotation, TranslateUnit} from "@/domain/game/GameTypes";
import CardInfo from "@/components/game/card/CardInfo.vue";
import CardBack from "@/components/game/card/CardBack.vue";
import RelativeFontSize from "@/domain/game/util/RelativeFontSize";

@Component({
  components: {CardBack, CardInfo}
})
export default class CardComponent extends mixins<BaseCardComponent<Card>, HoverableComponent<Card>>(BaseCardComponent, HoverableComponent) {

  private cardInfoMode = CardInfoMode.NONE

  get keymap() {
    return {
      'f': {
        keyup: this.flipCard
      },
      'q': {
        keyup: this.rotateCounterClockwise
      },
      'e': {
        keyup: this.rotateClockwise
      },
      '1': {
        keyup: this.moveToOwnHand
      },
      'x': {
        keyup: this.removeCard
      },
      'd': {
        keyup: this.duplicateCard
      }
    }
  }

  get ownHand(): Hand {
    // todo: change implementation when implementing online multiplayer
    return this.store.getEntities().find(e => e instanceof Hand) as Hand;
  }

  // eslint-disable-next-line
  protected onCardDrag(movableEvent: any) {
    this.resetCardInfo();
    this.onItemDrag(movableEvent);
  }

  // eslint-disable-next-line
  protected onCardDragEnd() {
    this.resetCardInfo();
    this.onItemDragEnd();
  }

  protected onMouseOutCard(): void {
    this.resetCardInfo();
    this.onMouseOut();
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
        case DeckCard:
          this.onDropOnDeck(target as DeckCard);
          break;
      }
    } else {
      throw `Invalid CardComponent::onDrop invocation with target: ${JSON.stringify(target)}`;
    }
  }

  private onDropOnCard(card: Card): void {
    setTimeout(() => this.item.animateMoveItem(card.getTranslate()), 0);
  }

  private onDropOnHand(hand: Hand): void {
    this.moveToHand(hand);
  }

  private onDropOnDeck(currentDeckTopCard: DeckCard): void {
    this.moveToDeck(currentDeckTopCard);
  }

  private moveToOwnHand(): void {
    if (!this.getMouseOver()) {
      return;
    }

    const hand = this.store.getEntities().find(e => e instanceof Hand);
    if (hand) {
      this.moveToHand(hand as Hand);
    }
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

    this.$nextTick(() => {
      newDeckCard.animateMoveItem({x: 0, y: 0, unit: TranslateUnit.EM});
      newDeckCard.setRotation(Rotation.R_0);
    });
  }

  private rotateCounterClockwise(): void {
    if (!this.getMouseOver()) {
      return;
    }

    if (this.item.getRotation() <= -Rotation.R_1_2) {
      this.rotateOnTimeout(Rotation.R_1_2, Rotation.R_1_4);
    } else {
      this.item.setRotation(this.item.getRotation() - Rotation.R_1_4);
    }
  }

  private rotateClockwise(): void {
    if (!this.getMouseOver()) {
      return;
    }

    if (this.item.getRotation() >= Rotation.R_1_2) {
      this.rotateOnTimeout(-Rotation.R_1_2, -Rotation.R_1_4);
    } else {
      this.item.setRotation(this.item.getRotation() + Rotation.R_1_4);
    }
  }

  private rotateOnTimeout(current: number, next: number): void {
    this.item.setIsSkipAnimation(true);
    this.item.setRotation(current);

    setTimeout(() => {
      this.item.setIsSkipAnimation(false);
      this.item.setRotation(next);
    }, 10);
  }

  private removeCard(): void {
    if (!this.getMouseOver()) {
      return;
    }

    if (this.cardInfoMode === CardInfoMode.NONE) {
      this.cardInfoMode = CardInfoMode.REMOVE_WARNING;
      return;
    }

    this.item.setMouseOver(false);
    this.item.setDisappeared(true);
    this.item.setNonePointerEvents(true);

    setTimeout(() => this.store.removeEntity(this.id), 200);
  }

  private resetCardInfo(): void {
    this.cardInfoMode = CardInfoMode.NONE;
  }

  private duplicateCard(): void {
    if (!this.getMouseOver()) {
      return;
    }

    const duplicatedCard = this.item.copy();
    const translate = duplicatedCard.getTranslate();
    const duplicatedCardOffset = 3.5;

    duplicatedCard.setTranslate({...translate, x: translate.x + duplicatedCardOffset});
    duplicatedCard.setDisappeared(true);

    this.store.addItem(duplicatedCard);
    setTimeout(() => duplicatedCard.setDisappeared(false), 0);
  }
}
</script>

<style scoped>
</style>
