<template>
  <div>
    <wv-group :title="item.name" v-for="item in classificationList" :key="item.sn">
      <div v-for="it in item.images" :key="it._id">
        <img v-if="!!it.url" :src="it.url" max-width="100%" height="auto" />
      </div>
    </wv-group>
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
    },
    setClassifications(items = []){
      this.classificationList = items.map(item => {
        return { ...item }
      })
      this.setItems(this.items)
    }
  }
}
</script>

<style>
</style>
