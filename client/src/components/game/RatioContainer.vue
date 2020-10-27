<template>
  <div ref="container"
       class="relative
              h-full w-full
              bg-blue-100"
       :style="[{'font-size': pixelSize},
                {padding: `${paddingY} ${paddingX} ${paddingY} ${paddingX}`}]">
    <div class="absolute
                top-0 bottom-0 left-0 right-0
                flex items-center justify-center">
      <div :id="gameInstanceId"
           class="relative
                  flex flex-col"
           :style="[{width: `${dimensions.width}px`},
                    {height: `${dimensions.height}px`}]">
        <slot/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from "vue-property-decorator";
  import Ratio, {RatioConstants} from "@/domain/game/util/Ratio";
  import {DimensionsPx, TranslateUnit} from "@/domain/game/GameTypes";
  import EntityStore from "@/domain/game/EntityStore";
  import {v4 as uuid4} from 'uuid';
  import RelativeFontSize from "@/domain/game/util/RelativeFontSize";
  import Deck from "@/domain/game/item/Deck";
  import DeckCard from "@/domain/game/item/DeckCard";

  @Component
  export default class RatioContainer extends Vue {

    @Prop({type: String, required: true})
    private readonly gameInstanceId!: string;

    @Prop({required: true})
    private readonly ratio!: RatioConstants;

    private store: EntityStore = EntityStore.getInstance(this.gameInstanceId);

    private height = 0;

    private width = 0;

    private observer!: MutationObserver;

    created() {
      // temporary code to spawn test items
      setTimeout(() => {
        // [...Array(1).keys()]
        // .forEach(i => {
        //   this.store.addItem(
        //       new Card(`plains${i}`,
        //           {x: 1, y: i + 1, unit: TranslateUnit.EM},
        //           45,
        //           this.gameInstanceId,
        //           "https://img.scryfall.com/cards/large/front/8/a/8a299a1e-1ce9-4668-a5f5-c587081acf6b.jpg?1594737787",
        //           true));
        // });
        // this.store.addItem(
        //     new Card('Great Forge',
        //         {x: 2, y: 2, unit: TranslateUnit.EM},
        //         90,
        //         this.gameInstanceId,
        //         "https://c1.scryfall.com/file/scryfall-cards/large/front/b/f/bfddf910-babf-4d3c-b664-208041405460.jpg?1561957150",
        //         true));
        //
        //
        // [...Array(1).keys()]
        // .forEach(() => {
        //   this.store.addItem(new HandCard("Swamp",
        //       {x: 0, y: 0, unit: TranslateUnit.EM},
        //       0,
        //       'hand-1',
        //       this.gameInstanceId,
        //       "https://c1.scryfall.com/file/scryfall-cards/large/front/3/5/358fde6f-9852-4c96-9ba5-e410fb591cbd.jpg?1562544014",
        //       true));
        // });
        // this.store.addItem(new HandCard("Forest",
        //     {x: 0, y: 0, unit: TranslateUnit.EM},
        //     0,
        //     'hand-1',
        //     this.gameInstanceId,
        //     "https://c1.scryfall.com/file/scryfall-cards/large/front/2/b/2b90e88b-60a3-4d1d-bb8c-14633e5005a5.jpg?1599832083",
        //     true));
        // this.store.addItem(new HandCard("Island",
        //     {x: 0, y: 0, unit: TranslateUnit.EM},
        //     0,
        //     'hand-1',
        //     this.gameInstanceId,
        //     "https://c1.scryfall.com/file/scryfall-cards/large/front/5/8/589a324f-4466-4d4a-8cfb-806a041d7c1f.jpg?1599831830",
        //     true));
        //
        // this.store.getHandCards().forEach(handCard => handCard.moveToHandPosition());

        const deckId = "deck-1";
        const deck = new Deck(
            deckId,
            {x: 15, y: 5, unit: TranslateUnit.EM},
            0,
            this.gameInstanceId,
            []);

        deck.pushOnBottom(new DeckCard(`plains1`,
            {x: 0, y: 0, unit: TranslateUnit.EM},
            0,
            this.gameInstanceId,
            "https://img.scryfall.com/cards/large/front/8/a/8a299a1e-1ce9-4668-a5f5-c587081acf6b.jpg?1594737787",
            false,
            deckId));
        deck.pushOnBottom(new DeckCard(`great-furnace`,
            {x: 0, y: 0, unit: TranslateUnit.EM},
            0,
            this.gameInstanceId,
            "https://c1.scryfall.com/file/scryfall-cards/large/front/b/f/bfddf910-babf-4d3c-b664-208041405460.jpg?1561957150",
            false,
            deckId));
        deck.pushOnBottom(new DeckCard("Forest2",
            {x: 0, y: 0, unit: TranslateUnit.EM},
            0,
            this.gameInstanceId,
            "https://c1.scryfall.com/file/scryfall-cards/large/front/2/b/2b90e88b-60a3-4d1d-bb8c-14633e5005a5.jpg?1599832083",
            false,
            deckId));
        deck.pushOnBottom(new DeckCard("Island2",
            {x: 0, y: 0, unit: TranslateUnit.EM},
            0,
            this.gameInstanceId,
            "https://c1.scryfall.com/file/scryfall-cards/large/front/5/8/589a324f-4466-4d4a-8cfb-806a041d7c1f.jpg?1599831830",
            false,
            deckId));
        deck.pushOnBottom(new DeckCard("Swamp2",
            {x: 0, y: 0, unit: TranslateUnit.EM},
            0,
            this.gameInstanceId,
            "https://c1.scryfall.com/file/scryfall-cards/large/front/3/5/358fde6f-9852-4c96-9ba5-e410fb591cbd.jpg?1562544014",
            false,
            deckId));

        [...Array(20).keys()].forEach(i => {
          deck.pushOnBottom(new DeckCard(`${i}-${uuid4()}`,
              {x: 0, y: 0, unit: TranslateUnit.EM},
              0,
              this.gameInstanceId,
              "https://c1.scryfall.com/file/scryfall-cards/large/front/3/5/358fde6f-9852-4c96-9ba5-e410fb591cbd.jpg?1562544014",
              false,
              deckId));
        });

        this.store.addItem(deck);

      }, 100);
    }

    mounted() {
      /* eslint-disable */
      // @ts-ignore
      this.observer = new ResizeObserver(singletonArray => {
        // @ts-ignore
        singletonArray.forEach(wrapper => {
          this.setDimensions(wrapper.contentRect);
        })
      });

      // @ts-ignore
      this.observer.observe(this.$refs.container);
      /* eslint-enable */
    }

    beforeDestroy() {
      EntityStore.removeInstance(this.gameInstanceId);
    }

    get pixelSize(): string {
      return `${RelativeFontSize.getPixelSize(this.width)}px`;
    }

    get paddingX(): string {
      return `${RelativeFontSize.DEFAULT.valueOf() * this.width / 15}px`;
    }

    get paddingY(): string {
      return `${RelativeFontSize.DEFAULT.valueOf() * this.width / 13}px`;
    }

    get dimensions(): DimensionsPx {
      return {
        height: this.height,
        width: this.width
      };
    }

    private setDimensions(rect: DOMRect): void {
      if (rect && rect.height && rect.width) {
        const dimensionsPx = Ratio.trimIntoRatio(rect.height, rect.width, this.ratio);

        this.height = dimensionsPx.height;
        this.width = dimensionsPx.width;
      }
    }
  }
</script>

<style>
  .moveable-line {
    background: rgba(68, 170, 255, 0) !important;
    display: none;
    pointer-events: none;
  }

  .card-face-down {
    transform: rotateY(180deg);
  }

  .hidden-backface {
    -webkit-backface-visibility: hidden; /* Safari */
    backface-visibility: hidden;
  }

  .card-flip-container {
    transform-style: preserve-3d;
  }

  .card-flip-perspective {
    perspective: 700px;
  }
</style>
