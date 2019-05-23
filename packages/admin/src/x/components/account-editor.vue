<template>
  <div>
    <el-progress type="circle" :percentage="percentage" v-if="!!percentage"></el-progress>
    <el-dialog title="设置管理账户" :visible.sync="visible" width="30%" center>
      <span>需要注意的是内容是默认不居中的</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['openId'],
  data() {
    return {
      accountId: '',
      percentage: 0,
      visible: false
    };
  },
  mounted(){
    this.setAccountId(this.openId)
  },
  watch: {
    accountId(val){
      this.setAccountId(val)
    }
  },
  methods: {
    setAccountId(accountId){
      console.log(accountId);
      this.percentage = 0
      if(accountId){
        this.visible = true
      }else{
        this.visible = false
      }
    },
    cancel(){
      this.$emit('changed', '')
      this.setAccountId('')
    },
    submit(){
      this.$emit('changed', '')
      this.setAccountId('')
    }
  }
}
</script>

<style>
</style>
