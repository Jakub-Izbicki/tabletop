import {ItemType} from "@/domain/game/GameTypes";
<template>
  <div class="h-full
              flex
              flex-col">
    <div class="flex
                h-full w-full">
      <div class="h-full
                  flex
                  flex-col">
        <div v-for="(item, i) in items"
             :key="item.getId()"
             class="w-64 text-xs">
          <p>{{`${i + 1}. ${item.constructor.name} ${JSON.stringify(item, null, 3)}`}}</p>
          <p><br></p>
        </div>
      </div>
      <div class="h-full
                  flex-1
                  flex
                  flex-col">
        <RatioContainer :game-instance-id="gameInstanceId"
                        :ratio="containerRatio">
          <div class="flex-1"></div>
          <HandComponent :id="'hand-1'" :game-instance-id="gameInstanceId"></HandComponent>
          <ItemSpawner :game-instance-id="gameInstanceId"></ItemSpawner>
        </RatioContainer>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import ItemSpawner from "@/components/game/item/ItemSpawner.vue";
  import RatioContainer from "@/components/game/RatioContainer.vue";
  import {RatioConstants} from '@/domain/game/item/Ratio';
  import EntityStore from "@/domain/game/item/EntityStore";
  import HandComponent from "@/components/game/item/hand/HandComponent.vue";

  @Component({
    components: {HandComponent: HandComponent, RatioContainer, ItemSpawner}
  })
  export default class Game extends Vue {

    private containerRatio = RatioConstants.RATIO_16_9;

    private gameInstanceId = "game-instance-1";

    private store: EntityStore = EntityStore.getInstance(this.gameInstanceId);

    get items() {
      return this.store.getEntities();
    }
  }
</script>
