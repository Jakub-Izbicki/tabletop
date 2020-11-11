<template>
  <Moveable :key="topCard.getId()"
            class="moveable
                   group
                   absolute
                   top-0 left-0
                   h-0 w-0
                   transform"
            :class="[{'transition-transform': isMovingAnimate},
                     {'duration-200' : isMovingAnimate},
                     {'pointer-events-none': isNonePointerEvents},
                     {'cursor-grab': !isDragged},
                     {'cursor-grabbing': isDragged}]"
            :style="transformStyle"
            v-bind="moveable"
            @drag="onDeckDrag"
            @dragEnd="onDeckDragEnd">
    <div :id="id"
         class="relative
                h-cardItem
                w-cardItem
                rounded-cardItem
                transform
                -translate-x-1/2
                -translate-y-1/2
                flex items-center justify-center
                shadow-deck"
         @mouseover="onMouseOver"
         @mouseout="onMouseOut"
         v-hotkey="keymap">
      <div class="absolute
                  bottom-0
                  transform
                  translate-y-deckBase
                  scale-95
                  pointer-events-none
                  deck-base-perspective">
        <div class="h-deckBase w-cardItem
                    rounded-cardItem
                    bg-gray-800
                    pointer-events-none
                    deck-base"
             :class="{'shadow-hoverTarget': isMouseOver}">
        </div>
      </div>
      <div class="absolute
                  pointer-events-none
                  opacity-0
                  group-hover:opacity-100
                  w-cardItem
                  px-deckInfo
                  transform
                  -translate-y-deckInfo">
        <p class="text-deckInfo
                  text-gray-700">
          {{ `${deckSize}` }}
        </p>
      </div>
      <div v-if="secondCard"
           class="absolute
                  top-0
                  h-cardItem w-cardItem
                  rounded-cardItem">
        <img v-if="secondCard.getIsFaceUp()"
             :id="draggableId"
             class="absolute
                    top-0
                    h-cardItem w-cardItem
                    rounded-cardItem"
             :src="secondCard.getImageUrl()">
        <div v-else
             class="absolute
                    h-cardItem w-cardItem
                    rounded-cardItem
                    bg-purple-400
                    flex justify-center items-center
                    border-cardBack border-black">
          <p class="text-cardBackLabel
                    font-wizard">w</p>
        </div>
      </div>
      <div v-if="!secondCard"
           class="absolute
                  top-0
                  h-cardItem w-cardItem
                  rounded-cardItem">
        <div class="absolute
                    h-cardItem w-cardItem
                    rounded-cardItem
                    bg-teal-200
                    flex justify-center items-center
                    border-deckEmpty border-black">
          <p class="text-deckEmptyCard
                    font-bold">
            empty
          </p>
        </div>
      </div>

      <CardInfo :card-info-mode="deckInfoMode"
                delete-msg="Press `x` again to remove deck">
      </CardInfo>

      <div class="pointer-events-none
                  absolute
                  top-0
                  h-cardItem w-cardItem
                  rounded-cardItem"
           :class="[{'bg-green-100': isHover},
                    {'bg-opacity-25': isHover},
                    {'shadow-hoverTarget': isHover},
                    {'shadow-hoverTargetNoBottom': isMouseOver}]">
      </div>
      <DeckCardComponent v-if="topCard"
                         :key="topCard.getId()"
                         :deck-card="topCard"
                         :id="topCard.getId()"
                         :game-instance-id="item.getGameInstanceId()"
                         :deck-id="id"
                         :deck-card-info-mode.sync="deckInfoMode">
      </DeckCardComponent>
    </div>
  </Moveable>
</template>

<script lang="ts">
import {Component} from "vue-property-decorator";
import ItemComponent from "@/components/game/interface/ItemComponent";
import Deck from "@/domain/game/item/Deck";
import DeckCard from "@/domain/game/item/DeckCard";
import DeckCardComponent from "@/components/game/deck/DeckCardComponent.vue";
import {mixins} from "vue-class-component";
import HoverableComponent from "@/components/game/interface/HoverableComponent";
import Hand from "@/domain/game/hoverable/Hand";
import {CardInfoMode} from "@/domain/game/GameTypes";
import CardInfo from "@/components/game/card/CardInfo.vue";

@Component({
  components: {CardInfo, DeckCardComponent}
})
export default class DeckComponent extends mixins<ItemComponent<Deck>, HoverableComponent<Deck>>(ItemComponent, HoverableComponent) {

  private draggableId = this.id + "-deck-draggable-img";

  private deckInfoMode = CardInfoMode.NONE;

  get ownHand(): Hand {
    // todo: change implementation when implementing online multiplayer
    return this.store.getEntities().find(e => e instanceof Hand) as Hand;
  }

