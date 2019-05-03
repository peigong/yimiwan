/**
* 求职
*/

import Vue from 'vue'
import WeVue from 'we-vue'
import 'we-vue/lib/style.css'
import App from './App.vue'

Vue.config.productionTip = false
Vue.use(WeVue)

new Vue({
  render: h => h(App),
}).$mount('#app')
