<template>
  <div>
    <wv-group title="">
      <wv-cell title="开始日期" is-link :value="startDate"  @click="openStartPicker" />
      <wv-cell title="结束日期" is-link :value="endDate"  @click="openEndPicker" />
      <wv-input label="单位" placeholder="请输入工作单位"></wv-input>
      <wv-input label="职务" placeholder="请输入担任的职务"></wv-input>
      <wv-input label="主要工作" placeholder="请输入主要工作"></wv-input>
    </wv-group>
    <wv-button type="primary">确定</wv-button>
    <wv-datetime-picker ref="startPicker" type="date" @confirm="onStartConfirm"></wv-datetime-picker>
    <wv-datetime-picker ref="endPicker" type="date" @confirm="onEndConfirm"></wv-datetime-picker>
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: 'work-edit',
  props: [ 'itemId' ],
  components: {
  },
  data(){
    return {
      startDate: '',
      endDate: ''
    }
  },
  computed: {
  },
  methods: {
    openStartPicker() {
      this.$refs.startPicker.open();
    },
    openEndPicker() {
      this.$refs.endPicker.open();
    },
    onStartConfirm(val){
      this.startDate = dayjs(val).format('YYYY-MM-DD')
    },
    onEndConfirm(val){
      this.endDate = dayjs(val).format('YYYY-MM-DD')
    }
  }
}
</script>

<style>
</style>
