<template>
  <div>
    <wv-group title="基本信息">
      <wv-input label="期待工作" placeholder="请输入期待工作"></wv-input>
      <wv-input label="姓名" placeholder="请输入姓名"></wv-input>
      <wv-cell title="性别" is-link :value="sex.name" @click.native="ctrl.sex = true" />
      <wv-cell title="出生日期" is-link :value="birthday"  @click="openPicker" />
      <wv-input label="家庭住址" placeholder="请输入家庭住址"></wv-input>
    </wv-group>
    <wv-group title="其他信息">
      <wv-input label="身体状况" placeholder="请输入身体状况"></wv-input>
      <wv-input label="婚姻状况" placeholder="请输入婚姻状况"></wv-input>
      <wv-input label="性格类型" placeholder="请输入性格类型"></wv-input>
    </wv-group>
    <wv-group title="兴趣特长">
      <wv-textarea placeholder="请输入兴趣特长" :rows="3" :show-counter="false"></wv-textarea>
    </wv-group>
    <wv-button type="primary">确定</wv-button>
    <wv-datetime-picker ref="picker" type="date" @confirm="onConfirm"></wv-datetime-picker>
    <wv-picker
      :visible.sync="ctrl.sex"
      :columns="sexList"
      value-key="name"
      @change="onChange"
    />
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: 'cv-edit',
  props: [ 'itemId' ],
  components: {
  },
  data(){
    return {
      ctrl: {
        sex: false
      },
      sex: {},
      sexList: [{ values: [
        { name: '请选择', id: '' },
        { name: '男性', id: '1' },
        { name: '女性', id: '2' }
      ] }],
      birthday: ''
    }
  },
  computed: {
  },
  methods: {
    openPicker() {
      this.$refs.picker.open();
    },
    onConfirm(val){
      this.birthday = dayjs(val).format('YYYY-MM-DD')
    },
    onChange(picker, values){
      this.sex = values[0]
    }
  }
}
</script>

<style>
</style>
