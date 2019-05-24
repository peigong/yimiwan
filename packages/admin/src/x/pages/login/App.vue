<template>
  <div>
    <div class="login-container">
      <h1>系统登录</h1>
      <el-form :model="params" :rules="rules" ref="loginForm" label-width="100px" class="login-form">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="params.username" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="params.password" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { catchHandler } from '@/x/util/ui'

export default {
  name: 'app',
  mounted(){
    let redirect = ''
    const search = window.location.search || ''
    if(search){
      redirect = search.substring(1)
    }
    this.redirect = redirect || '/'
  },
  data(){
    return {
      redirect: '',
      params: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    login(){
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          axios.post('/x/login', this.params)
          .then(() => {
            window.location = this.redirect
          })
          .catch(err => {
            const res = err.response || {}
            const data = res.data || {}
            switch (+res.status) {
              case 401:
                catchHandler(new Error(data.error))
                break;
              default:
            }
          });
        } else {
          return false;
        }
      });
    }
  }
}
</script>

<style>
h1 {
  color: #606266;
  font-size: 20px;
  font-weight: normal;
  text-align: center;
  padding-left: 100px;
}
.login-container {
  padding-top: 100px;
  width: 300px;
  margin: auto;
}
</style>
