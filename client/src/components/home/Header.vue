<template>
  <div class="absolute
                pointer-events-none
                flex
                justify-center
                w-full">
    <div class="relative
                  flex
                  flex-row
                  items-centers
                  justify-center">
      <p class="font-wizard
                  text-title">Cardwizard</p>
      <p class="absolute
                  left-1
                  w-full
                  mx-6
                  transform
                  translate-y-subtitle
                  font-wizard
                  text-subtitle
                  text-purple-600">a goldfish simulator</p>
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
