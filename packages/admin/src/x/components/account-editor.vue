<template>
  <div>
    <i class="el-icon-loading" v-if="loading"></i>
    <el-dialog title="设置管理账户" :visible.sync="visible" width="30%" center @close="closeHandler">
      <el-form :model="params" :rules="rules" ref="accountForm" label-width="100px" class="account-form">
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
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { catchHandler, success } from '@/x/util/ui'
import { getAccountInfo, updateAccountInfo } from '@/x/service/account'

export default {
  props: ['openId'],
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
    openId(val){
      this.setAccountId(val)
    }
  },
  methods: {
    closeHandler(){
      this.$emit('changed', '')
      this.setAccountId('')
    },
    setAccountId(accountId){
      this.accountId = accountId || ''
      if(accountId){
        this.loading = true
        getAccountInfo(accountId)
        .then(data => {
          this.loading = false
          this.visible = true

          const username = data.username || ''
          if(username){
            this.isExists = true
          }
          this.params.username = username
          this.params.password = ''
          this.params.again = ''
        })
        .catch(catchHandler)
      }else{
        this.loading = false
        this.visible = false
        this.isExists = false

        this.params.username = ''
        this.params.password = ''
        this.params.again = ''
      }
    },
    cancel(){
      this.setAccountId('')
    },
    submit(){
      this.$refs.accountForm.validate((valid) => {
        if (valid) {
          const { username, password, again } = this.params
          if(password === again){
            updateAccountInfo(this.accountId, username, password)
            .then(() => {
              success('管理账户设置成功！')
              this.setAccountId('')
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
.account-form {
  width: 90%;
}
</style>
