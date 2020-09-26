import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/tailwind.css'

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import VueHotkey from 'v-hotkey'

Vue.config.productionTip = false;

Vue.use(VueHotkey);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
