<template>
  <div>
    <el-row justify="center">
      <el-col :span="8" v-for="item in items" :key="item._id">
        <div v-if="!item.url">没有相应的图片地址</div>
        <div v-if="!!item.url"><img :src="item.url" max-width="100%" height="auto" /></div>
        <div class="ctrl">
          <el-button type="default" size="mini" v-if="1 == item.status">待审核</el-button>
          <el-button type="success" size="mini" v-if="2 == item.status">已通过</el-button>
          <el-button type="warning" size="mini"  v-if="3 == item.status">已驳回</el-button>
          <label>{{ item.summary }}</label>
        </div>
        <div v-if="1 == item.status" class="ctrl">
          <el-button type="success" size="mini" @click="approve(item)">通过</el-button>
          <el-button type="warning" size="mini" @click="reject(item)">驳回</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { Status } from '@/x/enums'
import { catchHandler, success } from '@/x/util/ui'
import { approve, reject } from '@/x/service/media'

export default {
  props: ['items'],
  components: {
  },
  data() {
    return {
    };
  },
  mounted(){
  },
  watch: {
  },
  methods: {
    approve(item){
      approve(item._id)
      .then(() => {
        success('审核成功')
        item.status = Status.Approved
      })
      .catch(catchHandler)
    },
    reject(item){
      reject(item._id)
      .then(() => {
        success('驳回成功')
        item.status = Status.Rejective
      })
      .catch(catchHandler)
    }
  }
}
</script>

<style>
.ctrl {
  padding: 2px;
}
.ctrl button {
  margin: 2px;
}
</style>
