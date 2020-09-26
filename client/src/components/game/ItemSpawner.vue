<template>
  <div>
    <CardComponent v-for="card in cards"
                   :key="card.getId()"
                   :id="card.getId()"
                   :game-instance-id="gameInstanceId">
    </CardComponent>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import EntityStore from "@/domain/game/EntityStore";
  import Card from "@/domain/game/item/Card";
  import CardComponent from "@/components/game/card/CardComponent.vue";
  import HandCardComponent from "@/components/game/card/HandCardComponent.vue";

  @Component({
    components: {HandCard: HandCardComponent, CardComponent: CardComponent}
  })
  export default class ItemSpawner extends Vue {

    @Prop({type: String, required: true})
    private readonly gameInstanceId!: string;

    private store: EntityStore = EntityStore.getInstance(this.gameInstanceId);

    get cards(): Card[] {
      return this.store.getCards();
    }
  }
</script>
