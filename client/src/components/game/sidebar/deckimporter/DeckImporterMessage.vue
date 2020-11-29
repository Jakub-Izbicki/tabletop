<template>
  <div class="m-5">
    <b-notification
        class="shadow-xl has-background-black-ter"
        aria-close-label="Close notification"
        role="alert"
        auto-close
        duration="10000">
      <div class="flex">
        <p v-twemoji class="text-2xl mr-2">⚠️</p>
        <p class="font-bold has-text-warning">{{ title }}</p>
      </div>
      <p class="whitespace-pre-line">{{ msg }}</p>
    </b-notification>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class DeckImporterMessage extends Vue {

  @Prop({type: String, required: true})
  private title!: string

  @Prop({type: String, required: true})
  private msg!: string
}

</script>
