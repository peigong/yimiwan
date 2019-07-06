<template>
  <div>
    <el-dialog title="回复消息" :visible.sync="visible" width="30%" center>
      <el-form :model="params" :rules="rules" ref="editForm" label-width="100px" class="edit-form">
        <el-form-item label="主题" prop="title">
          <el-input v-model="params.title" clearable></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input v-model="params.content" clearable></el-input>
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
import { createMessage } from '@/x/service/message'

export default {
  props: ['type', 'item', 'bell'],
  data() {
    return {
      visible: false,
      itemId: '',

      options: {},
      params: {
        title: '',
        content: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入消息主题', trigger: 'blur' }
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
    reset(){
      this.params.title = ''
      this.params.content = ''
      this.options.to = ''
      this.options.topical = ''
    },
    close(){
      this.reset()
      this.visible = false
    },
    setItem(item = {}){
      const { _id, openid } = item;
      this.options.to = openid || ''
      this.options.topical = _id || ''
    },
    submit(){
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          const params = { ...this.params, ...this.options }
          createMessage(params)
          .then(() => {
            success('回复成功！')
            this.close()
            this.$emit('changed')
          })
          .catch(catchHandler)
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
