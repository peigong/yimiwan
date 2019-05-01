import Vue from 'vue'
import WeVue from 'we-vue'
import 'we-vue/lib/style.css'
import App from './App.vue'
import '@/scss/flow-list.scss'
// import { getNetworkType, getLocation } from '@/util/wx'

Vue.config.productionTip = false
Vue.use(WeVue)

/*
getNetworkType()
.then(data => console.log(data))
.catch(err => console.log(err.message))

getLocation()
.then(data => console.log(data))
.catch(err => console.log(err.message))
*/
new Vue({
  render: h => h(App),
}).$mount('#app')
