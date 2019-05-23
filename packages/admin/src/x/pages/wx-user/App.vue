<template>
  <div id="app">
    <x-layout>
      <el-table :data="items" style="width: 100%">
        <el-table-column label="头像">
          <template slot-scope="scope">
            <el-image :src="scope.row.headimgurl"></el-image>
          </template>
        </el-table-column>
        <el-table-column label="微信">
          <template slot-scope="scope">
            <wx-user-info :item="scope.row"></wx-user-info>
          </template>
        </el-table-column>
         <el-table-column label="操作">
           <template slot-scope="scope">
             <el-button size="mini" @click="setAccount(scope.row)">设置管理账户</el-button>
           </template>
         </el-table-column>
       </el-table>
    </x-layout>
    <account-editor :open-id="currentId" @changed="changedHandler" />
  </div>
</template>

<script>
import { catchHandler } from '@/x/util/ui'
import { getUserList } from '@/x/service/user'
import xLayout from '@/x/components/x-layout'
import wxUserInfo from '@/x/components/wx-user-info'
import accountEditor from '@/x/components/account-editor'

export default {
  name: 'app',
  components: {
    xLayout,
    wxUserInfo,
    accountEditor
  },
  mounted(){
    getUserList().then(data => {
      this.items = data || []
    }).catch(catchHandler)
  },
  data(){
    return {
      currentId: '',
      items: []
    }
  },
  methods: {
    changedHandler(){
      this.currentId = ''
    },
    setAccount(item) {
      console.log(item);
      this.currentId = item.openid || '';
    }
  }
}
</script>

<style lang="less">
</style>