  get keymap() {
    return {
      '1': {
        keyup: () => this.drawCards(1),
      },
      '2': {
        keyup: () => this.drawCards(2),
      },
      '3': {
        keyup: () => this.drawCards(3),
      },
      '4': {
        keyup: () => this.drawCards(4),
      },
      '5': {
        keyup: () => this.drawCards(5),
      },
      '6': {
        keyup: () => this.drawCards(6),
      },
      '7': {
        keyup: () => this.drawCards(7),
      },
      '8': {
        keyup: () => this.drawCards(8),
      },
      '9': {
        keyup: () => this.drawCards(9),
      },
      '0': {
        keyup: () => this.drawCards(10),
      },
      'r': {
        keyup: this.shuffle
      },
      'x': {
        keyup: this.removeDeck
      }
    }
  }

  get topCard(): DeckCard | null {
    return this.deckSize ? this.deckCards[0] : null;
  }

  get secondCard(): DeckCard | null {
    return this.deckSize >= 2 ? this.deckCards[1] : null;
  }

  get deckSize(): number {
    return this.deckCards.length;
  }

  get deckCards(): DeckCard[] {
    return this.item.getCards();
  }

  // eslint-disable-next-line
  protected onDeckDrag(movableEvent: any) {
    this.resetDeckInfo();

    if (!movableEvent.inputEvent.defaultPrevented) {
      this.onItemDrag(movableEvent);
    }
  }

  // eslint-disable-next-line
  protected onDeckDragEnd(movableEvent: any) {
    this.resetDeckInfo();

    if (!movableEvent.inputEvent.defaultPrevented) {
      this.onItemDragEnd();
    }
  }

  private drawCards(amount: number): void {
    if (!this.getMouseOver() && !this.topCard?.isMouseOver()) {
      return;
    }

    this.setNoPointerEvents(true);
    this.setIsMouseOver(false);
    this.setIsDragged(false);

    if (amount > this.deckSize) {
      amount = this.deckSize;
    }

    const betweenDrawDelay = 100;
    const delays = [...new Array(amount).keys()].map(i => i * betweenDrawDelay);

    delays.forEach(delay => setTimeout(() => {
      const isLastDraw = delays[delays.length - 1] === delay;

      if (isLastDraw) {
        this.setNoPointerEvents(false);
      }
      this.drawTopCard(isLastDraw);
    }, delay));
  }

  private setNoPointerEvents(isNone: boolean): void {
    this.item.setNonePointerEvents(isNone);
    this.deckCards.forEach(c => c.setNonePointerEvents(isNone));
  }

  private setIsMouseOver(isOver: boolean): void {
    this.item.setMouseOver(isOver);
    this.topCard?.setMouseOver(isOver);
  }

  private setIsDragged(isDragged: boolean): void {
    this.item.setDragged(isDragged);
    this.topCard?.setDragged(isDragged);
  }

  private setDisappeared(isDisappeared: boolean): void {
    this.item.setDisappeared(isDisappeared);
    this.topCard?.setDisappeared(isDisappeared);
  }

  private setIsMovingAnimate(isMovingAnimate: boolean): void {
    this.item.setIsMovingAnimate(isMovingAnimate);
    this.topCard?.setIsMovingAnimate(isMovingAnimate);
  }

  private drawTopCard(lastCardDrawn: boolean): void {
    if (!this.topCard) {
      return;
    }

    const handCard = this.topCard.toHandCard(this.ownHand);
    this.item.remove(this.topCard.getId());
    if (!this.deckSize) {
      this.store.removeEntity(this.id);
    }

    this.store.addItem(handCard);

    this.$nextTick(() => {
      handCard.setFaceUp(true);
      this.store.getHandCards().forEach(hc => {
        hc.animateMoveToHandPosition(lastCardDrawn);
      });
    });
  }

  private shuffle(): void {
    this.item.shuffle();
  }

  private removeDeck(): void {
    if (!this.getMouseOver() && !this.topCard?.isMouseOver()) {
      return;
    }

    if (this.deckInfoMode === CardInfoMode.NONE) {
      this.deckInfoMode = CardInfoMode.REMOVE_WARNING;
      return;
    }

    this.setIsMouseOver(false);
    this.setDisappeared(true);
    this.setNoPointerEvents(true);
    this.setIsMovingAnimate(true);

    setTimeout(() => this.store.removeEntity(this.id), 200);
  }

  private resetDeckInfo(): void {
    this.deckInfoMode = CardInfoMode.NONE;
  }
}

</script>

<style scoped>
.deck-base {
  transform: rotateX(-8deg);
}

.deck-base-perspective {
  perspective: 0.8em;
}
</style>
