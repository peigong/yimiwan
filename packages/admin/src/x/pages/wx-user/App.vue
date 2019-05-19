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
             <el-button
               size="mini"
               @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
             <el-button
               size="mini"
               type="danger"
               @click="handleDelete(scope.$index, scope.row)">删除</el-button>
           </template>
         </el-table-column>
       </el-table>
    </x-layout>
  </div>
</template>

<script>
import { catchHandler } from '@/x/util/ui'
import { getUserList } from '@/x/service/user'
import xLayout from '@/x/components/x-layout'
import wxUserInfo from '@/x/components/wx-user-info'

export default {
  name: 'app',
  mixins: [],
  components: {
    xLayout,
    wxUserInfo
  },
  mounted(){
    getUserList()
    .then(data => {
      this.items = data || []
    })
    .catch(catchHandler)
  },
  data(){
    return {
      items: []
    }
  },
  computed: {
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  }
}
</script>

<style lang="less">
</style>
