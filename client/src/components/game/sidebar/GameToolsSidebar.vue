<template>
  <div class="absolute
              pointer-events-none
              h-full
              left-0
              flex flex-col
              items-center justify-center">
    <SidebarButton twemoji="🃏" tooltip="Import a deck" @click="deckImporterOpen = true"></SidebarButton>
    <SidebarButton twemoji="🎲" tooltip="Spawn a dice"></SidebarButton>
    <SidebarButton twemoji="🧹" tooltip="Clear the board"></SidebarButton>

    <b-modal v-model="deckImporterOpen"
             :full-screen="true"
             :destroy-on-hide="false"
             class="pointer-events-auto">
      <DeckImporter></DeckImporter>
    </b-modal>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import SidebarButton from "@/components/game/sidebar/SidebarButton.vue";
import DeckImporter from "@/components/game/sidebar/deckimporter/DeckImporter.vue";

@Component({
  components: {DeckImporter, SidebarButton}
})
export default class GameToolsSidebar extends Vue {

  private deckImporterOpen = false;
}
</script>

<style scoped>

</style>
