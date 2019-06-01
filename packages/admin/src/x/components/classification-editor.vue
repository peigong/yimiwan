<template>
  <div>
    <el-dialog title="维护类别" :visible.sync="visible" width="30%" center>
      <el-form :model="params" :rules="rules" ref="editForm" label-width="100px" class="edit-form">
        <el-form-item label="类别编码" prop="sn">
          <el-input v-model="params.sn" clearable></el-input>
        </el-form-item>
        <el-form-item label="类别名称" prop="name">
          <el-input v-model="params.name" clearable></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="params.remark" clearable></el-input>
        </el-form-item>
        <el-form-item label="排序权重" prop="position">
          <el-input v-model.number="params.position" clearable></el-input>
        </el-form-item>
        <el-form-item label="生效状态" prop="active">
          <el-switch
            v-model="params.active"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
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
import { catchHandler, success } from '@/x/util/ui'
import { createClassification, updateClassification } from '@/x/service/classification'

export default {
  props: ['item', 'bell'],
  data() {
    return {
      visible: false,
      itemId: '',

      parent: {},
      params: {
        sn: '',
        name: '',
        remark: '',
        position: 1e6,
        active: true
      },
      rules: {
        sn: [
          { required: true, message: '请输入类别编码', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入类别名称', trigger: 'blur' }
        ],
        position: [
          { required: true, message: '请输入排序权重', trigger: 'blur' }
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
      this.itemId = item._id || ''
      this.params.sn = item.sn || ''
      this.params.name = item.name || ''
      this.params.remark = item.remark || ''
      this.params.position = item.position || 1e6
      this.params.active = !(false === item.active)
      this.parent = item.parent || {}
    },
    submit(){
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          let exec = null
          let message = ''
          const id = this.itemId || ''
          const params = { ...this.params, parent: this.parent }
          if(id){
            params.id = id
            exec = updateClassification
            message = '类别修改成功！'
          }else{
            exec = createClassification
            message = '类别添加功！'
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
