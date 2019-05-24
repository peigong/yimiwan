<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="1"><el-link :underline="false" href="/x/pages/wx-user.html" type="primary">微信用户</el-link></el-menu-item>
      <el-menu-item index="2"><el-link :underline="false" href="/x/pages/wx-user.html" type="primary">微信用户</el-link></el-menu-item>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-user"></i></template>
        <el-menu-item index="3-1">菜单示例</el-menu-item>
        <el-menu-item index="3-2"><el-link :underline="false" :href="logoutUrl" type="primary" class="menu-link">退出登录</el-link></el-menu-item>
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
  data() {
    return {
      logoutUrl: logoutUrl,
      activeIndex: '1'
    };
  },
  mounted(){
    const href = encodeURI(window.location.href)
    this.logoutUrl = `${ logoutUrl }?url=${ href }`
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style>
.el-link.el-link--primary.menu-link {
  color: #ffffff;
}
</style>
