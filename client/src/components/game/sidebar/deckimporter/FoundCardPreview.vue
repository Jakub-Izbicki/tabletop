<template>
  <div class="h-20 w-64 mx-2">
    <img class="rounded-xl shadow-xl
                transform hover:-translate-y-5 duration-200"
         :src="imageUrl"/>
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

