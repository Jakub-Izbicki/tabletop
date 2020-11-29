<template>
  <div class="h-full w-full p-16
              flex flex-row
              items-center justify-center
              has-background-dark">

    <div class="flex flex-col justify-center
                p-10
                has-background-black-ter has-text-white rounded-lg shadow-xl">
      <p class="flex items-center justify-center
                text-3xl font-thin
                mb-10">
        Import a deck
      </p>

      <b-field>
        <div slot="label" class="has-text-light">Enter card names:</div>
        <b-input type="textarea"
                 :placeholder="cardNamesGuide"
                 maxlength="2000"
                 :cols="50"
                 :rows="15"
                 custom-class="none-resizes"
                 :disabled="searchingCards"
                 v-model="cardNames"></b-input>
      </b-field>
      <div class="w-full flex flex-row justify-between">
        <div class="rounded-lg">
          <b-button type="is-dark"
                    @click="$parent.close()">
            Back
          </b-button>
        </div>
        <div class="rounded-lg">
          <b-button type="is-primary"
                    :loading="searchingCards"
                    :disabled="searchingCards || cardNamesEmpty"
                    @click="searchCards">
            Search for cards
          </b-button>
        </div>
      </div>
    </div>

    <div class="h-full w-full p-10
                flex flex-col justify-center
                has-text-light rounded-r-lg">
      <div v-if="searchingCards"
           class="flex items-center justify-center
                  h-full w-full">
        <div class="relative w-32 h-32">
          <b-loading class="rounded-lg" :is-full-page="false" v-model="searchingCards"></b-loading>
        </div>
      </div>

      <div v-else-if="!foundCards.length"
           class="text-lg
                  flex items-center justify-center
                  h-full">
        No cards imported yet
      </div>

      <div v-else class="relative w-full h-full">
        <div class="absolute
                    top-0 bottom-0 left-0 right-0
                    overflow-auto pt-5 pb-deckImporterFlexbox
                    flex flex-col flex-wrap content-start flex-shrink-0">
          <FoundCardPreview v-for="(card, i) in foundCards"
                            :key="i"
                            :image-url="card.imageUrl">
          </FoundCardPreview>
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Scryfall, {FoundCard, QueriedCard} from "@/domain/game/sidebar/deckimporter/Scryfall";
import FoundCardPreview from "@/components/game/sidebar/deckimporter/FoundCardPreview.vue";

@Component({
  components: {FoundCardPreview}
})
export default class DeckImporter extends Vue {

  private static readonly STARTS_WITH_NUMBER = /^[0-9]+ .+$/

  private cardNames = "";

  private cardNamesGuide = `To search for cards, in each line enter card amount, followed by a card name.

Example:

4 Bonecrusher Giant
4 Brushfire Elemental
4 Edgewall Innkeeper
1 Evolving Wilds
2 Fire Prophecy
9 Forest
2 Vivien, Monsters' Advocate`;

  private searchingCards = false;

  private foundCards: FoundCard[] = [];

  get cardNamesEmpty(): boolean {
    return !this.cardNames?.trim();
  }

  private searchCards(): void {
    if (!this.allFormatValid()) {
      console.warn("Invalid format!");
      return;
    }

    this.searchingCards = true;
    const queriedCards = this.parseCards();

    new Scryfall().getCardsByNames(queriedCards)
    .then(searchedCards => {
      this.foundCards = searchedCards.found;
      this.searchingCards = false;
    });
  }

  private allFormatValid(): boolean {
    const allLines = this.trimLines()
    const validFormatLines = allLines.filter(line => line.match(DeckImporter.STARTS_WITH_NUMBER)?.length)

    return allLines.length === validFormatLines.length;
  }

  private parseCards(): QueriedCard[] {
    const queriedCards = this.trimLines()
    .filter(line => line.match(DeckImporter.STARTS_WITH_NUMBER)?.length)
    .map(line => {
      const amount = Number.parseInt(line.substring(0, line.indexOf(" ")));
      const name = line.substring(line.indexOf(" "), line.length);
      return new QueriedCard(name.toLowerCase(), amount);
    });

    return this.mergeDuplicatedEntries(queriedCards);
  }

  private trimLines(): string[] {
    return this.cardNames.split("\n")
    .filter(line => line?.trim())
    .map(line => line.trim());
  }

  private mergeDuplicatedEntries(cards: QueriedCard[]): QueriedCard[] {
    const mergedCards: QueriedCard[] = [];

    cards.forEach(card => {
      if (mergedCards.some(visited => visited.name === card.name)) {
        return;
      }

      let amount = 0;
      cards.forEach(card2 => {
        if (card.name === card2.name) {
          amount += card2.amount;
        }
      });

      mergedCards.push(new QueriedCard(card.name, amount));
    });

    return mergedCards;
  }
}
</script>

<style>
.none-resize {
  resize: none;
}
</style>
