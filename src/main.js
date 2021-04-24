import Vue from 'vue'
import VueHead from 'vue-head'
import App from './App.vue'
import store from './store'
import router from './router'

Vue.use(VueHead)
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
