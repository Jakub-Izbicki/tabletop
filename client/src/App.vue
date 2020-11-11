<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
html, body, #app {
  height: 100%;
  overflow: hidden;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

@font-face {
  font-family: 'WizardFont';
  src: url('./assets/font/wizzta-vada-webfont.woff2') format('woff2');
  font-weight: normal;
  font-style: normal;
}

img.emoji {
  height: 0.9em;
  width: 0.9em;
  margin: 0.25em 0.05em 0 0.1em;
  vertical-align: -0.1em;
}
</style>
