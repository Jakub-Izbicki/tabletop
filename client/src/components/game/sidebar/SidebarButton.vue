<template>
  <div class="mx-10 my-5
              rounded-full
              shadow-lg">
    <b-tooltip :label="tooltip"
               position="is-right"
               type="is-dark"
               :delay="100">
      <b-button class="pointer-events-auto
                     is-light
                     flex
                     h-16 w-16"
                rounded>
        <div class="flex
                  items-center justify-center
                  h-16 w-16
                  text-5xl">
          <p v-twemoji>
            {{ twemoji }}
          </p>
        </div>
      </b-button>
    </b-tooltip>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class SidebarButton extends Vue {

  @Prop({type: String, required: true})
  private twemoji!: string

  @Prop({type: String, required: true})
  private tooltip!: string
}
</script>
