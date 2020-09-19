<template>
  <div>
    <h1>{{ msg }}</h1>
    <input v-model="syncedName"
           type="text">
    <input v-model="syncedName2"
           type="text">
  </div>
</template>

<script lang="ts">
  import {Component, Prop, PropSync, Vue} from 'vue-property-decorator';

  @Component
  export default class HelloWorld extends Vue {

    @Prop(String)
    private readonly msg!: string;

    @PropSync('firstName', {type: String})
    public syncedName!: string;

    @PropSync('firstName2', {type: String})
    public syncedName2!: string;
  }
</script>

<style scoped lang="scss">
</style>
