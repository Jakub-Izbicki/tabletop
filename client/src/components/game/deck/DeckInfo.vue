<template>
  <div class="absolute
                  pointer-events-none
                  opacity-0
                  w-cardItem
                  transform
                  -translate-y-deckInfo"
       :class="{'group-hover:opacity-100': !isDraggedCardOrDeck}">
    <p class="text-deckInfo
              has-background-light
              rounded-full
              mx-deckInfoDeckSize
              w-deckInfoDeckSize h-deckInfoDeckSize
              shadow-deckInfoDeckSize
              flex
              justify-center items-center">
      {{ deckSize }}
    </p>
  </div>
</template>

<script>
export default {
  name: "DeckInfo",
  props: ['deckSize', 'isDraggedCardOrDeck']
}
</script>

<style scoped>

</style>
