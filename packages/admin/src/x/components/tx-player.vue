<template>
  <div>
    <el-dialog title="腾讯播放器" :visible.sync="visible" width="30%" center>
      <div id="tx-player">
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['items', 'bell'],
  data() {
    return {
      visible: false
    };
  },
  mounted(){
  },
  watch: {
    bell(){
      this.visible = true
    },
    items(val){
      this.setItems(val)
    }
  },
  methods: {
    setItems(items = []){
      if(items.length){
        const vid = items[0].mediaid || ''
        const Txplayer = window.Txplayer || null
        Txplayer && new Txplayer({
          containerId: 'tx-player',
          vid: vid,
          width: '100%',
          height: screen.availHeight/3
        });
      }
    }
  }
}
</script>

<style>
</style>
