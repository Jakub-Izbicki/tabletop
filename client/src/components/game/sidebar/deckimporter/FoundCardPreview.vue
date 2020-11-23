<template>
  <div class="h-10 w-64">
    <div class="h-4"></div>
    <img class="rounded-xl shadow-xl
                transform
                hover:-translate-y-2 duration-200"
         :src="imageUrl"/>
    <div class="h-10"></div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class FoundCardPreview extends Vue {

  @Prop({type: String, required: true})
  private imageUrl!: string
}
</script>
