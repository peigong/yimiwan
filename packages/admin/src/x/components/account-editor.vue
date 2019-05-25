<template>
  <div>
    <el-dialog title="设置管理账户" :visible.sync="visible" width="30%" center>
      <i class="el-icon-loading" v-if="loading"></i>
      <el-form :model="params" :rules="rules" ref="editForm" label-width="100px" class="edit-form">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="params.username" clearable :disabled="isExists"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="params.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="重复密码" prop="again">
          <el-input v-model="params.again" show-password></el-input>
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
import { getAccountInfo, updateAccountInfo } from '@/x/service/account'

export default {
  props: ['openId', 'bell'],
  data() {
    return {
      isExists: false,
      accountId: '',
      loading: false,
      visible: false,

      params: {
        username: '',
        password: '',
        again: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        again: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    };
  },
  mounted(){
    this.setAccountId(this.openId)
  },
  watch: {
    bell(){
      this.visible = true
    },
    openId(val){
      this.setAccountId(val)
    }
  },
  methods: {
    close(){
      this.visible = false
    },
    setAccountId(accountId = ''){
      this.accountId = accountId
      this.isExists = false
      this.params.username = ''
      this.params.password = ''
      this.params.again = ''

      if(accountId){
        this.loading = true
        getAccountInfo(accountId)
        .then(data => {
          this.loading = false
          const username = data.username || ''
          if(username){
            this.isExists = true
          }
          this.params.username = username
        })
        .catch(catchHandler)
      }
    },
    submit(){
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          const { username, password, again } = this.params
          if(password === again){
            updateAccountInfo(this.accountId, username, password)
            .then(() => {
              success('管理账户设置成功！')
              this.close()
            })
            .catch(catchHandler)
          }else{
            return false;
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
