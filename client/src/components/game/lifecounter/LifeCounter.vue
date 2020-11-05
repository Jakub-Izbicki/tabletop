<template>
  <div class="absolute
                flex items-center justify-center
                h-lifecounter w-lifecounter
                transform
                rounded-full
                xxxshadow-cardHover
                bg-playerIcons">
    <p class="emoticon-shadow
                transform
                translate-y-lifecounterIconYOffset
                text-lifecounterIcon">❤️</p>
    <p class="absolute
                text-lifecounterHP">30</p>
  </div>
</template>


<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';

  @Component
  export default class LifeCounter extends Vue {

  }
</script>

<style scoped>
  .emoticon-shadow {
    text-shadow: 0 0.1em 0.2em #000000;
  }
</style>
