<template>
  <div class="has-background-white
              rounded-3xl shadow-lg
              p-8
              flex flex-col
              items-center justify-center">
    <p class="text-3xl
              mb-5">
      Import a deck
    </p>

    <div class="flex flex-row
                w-full">
      <div class="flex flex-col items-center justify-center
                  has-background-light shadow-lg rounded-3xl
                  p-5">
        <b-field label="Enter card names:">
          <b-input type="textarea"
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
        <div class="text-lg
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

  private searchingCards = false;

  private importedCards: string[] = [];

  get cardNamesEmpty(): boolean {
    return !this.cardNames?.trim()
  }
}
</script>

<style scoped>

</style>
