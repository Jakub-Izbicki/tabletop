<template>
  <div class="home">
    <img alt="Vue logo"
         src="../assets/logo.png">
    <button @click="goToGame">Go to game</button>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue';

@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {

  private goToGame(): void {
    this.$router.push({name: 'Game'});
  }
}
</script>
