<template>
  <div>
    <wv-group :title="item.name" v-for="item in classificationList" :key="item.sn">
      <div class="image-list-group">
        <div v-for="it in item.images" :key="it._id" class="image-list-container" :style="{ width: item.width }">
          <img v-if="!!it.url" :src="it.url" class="image-list-item" @click="showImage(it);" />
        </div>
      </div>
    </wv-group>
    <wv-popup :visible.sync="ctrl.details">
      <wv-switch title="关闭" v-model="ctrl.details" />
      <wv-group>
        <div class="image-details">
          <img v-if="media.url" :src="media.url" class="image-details-item" />
        </div>
        <wv-cell :title="media.summary" />
      </wv-group>
    </wv-popup>
  </div>
</template>

<script>

export default {
  name: 'image-list',
  props: [ 'classifications', 'items' ],
  components: {
  },
  data(){
    return {
      ctrl: {
        details: false
      },
      media: {},
      dict: {},
      classificationList: []
    }
  },
  mounted(){
    this.setItems(this.items)
    this.setClassifications(this.classifications)
  },
  watch: {
    items(val = []){
      this.setItems(val || [])
    },
    classifications(val = []){
      this.setClassifications(val || [])
    },
  },
  methods: {
    setItems(images = []){
      this.classificationList.forEach(item => {
        this.$set(item, 'images', [])
        this.dict[item.sn] = item
      })
      images.forEach(item => {
        const sn = item.classification.sn || ''
        if(this.dict.hasOwnProperty(sn)){
          this.dict[sn].images.push(item)
        }
      })
      this.classificationList.forEach(item => {
        const len = item.images.length
        if(len > 2){
          item.width = '32%'
        }else if (len > 1) {
          item.width = '48%'
        }else{
          item.width = '96%'
        }
      })
    },
    setClassifications(items = []){
      this.classificationList = items.map(item => {
        const width = '100%'
        const images = []
        return { width, images, ...item }
      })
      this.setItems(this.items)
    },
    showImage(item){
      this.media = { ...item }
      this.ctrl.details = true
    }
  }
}
</script>

<style>
.image-list-group {
  text-align: center;
}
.image-list-container {
  display: inline-block;
  padding: 2px;
}
.image-list-item,
.image-details-item {
  max-width: 100%;
  width: auto;
  height: auto;
}
.image-details {
  padding: 10px;
  text-align: center;
}
</style>
