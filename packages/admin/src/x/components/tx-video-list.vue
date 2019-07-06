<template>
  <div>
    <el-row :gutter="20" type="flex" justify="center">
      <el-col :span="11" v-for="item in items" :key="item.mediaid">
        <div>
          <tx-video-player :item-id="item.mediaid" />
        </div>
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
import txVideoPlayer from '@/x/components/tx-video-player'

export default {
  props: ['items'],
  components: {
    txVideoPlayer
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
