<template>
  <div>
    <wv-panel title="往来信息列表">
      <wv-media-box type="text"
        :title="item.title" :description="item.content"
         v-for="(item, key) in items" :item="item" :key="key">
        <ul class="weui-media-box__info" slot="box_ft">
          <li class="weui-media-box__info__meta">{{ item.postDateTime }}</li>
        </ul>
      </wv-media-box>
    </wv-panel>
  </div>
</template>

<script>
import { catchHandler } from '@/wx/util/ui'
import { getMessageList } from '@/wx/service/message'

export default {
  name: 'message-list',
  props: [ 'itemId' ],
  components: {
  },
  mounted(){
    getMessageList()
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
