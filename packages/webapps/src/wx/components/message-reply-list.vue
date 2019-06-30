<template>
  <div>
    <div v-if="!items.length">暂无往复消息</div>
    <wv-panel title="往来信息列表" v-if="!!items.length">
      <wv-media-box type="text"
        :title="item.title" :description="item.content"
         v-for="(item, key) in items" :item="item" :key="key">
        <ul class="weui-media-box__info" slot="box_ft">
          <li class="weui-media-box__info__meta">{{ item.createTime }}</li>
        </ul>
      </wv-media-box>
    </wv-panel>
  </div>
</template>

<script>
import { catchHandler } from '@/wx/util/ui'
import { getRepliedMessages } from '@/wx/service/message'

export default {
  name: 'message-reply-list',
  props: [ 'itemId' ],
  components: {
  },
  mounted(){
    getRepliedMessages(this.itemId)
    .then((data) => {
      this.items = data
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
  }
}
</script>

<style>
</style>
