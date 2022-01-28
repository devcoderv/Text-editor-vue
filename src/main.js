import Vue from 'vue'
import App from './App.vue'
import store from './store'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/css/pe-icon-7-stroke.css'
import './assets/css/helper.css'
import './assets/css/main.css'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

Vue.config.productionTip = false

Vue.prototype.$eventBus = new Vue();
new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
