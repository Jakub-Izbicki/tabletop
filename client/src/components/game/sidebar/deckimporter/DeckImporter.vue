<template>
  <div class="has-background-white has-text-dark
              rounded-3xl shadow-lg
              p-16
              flex flex-col
              items-center justify-center">
    <p class="w-full
              flex items-center justify-center
              rounded-3xl shadow-lg has-background-light has-text-primary
              text-3xl
              mb-5 p-3">
      Import a deck
    </p>

    <div class="flex flex-row
                w-full">
      <div class="flex flex-col items-center justify-center
                  has-background-light shadow-lg rounded-3xl
                  p-5">
        <b-field label="Enter cards:">
          <b-input type="textarea"
                   :placeholder="cardNamesGuide"
                   maxlength="2000"
                   :cols="45"
                   :rows="20"
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
                      @click="searchingCards = true">
              Search for cards
            </b-button>
          </div>
        </div>
      </div>

      <div class="flex-1
                  flex flex-row justify-center
                  m-5">
        <div class="text-lg has-text-dark
                    flex items-center justify-center
                    h-full">No cards imported yet
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component
export default class DeckImporter extends Vue {

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

  private importedCards: string[] = [];

  get cardNamesEmpty(): boolean {
    return !this.cardNames?.trim()
  }
}
</script>

<style scoped>

</style>
