<template>
  <div class="absolute
              pointer-events-none
              flex
              justify-center
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
                has-text-primary">a card sandbox</p>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component
export default class Header extends Vue {

}
</script>

<style scoped>

</style>
