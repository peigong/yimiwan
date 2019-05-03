<template>
  <div>
    <wv-tabbar :fixed="true" class="bottom-menu">
      <wv-tabbar-item to="./a.hml" :is-on="ctrl.a">贤才</wv-tabbar-item>
      <wv-tabbar-item to="./i.hml" :is-on="ctrl.i">位子</wv-tabbar-item>
      <wv-tabbar-item to="./c.hml" :is-on="ctrl.c">东家</wv-tabbar-item>
    </wv-tabbar>
  </div>
</template>

<script>
export default {
  name: 'bottom-menu',
  props: [ 'type' ],
  components: {
  },
  data(){
    const ctrl = {
      a: false,
      i: false,
      c: false
    }
    ctrl[this.type] = true

    return {
      ctrl
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style>
</style>
