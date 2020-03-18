import Vue from 'vue'
import App from './App.vue'
import router from './router'

import mock from './mock-data.js'

let data = {
  products: mock,
  team: [],
  emptyMessage: "Woops... You have no Pokemon in your team!",
}

new Vue({
  router,
  data,
  render: h => h(App)
}).$mount('#app')
