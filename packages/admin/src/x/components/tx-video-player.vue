<template>
  <div>
    <div :id="itemId">
    </div>
  </div>
</template>

<script>
export default {
  props: ['itemId'],
  data() {
    return {
    };
  },
  mounted(){
    if(this.itemId){
      this.setItemId(this.itemId)
    }
  },
  watch: {
    itemId(val){
      this.setItemId(val)
    }
  },
  methods: {
    setItemId(itemId = ''){
      const Txplayer = window.Txplayer || null
      if(itemId && Txplayer){
        this.$nextTick(() => {
          new Txplayer({
            containerId: itemId,
            vid: itemId,
            width: '100%',
            height: screen.availHeight / 3
          })
        })
      }
    }
  }
}
</script>

<style>
</style>
