<template>
  <div class="relative
              flex
              flex-col
              h-full w-full">
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

    <Header></Header>

    <!--    <div class="absolute-->
    <!--                h-full-->
    <!--                pointer-events-none"-->
    <!--         v-if="items">-->
    <!--      <div v-for="(item, i) in items.getCards()"-->
    <!--           :key="item.getId()"-->
    <!--           class="w-64-->
    <!--                  text-2xs">-->
    <!--        <p>{{`${i + 1}.`}} <b>{{item.constructor.name}}</b> {{JSON.stringify(item, null, 3)}}</p>-->
    <!--        <p><br></p>-->
    <!--      </div>-->
    <!--    </div>-->
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import ItemSpawner from "@/components/game/ItemSpawner.vue";
  import RatioContainer from "@/components/game/RatioContainer.vue";
  import {RatioConstants} from '@/domain/game/util/Ratio';
  import EntityStore from "@/domain/game/EntityStore";
  import HandComponent from "@/components/game/hand/HandComponent.vue";
  import Header from "@/components/home/Header.vue";

  @Component({
    components: {Header, HandComponent: HandComponent, RatioContainer, ItemSpawner}
  })
  export default class Game extends Vue {

    private containerRatio = RatioConstants.RATIO_16_9;

    private gameInstanceId = "game-instance-main";

    private store: EntityStore = EntityStore.getInstance(this.gameInstanceId);

    // get items(): Deck {
    //   return this.store.getEntities().find(e => e instanceof Deck) as Deck;
    // }
  }
</script>
