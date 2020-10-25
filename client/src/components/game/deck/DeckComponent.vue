<template>
  <Moveable :key="topCard.getId()"
            class="moveable
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
                         :deck-id="id">
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

  @Component({
    components: {DeckCardComponent}
  })
  export default class DeckComponent extends mixins<ItemComponent<Deck>, HoverableComponent<Deck>>(ItemComponent, HoverableComponent) {

    private draggableId = this.id + "-deck-draggable-img";

    get hand(): Hand {
      return this.store.getEntities().find(e => e instanceof Hand) as Hand;
    }

    get keymap() {
      return {
        '7': {
          keyup: () => this.drawCards(7),
        }
      }
    }

    get topCard(): DeckCard | null {
      return this.item.getCards().length ? this.item.getCards()[0] : null;
    }

    get secondCard(): DeckCard | null {
      return this.item.getCards().length >= 2 ? this.item.getCards()[1] : null;
    }

    // eslint-disable-next-line
    protected onDeckDrag(movableEvent: any) {
      if (!movableEvent.inputEvent.defaultPrevented) {
        this.onItemDrag(movableEvent);
      }
    }

    // eslint-disable-next-line
    protected onDeckDragEnd(movableEvent: any) {
      if (!movableEvent.inputEvent.defaultPrevented) {
        this.onItemDragEnd();
      }
    }

    private drawCards(amount: number): void {
      if (this.getMouseOver() || this.topCard?.isMouseOver()) {
        const betweenDrawDelay = 20;
        [...new Array(amount).keys()].map(i => i * betweenDrawDelay)
        .forEach(delay => setTimeout(() => this.drawTopCard(), delay));
      }
    }

    private drawTopCard(): void {
      if (!this.topCard) {
        return;
      }

      const handCard = this.topCard.toHandCard(this.hand);
      this.item.remove(this.topCard.getId());
      this.store.addItem(handCard);

      this.$nextTick(() =>
          this.store.getHandCards().forEach(hc => {
            hc.setFaceUp(true);
            hc.animateMoveToHandPosition();
          }));
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
