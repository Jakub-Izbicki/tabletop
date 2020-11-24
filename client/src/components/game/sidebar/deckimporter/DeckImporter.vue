<template>
  <div class="h-full w-full
              flex flex-row
              items-center justify-center">
    <div class="flex flex-col justify-center
                h-full p-10">
      <p class="flex items-center
                text-3xl font-thin
                mb-10">
        Import a deck
      </p>

      <b-field label="Enter cards:">
        <b-input type="textarea"
                 :placeholder="cardNamesGuide"
                 maxlength="2000"
                 :cols="50"
                 :rows="20"
                 custom-class="none-resize"
                 :disabled="searchingCards"
                 v-model="cardNames"></b-input>
      </b-field>
      <div class="w-full flex flex-row justify-end">
        <div class="shadow-lg
                    rounded-full">
          <b-button type="is-primary"
                    rounded
                    :loading="searchingCards"
                    :disabled="searchingCards || cardNamesEmpty"
                    @click="searchCards">
            Search for cards
          </b-button>
        </div>
      </div>
    </div>

    <div class="h-full w-full
                flex flex-col justify-center
                p-10
                has-background-white has-text-light
                shadow-lg">
      <div v-if="!foundCards.length"
           class="text-lg has-text-dark
                  flex items-center justify-center
                  h-full">No cards imported yet
      </div>
      <div v-else class="w-full
                         flex flex-row justify-start">
        <div class="w-full h-full
                    flex flex-col">
          <div class="relative
                      h-full w-full
                      mb-5">
            <div class="absolute
                        top-0 bottom-0 left-0 right-0
                        overflow-auto
                        flex flex-col flex-wrap items-start">
              <FoundCardPreview v-for="card in foundCards"
                                :key="card.name"
                                :image-url="card.imageUrl">
              </FoundCardPreview>
            </div>
          </div>
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
      console.info(searchedCards.found)
      this.foundCards.push(...searchedCards.found)
      this.foundCards.push(...searchedCards.found)
      this.foundCards.push(...searchedCards.found)
      this.foundCards.push(...searchedCards.found)
      this.foundCards.push(...searchedCards.found)
      this.foundCards.push(...searchedCards.found)
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
