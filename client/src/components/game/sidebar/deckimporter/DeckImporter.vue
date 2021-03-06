<template>
  <div class="h-full w-full p-16
              flex flex-row
              items-center justify-center
              has-background-dark">

    <div class="flex flex-col justify-center
                px-5 py-10
                has-background-black-ter has-text-white rounded-2xl shadow-xl">
      <p class="flex items-center justify-center
                text-3xl font-thin
                mb-5">
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

    <div class="h-full w-full px-10 relative
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
                    overflow-auto pt-5 pb-deckImporterFlexbox mb-16
                    flex flex-col flex-wrap content-start flex-shrink-0">
          <FoundCardPreview v-for="(card, i) in foundCards"
                            :key="i"
                            :image-url="card.imageUrl">
          </FoundCardPreview>
        </div>
        <div class="absolute
                    bottom-0 w-full
                    flex items-center justify-center">
          <div class="rounded-full shadow-xl">
            <b-button type="is-primary"
                      size="is-large"
                      rounded>
              Import {{ foundCards.length }} {{ foundCards.length > 1 ? 'cards' : 'card' }}
            </b-button>
          </div>
        </div>
      </div>
      <div class="absolute top-0 left-0">
        <DeckImporterMessage v-for="(error, i) in formErrors"
                             :key="i"
                             title="Warning"
                             :msg="error">
        </DeckImporterMessage>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Scryfall, {FoundCard, QueriedCard} from "@/domain/game/sidebar/deckimporter/Scryfall";
import FoundCardPreview from "@/components/game/sidebar/deckimporter/FoundCardPreview.vue";
import DeckImporterMessage from "@/components/game/sidebar/deckimporter/DeckImporterMessage.vue";

@Component({
  components: {DeckImporterMessage, FoundCardPreview}
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

  private formErrors: string[] = [];

  get cardNamesEmpty(): boolean {
    return !this.cardNames?.trim();
  }

  private searchCards(): void {
    const invalidLines = this.getInvalidFormatLines();
    if (invalidLines.length) {
      this.printInvalidLinesError(invalidLines);
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

  private getInvalidFormatLines(): string[] {
    const allLines = this.trimLines()
    const invalidFormatLines = allLines.filter(line => !line.match(DeckImporter.STARTS_WITH_NUMBER))

    return invalidFormatLines;
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

  private printInvalidLinesError(invalidLines: string[]): void {
    const msg = "Detected invalid card name format for lines:\n"
        + invalidLines.map(line => `- ${line}`).join("\n")
        + "\nTo search for cards, in each line enter card amount, followed by a card name.";
    this.formErrors.push(msg);
  }
}
</script>
