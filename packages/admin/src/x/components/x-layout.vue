<template>
  <div>
    <el-menu
      :default-active="defaultActive"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="wx-user"><el-link :underline="false" href="/x/pages/wx-user.html" type="primary">微信用户</el-link></el-menu-item>
      <el-menu-item index="company"><el-link :underline="false" href="/x/pages/company.html" type="primary">公司</el-link></el-menu-item>
      <el-menu-item index="job"><el-link :underline="false" href="/x/pages/job.html" type="primary">岗位</el-link></el-menu-item>
      <el-menu-item index="applicant"><el-link :underline="false" href="/x/pages/applicant.html" type="primary">求职者</el-link></el-menu-item>
      <el-menu-item index="message"><el-link :underline="false" href="/x/pages/message.html" type="primary">消息</el-link></el-menu-item>
      <el-menu-item index="media"><el-link :underline="false" href="/x/pages/media.html" type="primary">图片视频</el-link></el-menu-item>
      <el-submenu index="system">
        <template slot="title">系统配置</template>
        <el-menu-item index="system-classification"><el-link :underline="false" href="/x/pages/classification.html" type="primary" class="menu-link">内置类别管理</el-link></el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">管理员</template>
        <el-menu-item><el-link :underline="false" :href="logoutUrl" type="primary" class="menu-link">退出登录</el-link></el-menu-item>
      </el-submenu>
    </el-menu>
    <el-container>
      <el-main><slot /></el-main>
      <el-footer>管理系统 &copy; 2019</el-footer>
    </el-container>
  </div>
</template>

<script>
const logoutUrl = '/x/logout'
export default {
  props: [ 'menuActive' ],
  data() {
    const defaultActive = this.menuActive || 'wx-user'
    return {
      logoutUrl,
      defaultActive
    };
  },
  mounted(){
    const href = encodeURI(window.location.href)
    this.logoutUrl = `${ logoutUrl }?url=${ href }`
  },
  methods: {
    handleSelect() {
    }
  }
}
</script>

<style>
.el-link.el-link--primary.menu-link {
  color: #ffffff;
}
</style>
