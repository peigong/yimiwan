import Vue from 'vue'
import WeVue from 'we-vue'
import 'we-vue/lib/style.css'
import App from './App.vue'
import { chooseImage } from '@/util/wx'

Vue.config.productionTip = false
Vue.use(WeVue)


new Vue({
  render: h => h(App),
}).$mount('#app')
