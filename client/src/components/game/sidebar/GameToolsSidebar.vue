<template>
  <div class="absolute
              pointer-events-none
              h-full
              left-0
              flex flex-col
              items-center justify-center">
    <SidebarButton twemoji="🃏" tooltip="Import a deck"></SidebarButton>
    <SidebarButton twemoji="🎲" tooltip="Spawn a dice"></SidebarButton>
    <SidebarButton twemoji="🧹" tooltip="Clear the board"></SidebarButton>
  </div>
</template>

<script>
import SidebarButton from "@/components/game/sidebar/SidebarButton";

export default {
  name: "GameToolsSidebar",
  components: {SidebarButton}
}
</script>

<style scoped>

</style>
