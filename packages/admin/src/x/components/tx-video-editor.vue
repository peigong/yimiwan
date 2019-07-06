<template>
  <div>
    <el-dialog title="视频管理" :visible.sync="visible" width="30%" center>
      <el-form :model="params" :rules="rules" ref="editForm" label-width="100px" class="edit-form">
        <el-form-item label="视频VID" prop="mediaid">
          <el-input v-model="params.mediaid" clearable></el-input>
        </el-form-item>
        <el-form-item label="视频说明" prop="summary">
          <el-input v-model="params.summary" clearable></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { MediaType, Status } from '@/x/enums'
import { catchHandler, success } from '@/x/util/ui'
import { createMedia } from '@/x/service/media'

export default {
  props: ['type', 'item', 'bell'],
  data() {
    return {
      visible: false,
      itemId: '',

      options: {},
      params: {
        mediaid: '',
        summary: ''
      },
      rules: {
        mediaid: [
          { required: true, message: '请输入视频VID', trigger: 'blur' }
        ]
      }
    };
  },
  mounted(){
  },
  watch: {
    bell(){
      this.visible = true
    },
    item(val){
      this.setItem(val)
    }
  },
  methods: {
    close(){
      this.visible = false
    },
    setItem(item = {}){
      const { openid, unionid, topical, refer, summary, mediaid } = item;
      this.params.mediaid = mediaid || ''
      this.params.summary = summary || ''
      this.options.openid = openid || ''
      this.options.unionid = unionid || ''
      this.options.topical = topical || ''
      this.options.refer = refer || ''
      this.options.type = MediaType.TxVideo
      this.options.status = Status.Approved
    },
    submit(){
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          let exec = null
          let message = ''
          const id = this.itemId || ''
          const params = { ...this.params, ...this.options, classification: { sn: this.type, name: this.name } }
          if(id){
            // params.id = id
            //  exec =
            // message = ''
          }else{
            exec = createMedia
            message = '添加成功！'
          }
          if(exec){
            exec(params)
            .then(() => {
              success(message)
              this.close()
              this.$emit('changed')
            })
            .catch(catchHandler)
          }
        } else {
          return false;
        }
      })
    }
  }
}
</script>

<style>
</style>
