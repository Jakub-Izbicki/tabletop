<template>
  <div class="absolute
              pointer-events-none
              flex flex-row
              justify-center items-center
              w-full">
    <div class="relative
                m-4
                flex
                flex-row
                items-centers
                justify-center">
      <p class="font-thin
                text-title
                ">card</p>
      <p class="font-wizard
                text-titleLetter
                my-titleLetter
                ">w</p>
      <p class="font-thin
                text-title
                ">izard</p>
      <p class="absolute
                left-1
                w-full
                mx-3
                transform
                translate-y-subtitle
                font-wizard
                text-subtitle
                text-purple-400">a card sandbox</p>
    </div>
    <div class="absolute
                right-0
                m-10">
      <button class="pointer-events-auto
                     font-thin
                     font-bold
                     mx-2"
              @click="createPeerSession">
        create session
      </button>
      <div v-if="isConnecting">Connecting..</div>
      <button v-if="isConnected"
              class="pointer-events-auto
                     font-thin
                     font-bold
                     mx-2"
              @click="endPeerSession">
        disconnect session
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Multiplayer from "@/domain/Multiplayer";

@Component
export default class Header extends Vue {

  private isConnecting = false;

  private isConnected = false;

  private createPeerSession(): void {
    console.info('creating connection...')
    this.isConnecting = true;
    Multiplayer.createNew((connection) => {
      console.info('Created!')
      console.info(connection.id);
      this.isConnecting = false;
      this.isConnected = true;
    });
  }

  private endPeerSession(): void {
    Multiplayer.end();
    this.isConnected = false;
  }

  beforeDestroy() {
    this.endPeerSession();
  }
}
</script>

<style scoped>

</style>
