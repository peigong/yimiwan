<template>
  <div id="app">
    <wv-button type="primary" @click="showToast">页面主要操作 Normal</wv-button>
  </div>
</template>

<script>
import { Toast } from 'we-vue'

export default {
  name: 'app',
  components: {
  },
  methods: {
    showToast(){
      Toast.success('ok')
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
