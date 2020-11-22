<template>
  <b-tooltip :label="deckSize"
             :always="isVisible"
             position="is-right"
             type="is-white"
             class="absolute">
    <div class="h-deckInfo w-cardItem"></div>
  </b-tooltip>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class DeckInfo extends Vue {

  @Prop({required: true})
  private deckSize!: string;

  @Prop({required: true})
  private isVisible!: number;
}
</script>
